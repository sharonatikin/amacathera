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
        <div className="min-h-screen w-full -mt-[7%] bg-gradient-to-br from-blue-50 via-slate-100 to-blue-100 relative overflow-hidden">
        {children}
        </div>
        <Footer/>
    </>
  );
}
