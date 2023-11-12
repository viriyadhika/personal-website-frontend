import BaseImage from "next/image";
import { PORTFOLIO_PUBLIC } from "../constants";

export type ImageProps = {
  rounded?: boolean;
  name: string;
  size: number;
};

export default function ImageWrap({ rounded = false, name, size }: ImageProps) {
  return (
    <BaseImage
      src={`${PORTFOLIO_PUBLIC}/${name}.png`}
      width={size}
      height={size}
      style={{
        borderRadius: rounded ? "50%" : 0,
        objectFit: "contain",
      }}
      alt={name}
    />
  );
}
