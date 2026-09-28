type Status = "ok" | "warning" | "error";

interface StatusIndicatorProps {
  status: Status;
}

const statusStyles: Record<Status, { label: string; color: string; background: string }> = {
  ok: { label: "OK", color: "#166534", background: "#DCFCE7" },
  warning: { label: "Warning", color: "#854D0E", background: "#FEF9C3" },
  error: { label: "Error", color: "#991B1B", background: "#FEE2E2" },
};

export default function StatusIndicator({ status }: StatusIndicatorProps) {
  const { label, color, background } = statusStyles[status];

  return (
    <span
      role="status"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "6px 12px",
        borderRadius: "999px",
        backgroundColor: background,
        color,
        fontFamily: "Poppins, Helvetica, sans-serif",
        fontSize: "14px",
        fontWeight: 600,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: color,
        }}
      />
      {label}
    </span>
  );
}
