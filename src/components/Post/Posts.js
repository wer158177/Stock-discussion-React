import React, { useState, useCallback, useRef, useEffect } from 'react';
import PostItem from './PostItem';
import { postService } from '../../services/post.service';
import './Post.css';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [interactions, setInteractions] = useState({
    likes: {},
  });
  
  const timeoutRef = useRef(null);

  const fetchPosts = useCallback(async () => {
    if (!hasMore || loading) return;
    
    try {
      setLoading(true);
      
      // 1초 딜레이 추가
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await postService.getPosts(page);
      const newPosts = response.content;
      
      // liked 상태 초기화
      const newLikes = {};
      newPosts.forEach(post => {
        newLikes[post.id] = post.liked;
      });
      
      setPosts(prev => [...prev, ...newPosts]);
      setInteractions(prev => ({
        ...prev,
        likes: { ...prev.likes, ...newLikes }
      }));
      setHasMore(!response.last);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  const handleLike = async (postId) => {
    try {
      const isLiked = interactions.likes[postId];
      
      if (isLiked) {
        await postService.unlikePost(postId);
      } else {
        await postService.likePost(postId);
      }

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, likes: post.likes + (isLiked ? -1 : 1) }
            : post
        )
      );
      
      setInteractions(prev => ({
        ...prev,
        likes: { ...prev.likes, [postId]: !isLiked }
      }));
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  const containerRef = useRef(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          // 쓰로틀링 적용
          if (timeoutRef.current) return;
          
          timeoutRef.current = setTimeout(() => {
            fetchPosts();
            timeoutRef.current = null;
          }, 1000);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [loading, hasMore, fetchPosts]);

  return (
    <div className='posts-container'>
      {posts.map(post => {
        console.log('Post data:', post); // 게시글 데이터 로깅
        return (
          <PostItem
            key={post.id}
            post={post}
            onLike={() => handleLike(post.id)}
            liked={interactions.likes[post.id]}
            onAddComment={() => {}}
          />
        );
      })}
      <div ref={containerRef} className='scroll-trigger'>
        {loading && <div className='loading'>게시물을 불러오는 중...</div>}
      </div>
    </div>
  );
}

export default Posts;