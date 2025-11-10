import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GetInTouch() {
  return (
    <div className="max-w-7xl gap-4 m-4 lg:my-16 mx-10 flex lg:flex-row flex-col lg:items-center lg:justify-between">
      <p className="text-[#1e3a5f] text-lg max-w-2xl">
        AmacaThera seeks to partner with like minded companies to co-develop new, exciting products that provide on-time, on-target therapeutic solutions.
      </p>
      <Link href={'/contact-us'} className="bg-[#003d6b] justify-between max-w-xs text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-3 hover:bg-[#00508f] transition shadow-lg whitespace-nowrap">
        <span>Get in touch</span>
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}