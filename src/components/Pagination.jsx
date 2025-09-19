import React from "react";

function Pagination({ currentPage, totalCount, pageSize, onPageChange }) {
  const totalPages = Math.ceil(totalCount / pageSize);

  const pages = [];

  for (let i = 1; i <= Math.min(4, totalPages); i++) {
    pages.push(i);
  }

  if (totalPages > 5) {
    pages.push("dots");
    pages.push(totalPages);
  } else if (totalPages === 5) {
    pages.push(5);
  }

  const handlePageClick = (page) => {
    if (typeof page === "number" && page !== currentPage) {
      onPageChange(page);
       window.scrollTo(0, 0);
    }
  };

  return (
    <div className="pagination">
      <button
        className="pagination-arrow"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹
      </button>
      {pages.map((page, idx) =>
        page === "dots" ? (
          <span className="pagination-dots" key={idx}>
            ...
          </span>
        ) : (
          <button
            key={page}
            className={
              "pagination-number" + (page === currentPage ? " active" : "")
            }
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        )
      )}
      <button
        className="pagination-arrow"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        ›
      </button>
    </div>
  );
}

export default Pagination;