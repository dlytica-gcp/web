import React, { useState, useEffect } from "react";
 
const Pagination = ({ totalPages, currentPage, filters, fetchStatData }) => {
  // Calculate the start and end of the range
  const startPage = currentPage;
  const endPage = Math.min(currentPage + 9, totalPages);
 
  useEffect(() => {}, [currentPage]);
 
  return (
    <nav
      className="page-navigation"
      aria-label="Page navigation example page-navigation"
    >
      <ul className="pagination">
        {currentPage > 1 && (
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => fetchStatData(filters, currentPage - 1)}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
        )}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const page = startPage + i;
          return (
            <li key={page} className="page-item">
              <a
                className="page-link"
                onClick={() => fetchStatData(filters, page)}
              >
                {page}
              </a>
            </li>
          );
        })}
        {currentPage < totalPages && (
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => fetchStatData(filters, currentPage + 1)}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};
 
export default Pagination;