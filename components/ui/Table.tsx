import type { ReactNode, TableHTMLAttributes } from "react";
import styles from "./UI.module.css";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  headers: readonly ReactNode[];
  rows?: readonly (readonly ReactNode[])[];
  caption?: string;
  emptyMessage?: string;
}

export default function Table({ headers, rows = [], caption, emptyMessage = "Belum ada data.", className = "", ...props }: TableProps) {
  return (
    <div className={styles.tableContainer}>
      <table {...props} className={`${styles.table} ${className}`}>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>{headers.map((header, index) => <th key={index} scope="col">{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={Math.max(headers.length, 1)} className={styles.empty}>{emptyMessage}</td></tr>
          ) : rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((_, cellIndex) => <td key={cellIndex}>{row[cellIndex] ?? null}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
