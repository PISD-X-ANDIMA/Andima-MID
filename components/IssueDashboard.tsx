"use client";

import { useMemo, useState } from "react";
import FormField from "./ui/FormField";
import Pagination from "./ui/Pagination";
import StatusIndicator from "./ui/StatusIndicator";
import Table from "./ui/Table";
import styles from "./IssueDashboard.module.css";

type Row = Record<string, unknown>;
type IssueData = { hrms: Row[]; crm: Row[]; ccr: Row[] };
type IssueSource = "HRMS" | "CRM" | "CCR";
type IssueSourceFilter = "all" | IssueSource;
type Issue = { id: string; ticketCode: string; category: "CCR" | "CRM" | "HRMS"; department: string; issue: string; pic: string; date: string; status: string };
const PAGE_SIZE = 10;

function value(row: Row, ...keys: string[]): string {
  for (const key of keys) {
    const candidate = row[key];
    if (typeof candidate === "string" || typeof candidate === "number") {
      if (String(candidate).trim()) return String(candidate);
    }
  }
  return "-";
}

function dateLabel(raw: string) {
  if (raw === "-") return raw;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? raw : new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}

function normalize(data: IssueData): Issue[] {
  const mapSource = (rows: Row[], category: IssueSource) => rows.map((row) => ({
      id: value(row, "id"),
      ticketCode: value(row, "ticket_code"),
      category,
      department: value(row, "reporter_department", "department", "employee_id"),
      issue: value(row, "title", "description", "issue", "subject"),
      pic: value(row, "pic", "assignee", "owner", "reporter_name", "employee_id"),
      date: dateLabel(value(row, "created_at", "date", "issue_date")),
      status: value(row, "status"),
    }));

  return [
    ...mapSource(data.hrms, "HRMS"),
    ...mapSource(data.crm, "CRM"),
    ...mapSource(data.ccr, "CCR"),
  ];
}

export default function IssueDashboard({ issues: data, selectedSource, searchId = "", loadError = false }: { issues: IssueData; selectedSource: IssueSourceFilter; searchId?: string; loadError?: boolean }) {
  const [page, setPage] = useState(1);
  const allIssues = useMemo(() => normalize(data), [data]);
  const totalPages = Math.max(1, Math.ceil(allIssues.length / PAGE_SIZE));
  const visibleIssues = allIssues.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const rows = visibleIssues.map((issue) => [
    <span key="ticket-code" className={styles.issueId} title={issue.ticketCode}>{issue.ticketCode}</span>,
    <span key="department" className={styles.department}>{issue.department}</span>,
    <span key="issue" className={styles.issueText}>{issue.issue}</span>,
    <span key="pic" className={styles.person}><span className={styles.avatar}>{issue.pic === "-" ? "-" : issue.pic.slice(0, 2).toUpperCase()}</span>{issue.pic}</span>,
    <span key="date" className={styles.date}>{issue.date}</span>,
    <StatusIndicator key="status" status={/complete|selesai|closed/i.test(issue.status) ? "ok" : "info"} label={issue.status} className={styles.statusBadge} />,
  ]);

  return (
    <main className={styles.dashboard}>
      <div className={styles.toolbar}>
        <form action="/issue" method="get" className={styles.searchForm}>
          <input type="hidden" name="source" value={selectedSource} />
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4"/><path d="m10.5 10.5 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            <FormField label="Cari" name="id" defaultValue={searchId} placeholder="Cari..." className={styles.searchInput} />
          </div>
          <button type="submit" className={styles.searchButton}>Cari</button>
        </form>
        <form action="/issue" method="get" className={styles.filterWrap}>
          <input type="hidden" name="id" value={searchId} />
          <select name="source" aria-label="Filter kategori" value={selectedSource} onChange={(event) => event.currentTarget.form?.requestSubmit()} className={styles.filterSelect}>
            <option value="all">All</option><option value="CCR">CCR</option><option value="CRM">CRM</option><option value="HRMS">HRMS</option>
          </select>
          <svg className={styles.selectChevron} width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden="true"><path d="m1 1 6 6 6-6" stroke="currentColor" strokeWidth="2.5"/></svg>
        </form>
      </div>
      <section className={styles.tableSection} aria-label="Daftar issue">
        <Table className={styles.issueTable} headers={["Ticket Code", "Departemen", "Issue", "PIC", "Date", "Status"]} rows={rows} emptyMessage={loadError ? "Data issue gagal dimuat. Periksa koneksi database." : "Data sedang kosong."} />
      </section>
      <Pagination totalPages={totalPages} page={page} onPageChange={setPage} disabled={allIssues.length <= PAGE_SIZE} className={styles.pagination} />
    </main>
  );
}
