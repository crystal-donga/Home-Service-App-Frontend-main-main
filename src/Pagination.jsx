import React from 'react'
import PropTypes from 'prop-types';
export default function Pagination({currentPage,totalPages,onChangePage}) {
    const pages=Array.from({length:totalPages},(_,i)=>i);
    return (
        <div className="mt-8 flex justify-center items-center space-x-2 flex-wrap">
          <button
            onClick={() => onChangePage(Math.max(currentPage - 1, 0))}
            disabled={currentPage === 0}
            className="px-3 py-1 bg-white text-gray-800 border rounded-md hover:bg-gray-100 disabled:opacity-50 hover:cursor-pointer"
          >
            Previous
          </button>
    
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onChangePage(page)}
              className={`px-3 py-1 border rounded-md ${
                page === currentPage
                  ? "bg-purple-800 text-white font-bold"
                  : "bg-white text-gray-800 hover:bg-gray-100 cursor-pointer"
              }`}
            >
              {page + 1}
            </button>
          ))}
    
          <button
            onClick={() => onChangePage(Math.min(currentPage + 1, totalPages - 1))}
            disabled={currentPage >= totalPages - 1}
            className="px-3 py-1 bg-white text-gray-800 border rounded-md hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      );
}


Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
  };