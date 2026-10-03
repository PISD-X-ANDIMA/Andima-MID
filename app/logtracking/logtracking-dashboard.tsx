"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./logtracking.module.css";

type LogEntry = {
  id: string | number;
  date: string | null;
  timelogin: string | null;
  timelogout: string | null;
  email: string | null;
  role: string | null;
};

function displayDate(value: string | null) {
  if (!value) return "—";
  const [year, month, day] = value.slice(0, 10).split("-");
  if (!year || !month || !day) return value;
  return `${day}-${month}-${year}`;
}

function displayTime(value: string | null) {
  return value ? value.slice(0, 5) : "—";
}

function PersonIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9a8 8 0 0 1 16 0H4Z" /></svg>;
}

function AccountIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="2"/><circle cx="12" cy="8.5" r="3.3" fill="#07111f"/><path d="M5.5 19a6.5 6.5 0 0 1 13 0" fill="#07111f"/></svg>;
}

function UsersIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.2"/><circle cx="18" cy="10" r="2.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0h-13Zm13.2-5a5 5 0 0 1 6.3 4.8h-4.6a8 8 0 0 0-1.7-4.8Z"/></svg>;
}

export default function LogTrackingDashboard({ logs, hasError }: { logs: LogEntry[]; hasError: boolean }) {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const visibleLogs = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    return logs.filter((log) => {
      const matchesSearch = !normalizedSearch || (log.email ?? "").toLocaleLowerCase().includes(normalizedSearch);
      const matchesDate = !date || log.date?.slice(0, 10) === date;
      return matchesSearch && matchesDate;
    });
  }, [date, logs, search]);

  return (
    <main className={`${styles.shell} ${collapsed ? styles.collapsed : ""}`}>
      <aside className={styles.sidebar} aria-label="Navigasi utama">
        <div className={styles.profile}>
          <div className={styles.avatar} aria-hidden="true" />
          <div className={styles.profileText}><strong>ANDIMA</strong><span>Job Title</span><span>Username</span></div>
        </div>
        <div className={styles.divider} />
        <button className={styles.collapseButton} onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? "Buka sidebar" : "Tutup sidebar"}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d={collapsed ? "m9 18 6-6-6-6" : "m15 18-6-6 6-6"} /></svg>
        </button>
        <nav className={styles.navigation}>
          <Link className={styles.navItem} href="/" title="Account Maintains"><AccountIcon/><span>Account Maintains</span></Link>
          <Link className={`${styles.navItem} ${styles.active}`} href="/logtracking" title="Log Login"><PersonIcon/><span>Log Login</span></Link>
          <Link className={styles.navItem} href="/logtracking" title="Log Activity"><UsersIcon/><span>Log Activity</span></Link>
        </nav>
        <button className={styles.logout} type="button">
          <span>Logout</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M13 4H5v16h8M10 12h11m-4-4 4 4-4 4" />
          </svg>
        </button>
      </aside>

      <section className={styles.mainArea}>
        <header className={styles.topbar}><div><div className={styles.brand}>ANDIMA MID</div><h1>Log Login</h1></div></header>
        <section className={styles.page}>
          <div className={styles.toolbar}>
            <label className={styles.searchBox}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3"/><path d="m16 16 4.2 4.2"/></svg>
              <input type="search" placeholder="Search Email" aria-label="Cari email" value={search} onChange={(event) => setSearch(event.target.value)} />
            </label>
            <label className={styles.dateBox}>
              <span className={styles.datePlaceholder}>{date ? displayDate(date) : "Date"}</span>
              <input type="date" aria-label="Filter tanggal" value={date} onChange={(event) => setDate(event.target.value)} />
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M7.5 3v4M16.5 3v4M4 9h16"/></svg>
            </label>
          </div>
          {hasError ? <div className={styles.message} role="alert">Data log belum dapat dimuat. Periksa koneksi database dan coba lagi.</div> : (
            <div className={styles.tableFrame}>
              <table className={styles.table}>
                <thead><tr><th scope="col">E-MAIL</th><th scope="col">ROLE</th><th scope="col">LOGIN</th><th scope="col">LOGOUT</th><th scope="col">DATE</th></tr></thead>
                <tbody>{visibleLogs.length === 0 ? <tr><td className={styles.empty} colSpan={5}>{logs.length === 0 ? "Belum ada catatan log." : "Tidak ada catatan yang cocok."}</td></tr> : visibleLogs.map((log) => <tr key={log.id}><td className={styles.email}>{log.email || "—"}</td><td>{log.role || "—"}</td><td>{displayTime(log.timelogin)}</td><td>{displayTime(log.timelogout)}</td><td>{displayDate(log.date)}</td></tr>)}</tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
