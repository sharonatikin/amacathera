import Link from "next/link";

 export default function Heading() {
   return (
      <nav className="sticky top-0 z-50 flex items-center justify-between  pr-40 mx-auto w-full">
             <div 
        className="w-36 h-22 mt-4 ml-10 "
        style={{
          backgroundImage: 'url("/logos/Amaca_Thera_Logo_PNG.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center left',
        }}
      /> 

      <div className="flex gap-10 items-center">
        {["About", "News", "Team", "Publication", "Technology", "Pipeline", "Contact Us"].map(
          (item) => (
            <Link
              href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
              key={item}
              className="text-slate-700 hover:text-blue-900 font-medium transition"
            >
              {item}
            </Link>
          )
        )}
      </div>
      </nav>
    );
}