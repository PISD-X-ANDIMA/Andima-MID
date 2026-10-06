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

function Icon({ kind }: { kind: "account" | "activity" | "login" }) {
  if (kind === "account") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" stroke="none"/><circle cx="12" cy="8" r="3.5" fill="#aec5d3" stroke="none"/><path d="M5.5 18.5a6.5 6.5 0 0 1 13 0v.5h-13z" fill="#aec5d3" stroke="none"/></svg>;
  if (kind === "activity") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8.5" cy="7.5" r="3"/><path d="M2 19a6.5 6.5 0 0 1 13 0v1H2zM15.5 4.5a3.2 3.2 0 0 1 0 6.2m1.2 2.3a5.5 5.5 0 0 1 5.3 5.5v1h-4"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="9" r="3.2"/><path d="M5.5 19a6.5 6.5 0 0 1 13 0"/></svg>;
}

export default function LogTrackingDashboard({ logs, hasError }: { logs: LogEntry[]; hasError: boolean }) {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [expanded, setExpanded] = useState(true);
  const visibleLogs = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    return logs.filter((log) => {
      const matchesSearch = !normalizedSearch || (log.email ?? "").toLocaleLowerCase().includes(normalizedSearch);
      const matchesDate = !date || log.date?.slice(0, 10) === date;
      return matchesSearch && matchesDate;
    });
  }, [date, logs, search]);

  return (
    <main className={`${styles.shell} ${expanded ? "" : styles.collapsed}`}>
      <aside className={styles.sidebar} aria-label="Navigasi utama">
        <Link href="/" className={styles.logoLink} aria-label="ANDIMA Logistics Suite"><img className={styles.logo} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-ANDIMA-wzx4gpZx20EFE5IYcH3jqabixELIo3.png" alt="" /><span className={styles.logoText}><strong>ANDIMA</strong><small>Logistics Suite</small></span></Link>
        <nav className={styles.navigation}>
          <button className={styles.sectionButton} onClick={() => setExpanded(!expanded)} aria-expanded={expanded}><span>SMKI</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d={expanded ? "m7 10 5-5 5 5" : "m7 14 5 5 5-5"}/></svg></button>
          {expanded && <div className={styles.subnav}>
            <Link className={styles.navItem} href="/"><Icon kind="account"/><span>Account Maintains</span></Link>
            <Link className={styles.navItem} href="/logtracking"><Icon kind="activity"/><span>Log Activity</span></Link>
            <Link className={`${styles.navItem} ${styles.active}`} href="/logtracking"><Icon kind="login"/><span>Log Login</span></Link>
          </div>}
        </nav>
        <button className={styles.logout} type="button">Logout</button>
      </aside>

      <section className={styles.mainArea}>
        <header className={styles.topbar}>
          <div className={styles.heading}><strong>ANDIMA SMKI</strong><span>Log Login</span></div>
          <div className={styles.user}><span className={styles.userAvatar} aria-hidden="true">A</span><span className={styles.userText}><strong></strong><small>Guest</small></span></div>
        </header>
        <section className={styles.page}>
          <div className={styles.toolbar}>
            <label className={styles.searchBox}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3"/><path d="m16 16 4.2 4.2"/></svg>
              <input type="search" placeholder="Search name, email" aria-label="Cari nama atau email" value={search} onChange={(event) => setSearch(event.target.value)} />
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
                <thead><tr><th scope="col">EMPLOYEE’S NAME</th><th scope="col">E-MAIL</th><th scope="col">ROLE</th><th scope="col">LOGIN</th><th scope="col">LOGOUT</th><th scope="col">DATE</th></tr></thead>
                <tbody>{visibleLogs.length === 0 ? <tr><td className={styles.empty} colSpan={6}>{logs.length === 0 ? "Belum ada catatan log." : "Tidak ada catatan yang cocok."}</td></tr> : visibleLogs.map((log) => <tr key={log.id}><td className={styles.employeeName} aria-label="Nama karyawan belum tersedia"></td><td className={styles.email}>{log.email || "—"}</td><td>{log.role || "—"}</td><td>{displayTime(log.timelogin)}</td><td>{displayTime(log.timelogout)}</td><td>{displayDate(log.date)}</td></tr>)}</tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
