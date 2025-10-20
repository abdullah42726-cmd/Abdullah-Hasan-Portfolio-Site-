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
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
                        ? 'text-brand-blue-600 bg-blue-50 border-brand-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                        : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
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
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
                Next
            </button>
        </li>
        </ul>
    </nav>
  );
};

export default PaginationControls;