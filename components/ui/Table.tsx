type TableProps = {
  headers: string[];
  rows: string[][];
};

export default function Table({ headers, rows }: TableProps) {
  return (
    <div style={{ width: "100%" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "Poppins, Helvetica, sans-serif",
        }}
      >
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                style={{
                  padding: "12px",
                  textAlign: "left",
                  backgroundColor: "#1E3765",
                  color: "#FFFFFF",
                  border: "1px solid #D1D5DB",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  style={{
                    padding: "12px",
                    border: "1px solid #D1D5DB",
                    backgroundColor: "#FFFFFF",
                    color: "#000000",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "8px",
          marginTop: "16px",
        }}
      >
        <button>Previous</button>
        <span>1</span>
        <button>Next</button>
      </div>
    </div>
  );
}