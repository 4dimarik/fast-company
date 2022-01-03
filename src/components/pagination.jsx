import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

export default function Pagination({ itemsCount, pageSize, onPageChange, currentPage }) {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button
            type="button"
            className="page-link"
            aria-label="Previous"
            onClick={() => {
              const page = currentPage - 1 < 1 ? 1 : (currentPage -= 1);
              return onPageChange(page);
            }}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {pages.map((page) => (
          <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
            <button type="button" className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            type="button"
            className="page-link"
            aria-label="Next"
            onClick={() => {
              const page = currentPage + 1 > pageCount ? pageCount : (currentPage += 1);
              return onPageChange(page);
            }}
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
