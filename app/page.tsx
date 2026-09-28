import Button from "../components/ui/Button";
import StatusIndicator from "../components/ui/StatusIndicator";
import Table from "../components/ui/Table";
import FormField from "../components/ui/FormField";

export default function Home() {
  const tableHeaders = [
    "Job Number",
    "Planned Cost",
    "Actual Spending",
  ];

  const tableRows = [
    ["JOB-001", "Rp 10.000.000", "Rp 9.000.000"],
    ["JOB-002", "Rp 15.000.000", "Rp 17.000.000"],
    ["JOB-003", "Rp 20.000.000", "Rp 20.000.000"],
    ["JOB-004", "Rp 12.000.000", "Rp 11.500.000"],
    ["JOB-005", "Rp 25.000.000", "Rp 27.000.000"],
    ["JOB-006", "Rp 18.000.000", "Rp 16.800.000"],
    ["JOB-007", "Rp 30.000.000", "Rp 30.000.000"],
  ];

  return (
    <main
      style={{
        padding: "40px",
        backgroundColor: "#F8F9FC",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          color: "#1E3765",
          fontFamily: "Poppins, Helvetica, sans-serif",
        }}
      >
        Andima MID - Design System
      </h1>

      <p style={{ marginBottom: "24px" }}>
        Shared UI Components
      </p>

      {/* BUTTON */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button disabled>Disabled Button</Button>
      </div>

      {/* STATUS INDICATOR */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <StatusIndicator status="ok" />
        <StatusIndicator status="warning" />
        <StatusIndicator status="error" />
      </div>

      {/* TABLE */}
      <Table
        headers={tableHeaders}
        rows={tableRows}
      />

      {/* FORM FIELD */}
      <FormField />
    </main>
  );
}