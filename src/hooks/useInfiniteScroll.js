import { useState, useEffect, useCallback } from 'react';

const useInfiniteScroll = fetchCallback => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]); // 데이터 상태 추가

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newItems = await fetchCallback(page);
      if (!newItems?.length) {
        setHasMore(false);
      } else {
        setData(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      setError(err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [fetchCallback, page, loading, hasMore]);

  // 초기 데이터 로드
  useEffect(() => {
    loadMore();
  }, []); // 컴포넌트 마운트 시 1회 실행

  // 스크롤 이벤트 리스너
  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;

      if (
        !loading &&
        hasMore &&
        scrollHeight - scrollTop <= clientHeight * 1.5
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore, loading, hasMore]);

  return {
    data,
    loading,
    hasMore,
    error,
    loadMore,
    setData, // 데이터 수정을 위한 setter 함수 추가
  };
};

export default useInfiniteScroll;
