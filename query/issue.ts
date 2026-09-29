import "server-only";
import { createClient } from "@supabase/supabase-js";

export type IssueSource = "HRMS" | "CRM" | "CCR";
export type IssueSourceFilter = "all" | IssueSource;

type IssueRow = Record<string, unknown>;

export type IssueGroups = Record<Lowercase<IssueSource>, IssueRow[]>;

const sourceGroups: Record<IssueSource, Lowercase<IssueSource>> = {
  HRMS: "hrms",
  CRM: "crm",
  CCR: "ccr",
};

const allSources = Object.keys(sourceGroups) as IssueSource[];

const uuidPattern =
  /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Konfigurasi koneksi database Supabase belum tersedia.");
  }

  return createClient(url, key);
}

function resolveSource(source?: string): IssueSourceFilter {
  if (
    source &&
    Object.prototype.hasOwnProperty.call(sourceGroups, source)
  ) {
    return source as IssueSource;
  }

  return "all";
}

async function getIssuesBySource(
  source: IssueSource,
  searchTerm?: string
): Promise<IssueRow[]> {
  const supabase = getSupabase();

  const makeQuery = () => supabase
    .from("b3_issue")
    .select(`
      id,
      ticket_code,
      reporter_department,
      title,
      employee_id,
      status,
      created_at,
      source
    `)
    .eq("source", source);

  if (!searchTerm) {
    const { data, error } = await makeQuery().order("created_at", {
      ascending: false,
    });

    if (error) {
      console.error(`Failed to fetch ${source} issues:`, error);
      throw error;
    }

    return (data ?? []) as IssueRow[];
  }

  if (uuidPattern.test(searchTerm)) {
    const { data, error } = await makeQuery()
      .eq("id", searchTerm)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(`Failed to search ${source} issues:`, error);
      throw error;
    }

    return (data ?? []) as IssueRow[];
  }

  const pattern = `%${searchTerm.replace(/[\\%_]/g, "\\$&")}%`;
  const [ticketCodeResult, issueResult] = await Promise.all([
    makeQuery().ilike("ticket_code", pattern).order("created_at", {
      ascending: false,
    }),
    makeQuery().ilike("title", pattern).order("created_at", {
      ascending: false,
    }),
  ]);

  const error = ticketCodeResult.error ?? issueResult.error;
  if (error) {
    console.error(`Failed to search ${source} issues:`, error);
    throw error;
  }

  const uniqueRows = new Map<string, IssueRow>();
  for (const row of [...(ticketCodeResult.data ?? []), ...(issueResult.data ?? [])]) {
    uniqueRows.set(String(row.id), row as IssueRow);
  }

  return [...uniqueRows.values()].sort((left, right) => {
    const leftDate = new Date(String(left.created_at ?? "")).getTime();
    const rightDate = new Date(String(right.created_at ?? "")).getTime();
    return rightDate - leftDate;
  });
}

export async function getIssues(
  requestedSource?: string,
  requestedId?: string
) {
  const selectedSource = resolveSource(requestedSource);
  const normalizedId = requestedId?.trim() ?? "";

  const sources =
    selectedSource === "all"
      ? allSources
      : [selectedSource];

  const bySource: IssueGroups = {
    hrms: [],
    crm: [],
    ccr: [],
  };

  await Promise.all(
    sources.map(async (source) => {
      bySource[sourceGroups[source]] =
        await getIssuesBySource(
          source,
          normalizedId || undefined
        );
    })
  );

  return {
    selectedSource,
    bySource,
  };
}