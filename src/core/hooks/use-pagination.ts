import { useMemo } from 'react';

const DOTS = '...' as const;

type PaginationItem = number | typeof DOTS;

export function usePagination({
  totalItems,
  pageSize,
  currentPage,
  siblingCount = 1,
}: UsePaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const firstItem = (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, totalItems);

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const pages: PaginationItem[] = useMemo(() => {
    // e.g. totalPages = 7, show all
    const totalPageNumbers = siblingCount * 2 + 5; // siblings + first + last + current + 2 dots
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      // [1, 2, 3, 4, ..., N]
      const leftRange = Array.from(
        { length: 3 + siblingCount * 2 },
        (_, i) => i + 1,
      );
      return [...leftRange, DOTS, totalPages];
    }

    if (showLeftDots && !showRightDots) {
      // [1, ..., N-3, N-2, N-1, N]
      const rightRange = Array.from(
        { length: 3 + siblingCount * 2 },
        (_, i) => totalPages - (3 + siblingCount * 2) + i + 1,
      );
      return [1, DOTS, ...rightRange];
    }

    // [1, ..., X-1, X, X+1, ..., N]
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i,
    );
    return [1, DOTS, ...middleRange, DOTS, totalPages];
  }, [totalItems, pageSize, currentPage, siblingCount]);

  return {
    pages,
    totalPages,
    isFirst: currentPage === 1,
    isLast: currentPage === totalPages,
    hasDots: (item: PaginationItem): item is typeof DOTS => item === DOTS,
    firstItem,
    lastItem,
  };
}

export type UsePaginationProps = {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  siblingCount: number;
};
