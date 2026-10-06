import type { QuickTable as QuickTableData } from "@/data/types";

export function QuickTable({ table }: { table: QuickTableData }) {
  return (
    <section id="quick" className="clear-both space-y-3">
      <h2 className="text-2xl">{table.caption}</h2>
      {table.lead ? <p className="max-w-3xl">{table.lead}</p> : null}
      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="bg-forest-deep text-on-forest">
            <tr>
              {table.columns.map((column) => (
                <th key={column} className="px-3 py-2 font-display font-semibold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.join("|")} className="border-t border-line">
                {row.map((cell, index) =>
                  index === 0 ? (
                    <th key={`${row[0]}-${index}`} className="sticky left-0 bg-paper px-3 py-2 text-left font-semibold">
                      {cell}
                    </th>
                  ) : (
                    <td key={`${row[0]}-${index}`} className="px-3 py-2">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.note ? <p className="text-sm text-muted">{table.note}</p> : null}
    </section>
  );
}
