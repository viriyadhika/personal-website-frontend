import BaseImage from "next/image";

export type ImageProps = {
  rounded?: boolean;
  src: string;
  size: number;
};

export default function ImageWrap({ rounded = false, src, size }: ImageProps) {
  const tokens = src.split("/");
  const alt = tokens[tokens.length - 1];
  return (
    <BaseImage
      src={`${src}.png`}
      width={size}
      height={size}
      style={{
        borderRadius: rounded ? "50%" : 0,
        objectFit: "contain",
      }}
      alt={alt}
    />
  );
}
