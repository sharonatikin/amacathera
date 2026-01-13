import { INews } from '@/types/news';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number; // or a specific Stock[] type if defined
  setItemsPerPage: (value: number) => void;
  setCurrentPage: (page: number) => void;
};

const Pagination = ({
  currentPage,
  itemsPerPage,
  setItemsPerPage,
  setCurrentPage,
  totalPages,
}: PaginationProps) => {

  // const startItem = (currentPage - 1) * itemsPerPage + 1;
  // const endItem = Math.min(currentPage * itemsPerPage, stockData.length);

  // Generate page numbers with ellipsis for large page counts
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const itemsOptions = [10, 20, 50];

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="bg-gray-50 border-t border-gray-200 px-4 md:px-6 py-3 md:py-4">
      {/* Mobile Layout */}
      <div className="md:hidden space-y-3">
        {/* Items Per Page */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">Items per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-slate-500 rounded px-3 py-1.5 text-slate-200 text-xs font-medium flex items-center gap-2 transition-colors"
          >
            {itemsOptions.map((option) => (
              <option
                key={option}
                className={`w-full px-4 py-2 text-xs text-left hover:bg-slate-600 transition-colors ${itemsPerPage === option
                  ? 'bg-cyan-600/30 text-cyan-300 font-semibold'
                  : 'text-slate-200'
                  }`}
              >
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Page Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-600 rounded px-2 py-1.5 text-slate-200 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <select
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
            className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-slate-200 text-xs"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <option
                key={page}
                value={page} // ✅ important: numeric value
                className={`w-full px-4 py-2 text-xs text-left hover:bg-slate-600 transition-colors ${currentPage === page
                    ? 'bg-cyan-600/30 text-cyan-300 font-semibold'
                    : 'text-slate-200'
                  }`}
              >
                Page {page}
              </option>
            ))}
          </select>


          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-600 rounded px-2 py-1.5 text-slate-200 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Info */}
        {/* <div className="text-xs text-center text-slate-400">
          Showing {startItem} to {endItem} of {stockData.length}
        </div> */}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between">
        {/* Left: Page Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Page:</span>
          <select
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
            className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-slate-200 text-xs"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <option
                key={page}
                value={page} // ✅ important: numeric value
                className={`w-full px-4 py-2 text-xs text-left hover:bg-slate-600 transition-colors ${currentPage === page
                    ? 'bg-cyan-600/30 text-cyan-300 font-semibold'
                    : 'text-slate-200'
                  }`}
              >
                Page {page}
              </option>
            ))}
          </select>
        </div>

        {/* Center: Page Numbers and Navigation */}
        <div className="flex items-center gap-1">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="p-1.5 rounded border border-slate-600 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-400 hover:text-slate-200 transition-colors"
            title="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1 px-2">
            {pageNumbers.map((page, idx) => (
              <div key={idx}>
                {page === '...' ? (
                  <span className="text-slate-400 text-xs px-1">...</span>
                ) : (
                  <button
                    onClick={() => handlePageChange(page as number)}
                    className={`px-2.5 py-1.5 rounded text-xs font-medium transition-all ${currentPage === page
                      ? 'bg-cyan-600 text-white font-bold shadow-lg shadow-cyan-600/30'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-slate-100 border border-transparent hover:border-slate-600'
                      }`}
                  >
                    {page}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded border border-slate-600 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-400 hover:text-slate-200 transition-colors"
            title="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Items Per Page and Info */}
        {/* <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 whitespace-nowrap">
            Showing {startItem}–{endItem} of {stockData.length}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-slate-500 rounded px-3 py-1.5 text-slate-200 text-xs font-medium flex items-center gap-2 transition-colors"
            >
              {itemsOptions.map((option) => (
                <option
                  key={option}
                  className={`w-full px-4 py-2 text-xs text-left hover:bg-slate-600 transition-colors ${itemsPerPage === option
                    ? 'bg-cyan-600/30 text-cyan-300 font-semibold'
                    : 'text-slate-200'
                    }`}
                >
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div> */}
      </div>
      
    </div>
  );
};

export default Pagination;