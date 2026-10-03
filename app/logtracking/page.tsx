import { getTrackingLogin } from "@/query/logtracking";
import LogTrackingDashboard from "./logtracking-dashboard";

export default async function LogTrackingPage() {
  let logs: Awaited<ReturnType<typeof getTrackingLogin>> = [];
  let hasError = false;

  try {
    logs = await getTrackingLogin();
  } catch {
    hasError = true;
  }

  return <LogTrackingDashboard logs={logs} hasError={hasError} />;
}
