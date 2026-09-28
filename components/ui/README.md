# Reusable UI components

Import from `@/components/ui`, or use the default export of each component file.
These components contain no feature data, API calls, page layout, or business validation.

```tsx
import { Button, StatusIndicator, Table, FormField } from "@/components/ui";

export default function Example() {
  return (
    <>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button disabled>Disabled</Button>

      <StatusIndicator status="ok" />
      <StatusIndicator status="warning" />
      <StatusIndicator status="error" />

      <Table headers={["Kolom 1", "Kolom 2"]} rows={[["Sel 1", "Sel 2"]]} />
      <Table headers={["Kolom 1", "Kolom 2"]} rows={[]} />

      <FormField label="Label input" name="example" placeholder="Masukkan teks" />
      <FormField as="select" label="Label dropdown" name="choice"
        options={[{ value: "a", label: "Opsi A" }, { value: "b", label: "Opsi B" }]} />
      <FormField label="Contoh error" error="Pesan error" />
    </>
  );
}
```

- Button supports native button props (`disabled`, `onClick`, `type`, `className`, `style`). Default type is `button`; use `type="submit"` inside a form when needed.
- StatusIndicator accepts `ok`, `warning`, `error`, or `info`, with an optional custom `label`.
- Table receives `headers` and `rows` as arrays of React nodes. Rows default to empty; `emptyMessage` and `caption` are optional. It renders all supplied rows. Use the separate Pagination component and pass the desired row slice from the consuming component.
- FormField renders one field per instance, with native input/select props. Use `value` + `onChange` for controlled fields, or `defaultValue` for uncontrolled fields. Do not pass both. Options should have unique, nonempty values; empty string is reserved for the placeholder.
- FormField links labels and errors to the control, generates an ID when none is supplied, and supports `required`, `disabled`, and native keyboard interaction. Validation rules and error messages belong to the consuming feature.
- A consuming Next.js component using event handlers or React state must start with `"use client"`. Static usage does not require this directive.
- Styling is scoped with CSS Modules. Components do not impose page positioning or outer spacing.

## Visual reference and pagination

Base styles follow the supplied screenshots: purple primary button, compact outlined status badges, pale lavender table header, subtle horizontal row dividers, and light lavender input controls. Secondary and disabled states use complementary styles. No feature labels or feature data are embedded in components.

```tsx
"use client";
import { useState } from "react";
import { Pagination, Table } from "@/components/ui";

export function PagedTable({ rows }: { rows: string[][] }) {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  return (
    <>
      <Table headers={["Kolom 1", "Kolom 2"]}
        rows={rows.slice((currentPage - 1) * pageSize, currentPage * pageSize)} />
      <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
}
```

Pagination supports controlled `page` + `onPageChange` or internal state with `defaultPage`. It changes page selection only; data slicing/fetching belongs to its consumer. No alignment or outer page spacing is imposed.