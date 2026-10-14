export function IllustrativeCaption({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "illustrative-caption illustrative-caption-sm" : "illustrative-caption"}>
      Illustrative image
    </span>
  );
}
