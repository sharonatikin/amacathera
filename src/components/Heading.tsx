 export default function Heading() {
   return (
      <nav className="sticky top-0 z-50 flex items-center justify-between  pr-40 mx-auto w-full">
             <div 
        className="w-32 h-22 mt-4 ml-10 "
        style={{
          backgroundImage: 'url("/images/Logo.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center left',
        }}
      /> 

      <div className="flex gap-10 items-center">
        {["About", "News", "Publication", "Technology", "Pipeline", "Partners", "Contact Us"].map(
          (item) => (
            <button
              key={item}
              className="text-slate-700 hover:text-blue-900 font-medium transition"
            >
              {item}
            </button>
          )
        )}
      </div>
      </nav>
    );
}