import { getTrackingLogin } from "@/query/logtracking";
import styles from "./logtracking.module.css";

function displayDate(value: string | null) {
  if (!value) return "—";
  const [year, month, day] = value.slice(0, 10).split("-");
  if (!year || !month || !day) return value;
  return `${day}-${month}-${year}`;
}

function displayTime(value: string | null) {
  return value ? value.slice(0, 5) : "—";
}

export default async function LogTrackingPage() {
  let logs: Awaited<ReturnType<typeof getTrackingLogin>> = [];
  let hasError = false;

  try {
    logs = await getTrackingLogin();
  } catch {
    hasError = true;
  }

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        {hasError ? (
          <div className={styles.message} role="alert">
            Data log belum dapat dimuat. Periksa koneksi database dan coba lagi.
          </div>
        ) : (
          <div className={styles.tableFrame}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">E-MAIL</th>
                  <th scope="col">ROLE</th>
                  <th scope="col">LOGIN</th>
                  <th scope="col">LOGOUT</th>
                  <th scope="col">DATE</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td className={styles.empty} colSpan={5}>
                      Belum ada catatan log.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id}>
                      <td className={styles.email}>{log.email || "—"}</td>
                      <td>{log.role || "—"}</td>
                      <td>{displayTime(log.timelogin)}</td>
                      <td>{displayTime(log.timelogout)}</td>
                      <td>{displayDate(log.date)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
