import React from 'react';

interface PaginationControlsProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ currentPage, pageCount, onPageChange }) => {
  if (pageCount <= 1) {
    return null;
  }

  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <nav aria-label="Table navigation">
        <ul className="flex justify-center items-center -space-x-px">
        <li>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 ml-0 leading-tight text-slate-400 bg-slate-800 border border-slate-700 rounded-l-lg hover:bg-slate-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Previous
            </button>
        </li>
        {pageNumbers.map(number => (
            <li key={number}>
                <button
                    onClick={() => onPageChange(number)}
                    aria-current={currentPage === number ? 'page' : undefined}
                    className={`px-3 py-2 leading-tight border ${
                        currentPage === number
                        ? 'text-white bg-brand-blue-500 border-brand-blue-500'
                        : 'text-slate-400 bg-slate-800 border-slate-700 hover:bg-slate-700 hover:text-white'
                    }`}
                >
                    {number}
                </button>
            </li>
        ))}
        <li>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === pageCount}
                className="px-3 py-2 leading-tight text-slate-400 bg-slate-800 border border-slate-700 rounded-r-lg hover:bg-slate-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </li>
        </ul>
    </nav>
  );
};

export default PaginationControls;