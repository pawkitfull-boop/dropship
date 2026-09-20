import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components Library",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
