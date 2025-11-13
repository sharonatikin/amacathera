import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Heading from "@/components/Heading";

export const metadata: Metadata = {
  title: "AmacaThera - Transforming Therapeutics",
  description: "Revolutionizing Wound Care with Advanced Hydrogel Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white  overflow-hidden">
        <Heading/>
        {children}
        <Footer/>
    </div>
  );
}
