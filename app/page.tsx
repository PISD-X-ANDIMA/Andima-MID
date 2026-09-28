import Button from "../components/ui/Button";
import StatusIndicator from "../components/ui/StatusIndicator";
import Table from "../components/ui/Table";
import FormField from "../components/ui/FormField";
import Pagination from "../components/ui/Pagination";

export default function Home() {
  const tableHeaders = ["Kolom 1", "Kolom 2", "Kolom 3"];

  const tableRows = [["Sel 1", "Sel 2", "Sel 3"]];

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
        <StatusIndicator status="info" />
      </div>

      {/* TABLE */}
      <Table
        headers={tableHeaders}
        rows={tableRows}
      />

      <div style={{ marginTop: "16px" }}><Pagination totalPages={8} /></div>

      {/* FORM FIELD */}
      <div style={{ marginTop: "24px", maxWidth: "400px", display: "grid", gap: "16px" }}>
        <FormField label="Label input" placeholder="Masukkan teks" />
        <FormField as="select" label="Label dropdown" options={[{ value: "opsi-1", label: "Opsi 1" }, { value: "opsi-2", label: "Opsi 2" }]} />
        <FormField label="Contoh error" error="Pesan error" />
      </div>
    </main>
  );
}