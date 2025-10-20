import { useState, useMemo } from 'react';

type SortDirection = 'ascending' | 'descending';

interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

export const useTableManager = <T extends {}>(items: T[], itemsPerPage: number = 5) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const pageCount = Math.ceil(sortedItems.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return sortedItems.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sortedItems, itemsPerPage]);

  const requestSort = (key: keyof T) => {
    let direction: SortDirection = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page on sort
  };

  return {
    currentItems,
    requestSort,
    sortConfig,
    currentPage,
    setCurrentPage,
    pageCount,
  };
};