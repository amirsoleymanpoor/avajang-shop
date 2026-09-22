import Image from "next/image";

export function BrandLogo({
  className = "h-11 w-11",
  src = "/brand/logo-3.jpg",
}: {
  className?: string;
  src?: string;
}) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-zinc-200 ${className}`}
    >
      <Image src={src} alt="لوگوی آواژنگ" fill sizes="96px" className="object-contain" priority />
    </span>
  );
}