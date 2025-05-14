
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useCallback, useState, use } from 'react';

export const useQueryFilters = (defaultFilters, fetchData) => {
  const router = useRouter();
  const pathname = usePathname();
  const [filters, setFilters] = useState({ ...defaultFilters });

  useEffect(() => {
    updateFilters({});
  }, []);

  const getCurrentFilters = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const query = { ...defaultFilters };

    for (const [key, value] of searchParams.entries()) {
        query[key] = value;
    }   
    return query;
  }
  // Update URL & trigger refetch
  const updateFilters = useCallback(
    (newFilters) => {
      const currentFilters = getCurrentFilters();
      
      const updated = { ...currentFilters, ...newFilters };
      const cleaned = Object.fromEntries(
        Object.entries(updated).filter(([_, v]) => v !== undefined && v !== '')
      );

      const queryString = new URLSearchParams(cleaned).toString();
      const newUrl = `${pathname}?${queryString}`;

      //window.history.pushState({}, '', newUrl);
      router.replace(newUrl);

      setFilters(updated);
      fetchData(updated);
    },
    [filters, fetchData]
  );

  return {
    filters,
    updateFilters,
  };
};
