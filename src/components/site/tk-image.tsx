import { imageFor, type TkImageMeta } from "@/data/images";

const WIDTHS = [480, 800, 1200, 1600];

export function TopoPlaceholder({
  aspect = "4/3",
  label = "Trailkit",
  className = "",
}: {
  aspect?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-forest-deep text-on-forest ${className}`}
      style={aspect ? { aspectRatio: aspect.replace("/", " / ") } : undefined}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <path d="M-10 210 C 80 180 120 240 200 200 C 280 160 320 220 420 180" fill="none" stroke="#3d5a6c" strokeWidth="1.2" opacity="0.55" />
        <path d="M-10 160 C 70 130 140 190 210 150 C 280 110 330 170 420 130" fill="none" stroke="#5c656a" strokeWidth="1" opacity="0.45" />
        <path d="M-10 110 C 90 80 150 140 230 100 C 300 70 340 120 420 90" fill="none" stroke="#c5c2bb" strokeWidth="0.8" opacity="0.28" />
        <path d="M200 40 L228 78 L200 116 L172 78 Z" fill="none" stroke="#f7f6f2" strokeWidth="1.4" opacity="0.7" />
      </svg>
      <span className="absolute bottom-2 left-2 max-w-[90%] font-mono text-[11px] tracking-widest uppercase">{label}</span>
    </div>
  );
}

function ratioHeight(aspect: string) {
  const [w, h] = aspect.split("/").map(Number);
  if (!w || !h) return 900;
  return Math.round((1600 * h) / w);
}

export function TkImage({
  route,
  meta,
  priority = false,
  fill = false,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  className = "",
  tone = "field",
}: {
  route?: string;
  meta?: TkImageMeta;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  className?: string;
  tone?: "field" | "money";
}) {
  const image = meta ?? (route ? imageFor(route) : undefined);
  if (!image?.ready) {
    return (
      <TopoPlaceholder
        aspect={fill ? undefined : image?.aspect ?? "4/3"}
        label={image?.label ?? image?.title ?? "Field note"}
        className={`${fill ? "absolute inset-0 h-full w-full" : "w-full"} ${className}`}
      />
    );
  }
  const useMoney = tone === "money" && Boolean(image.money) && (image.moneyWidths?.length ?? 0) > 0;
  const base = useMoney ? `${image.base}-money` : image.base;
  const widths = useMoney ? image.moneyWidths : image.widths?.length ? image.widths : WIDTHS;
  const avif = widths.map((w) => `${base}-${w}.avif ${w}w`).join(", ");
  const webp = widths.map((w) => `${base}-${w}.webp ${w}w`).join(", ");
  return (
    <picture className={fill ? `absolute inset-0 block h-full w-full ${className}` : `relative block w-full ${className}`} style={fill ? undefined : { aspectRatio: image.aspect.replace("/", " / ") }}>
      {image.srcset ? <source type="image/avif" srcSet={avif} sizes={sizes} /> : null}
      {image.srcset ? <source type="image/webp" srcSet={webp} sizes={sizes} /> : null}
      <img
        src={`${base}.jpg`}
        alt={image.alt}
        width={1600}
        height={ratioHeight(image.aspect)}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="tk-zoom h-full w-full object-cover"
        style={{ objectPosition: image.focal }}
      />
    </picture>
  );
}
