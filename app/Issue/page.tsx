"use client";

import { useMemo, useState } from "react";
import { Syne } from "next/font/google";
import styles from "./Issue.module.css";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

type Issue = {
  client: string;
  issue: string;
  date: string;
  pic: string;
  status: "Completed" | "In Progress";
};

const issues: Issue[] = [
  { client: "Maju Bersama", issue: "Send quotation update", date: "2026-09-16", pic: "Yemima", status: "Completed" },
  { client: "Sinar Logistik", issue: "Cargo Logistic not found", date: "2026-09-17", pic: "Khoirul", status: "In Progress" },
  { client: "Makmur Jaya", issue: "Wrong Invoice", date: "2026-09-21", pic: "Juan", status: "In Progress" },
  { client: "Sumber Rejeki", issue: "Delivery late", date: "2026-09-24", pic: "Advent", status: "Completed" },
  { client: "Brahma Surya", issue: "Delivery late", date: "2026-09-29", pic: "Vieri", status: "In Progress" },
];

function CalendarIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M7.5 3v4M16.5 3v4M4 9h16"/></svg>;
}

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.2"/><path d="m15.5 15.5 4.3 4.3"/></svg>;
}

function EditIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-6"/><path d="m10 14 9.6-9.6a2.1 2.1 0 0 1 3 3L13 17l-4 1z"/></svg>;
}

function DashboardIcon() {
  return <svg viewBox="0 0 28 28" aria-hidden="true"><rect x="2" y="2" width="24" height="24" rx="1"/><path d="M14 2v24M14 15h12"/></svg>;
}

function IssueBoardIcon() {
  return <svg viewBox="0 0 28 28" aria-hidden="true"><path d="M9 2h10l7 7v10l-7 7H9l-7-7V9z"/><path d="M14 8v7m0 4v.2"/></svg>;
}

function LogoutIcon() {
  return <svg viewBox="0 0 40 42" aria-hidden="true"><path d="M17 3H4v36h13"/><path d="M13 21h19"/><path className={styles.logoutArrow} d="m25 13 9 8-9 8z"/></svg>;
}

export default function IssuePage() {
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");
  const filteredIssues = useMemo(() => issues.filter((item) => {
    const matchesQuery = `${item.client} ${item.issue} ${item.pic} ${item.status}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (!date || item.date === date);
  }), [query, date]);

  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.profile}>
          <div className={styles.avatar} aria-hidden="true" />
          <div><strong className={syne.className}>ANDIMA</strong><span>Job Title</span><span>Username</span></div>
        </div>
        <div className={styles.divider}><button className={styles.collapseButton} type="button" aria-label="Tutup sidebar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg></button></div>
        <nav className={styles.nav} aria-label="Navigasi utama">
          <a href="#dashboard"><span className={styles.navIcon}><DashboardIcon /></span>Dashboard</a>
          <a href="#sales"><span className={styles.navIcon}><svg viewBox="0 0 28 28" aria-hidden="true"><rect x="2" y="2" width="24" height="24" rx="1" /></svg></span>Sales Performance</a>
          <a href="/Issue" className={styles.active}><span className={styles.navIcon}><IssueBoardIcon /></span>Issue Board</a>
        </nav>
        <button className={styles.logout} type="button"><span>Logout</span><LogoutIcon /></button>
      </aside>

      <section className={styles.mainPanel}>
        <header className={styles.header}>
          <div><h1 className={syne.className}>ANDIMA MID</h1><p>Issue Board</p></div>
        </header>
        <div className={styles.content}>
          <div className={styles.filters}>
            <label className={styles.searchBox}>
              <SearchIcon />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search client, issue, or PIC" aria-label="Cari issue" />
            </label>
            <label className={styles.dateBox}>
              <span className={date ? styles.dateLabelHidden : ""}>Date</span>
              <input type="date" value={date} onChange={(event) => setDate(event.target.value)} aria-label="Filter tanggal issue" />
              <CalendarIcon />
            </label>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead><tr><th>Client</th><th>Issue</th><th>Date</th><th>PIC</th><th>Status</th><th>Detail</th></tr></thead>
              <tbody>
                {filteredIssues.map((item) => (
                  <tr key={`${item.client}-${item.date}`}>
                    <td className={styles.client}>{item.client}</td>
                    <td>{item.issue}</td>
                    <td>{new Date(`${item.date}T00:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                    <td><span className={styles.pic}><span className={styles.initial}>{item.pic[0]}</span>{item.pic}</span></td>
                    <td><span className={`${styles.status} ${item.status === "Completed" ? styles.completed : styles.progress}`}><i />{item.status}</span></td>
                    <td><button className={styles.detailButton} type="button" aria-label={`Lihat detail ${item.issue}`}><EditIcon /></button></td>
                  </tr>
                ))}
                {filteredIssues.length === 0 && <tr><td colSpan={6} className={styles.empty}>Tidak ada issue yang cocok dengan pencarian.</td></tr>}
              </tbody>
            </table>
          </div>
          <p className={styles.demoNote}>Data contoh tampilan — nantinya dapat diganti dengan data issue dari CCR, CRM, dan HRMS.</p>
        </div>
      </section>
    </main>
  );
}
