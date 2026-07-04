import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-12 w-12" }: LogoProps) {
  return (
    <Image
      src="/logoo.png"
      alt="Reunion Global Logo"
      width={120}
      height={120}
      className={className}
      style={{ objectFit: "contain" }}
      priority
    />
  );
}
