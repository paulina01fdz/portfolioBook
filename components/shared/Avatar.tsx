import Image from "next/image";

type AvatarProps = {
  className?: string;
  title?: string;
  preload?: boolean;
  src?: string;
  width?: number;
  height?: number;
};

export default function Avatar({
  className = "",
  title = "Retrato ilustrado de Paulina",
  preload = false,
  src = "/profile-avatar-hd.webp",
  width = 1056,
  height = 1280,
}: AvatarProps) {
  return (
    <Image
      src={src}
      alt={title}
      width={width}
      height={height}
      className={className}
      unoptimized
      preload={preload}
    />
  );
}
