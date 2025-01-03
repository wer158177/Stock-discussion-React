import { useState, useEffect, useCallback } from 'react';

const useInfiniteScroll = (fetchCallback) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newItems = await fetchCallback(page);
      if (!newItems?.length) {
        setHasMore(false);
      }
      setPage(prev => prev + 1);
    } catch (err) {
      setError(err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [fetchCallback, page, loading, hasMore]);

  return {
    page,
    loading,
    hasMore,
    error,
    loadMore
  };
};

export default useInfiniteScroll;