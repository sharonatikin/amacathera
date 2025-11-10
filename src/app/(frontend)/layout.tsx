import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Heading from "@/components/Heading";

export const metadata: Metadata = {
  title: "Amaca Thera",
  description: "Revolutionizing Wound Care with Advanced Hydrogel Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Heading/>
        {children}
        <Footer/>
    </>
  );
}
