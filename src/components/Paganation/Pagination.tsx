import React from 'react';
import ArrowLeft from 'components/icons/ArrowLeft';
import ArrowRight from 'components/icons/ArrowRight';
import classNames from 'classnames';
import styles from './Pagination.module.scss';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 4;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (totalPages > maxVisible) {
      if (currentPage <= 3) {
        end = maxVisible;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - maxVisible + 1;
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className={styles.pagination}>
      <button
        className={classNames(styles.pagination__arrow, {
          [styles['pagination__arrow--disabled']]: currentPage === 1,
        })}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <ArrowLeft height={32} width={32} className={styles.pagination__icon} />
      </button>
      <div className={styles.pagination__pages}>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            className={classNames(styles.pagination__page, {
              [styles['pagination__page--active']]: page === currentPage,
            })}
            onClick={() => onPageChange(page)}
          >
            <p>{page}</p>
          </button>
        ))}
      </div>
      <button
        className={classNames(styles.pagination__arrow, {
          [styles['pagination__arrow--disabled']]: currentPage === totalPages,
        })}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <ArrowRight height={32} width={32} className={styles.pagination__icon} />
      </button>
    </div>
  );
};

export default Pagination;
