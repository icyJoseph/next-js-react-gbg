import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capture | Poké Adventure",
};

export default function CaptureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
