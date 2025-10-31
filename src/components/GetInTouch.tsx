import { ArrowRight } from "lucide-react";

export default function GetInTouch() {
  return (
    <div className="max-w-7xl mx-auto my-16 flex items-center justify-between">
      <p className="text-[#1e3a5f] text-lg max-w-2xl">
        AmacaThera seeks to partner with like minded companies to co-develop new, exciting products that provide on-time, on-target therapeutic solutions.
      </p>
      <button className="bg-[#003d6b] text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-3 hover:bg-[#00508f] transition shadow-lg whitespace-nowrap">
        Get in touch
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}