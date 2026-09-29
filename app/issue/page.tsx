import IssueDashboard from "../../components/IssueDashboard";
import { getIssues } from "@/query/issue";
import type { IssueGroups, IssueSourceFilter } from "@/query/issue";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ source?: string | string[]; id?: string | string[] }>;
}) {
  const params = await searchParams;
  const requestedSource = Array.isArray(params.source) ? params.source[0] : params.source;
  const requestedId = Array.isArray(params.id) ? params.id[0] : params.id;
  const searchId = requestedId?.trim() ?? "";
  let issues: IssueGroups = { hrms: [], crm: [], ccr: [] };
  let selectedSource: IssueSourceFilter = "all";
  let loadError = false;
  try {
    const result = await getIssues(requestedSource, searchId);
    issues = result.bySource;
    selectedSource = result.selectedSource;
  } catch (error) {
    console.error("Gagal memuat data issue:", error);
    loadError = true;
  }
  return <IssueDashboard issues={issues} selectedSource={selectedSource} searchId={searchId} loadError={loadError} />;
}
