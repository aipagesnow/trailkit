import type { ReactNode } from "react";

/** Renders plain text with [label](href) inline links. External links open safely. */
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const href = m[2] ?? "";
    const external = /^https?:/.test(href);
    parts.push(
      <a
        key={i++}
        href={href}
        className="underline"
        {...(external ? { rel: "noopener noreferrer", target: "_blank" } : {})}
      >
        {m[1]}
      </a>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
