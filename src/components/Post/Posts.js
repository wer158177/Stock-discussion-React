import React, { useState, useCallback, useRef, useEffect } from 'react';
import PostItem from './PostItem';
import { HeartIcon, CommentIcon, ShareIcon } from '../Icons/PostIcons';
import IconButton from '../Icons/IconButton';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import './Post.css';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [interactions, setInteractions] = useState({
    likes: {},
    bookmarks: {},
  });

  const fetchPosts = useCallback(async page => {
    const POSTS_PER_PAGE = 5;
    const newPosts = Array(POSTS_PER_PAGE)
      .fill()
      .map((_, i) => ({
        id: (page - 1) * POSTS_PER_PAGE + i + 1,
        username: `user_${(page - 1) * POSTS_PER_PAGE + i + 1}`,
        userImage: `https://via.placeholder.com/50x50?text=User${(page - 1) * POSTS_PER_PAGE + i + 1}`,
        // image: `https://picsum.photos/800/600?random=${(page - 1) * POSTS_PER_PAGE + i + 1}`,
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                #stock #investment #trading`,
        likes: Math.floor(Math.random() * 1000),
        comments: [
          {
            id: 1,
            username: 'trader_1',
            userImage: 'https://via.placeholder.com/32x32',
            text: '좋은 분석이네요! 👍',
            timestamp: '5분 전',
          },
          {
            id: 2,
            username: 'investor_2',
            userImage: 'https://via.placeholder.com/32x32',
            text: '이 종목 관심있게 보고있었는데 감사합니다.',
            timestamp: '10분 전',
          },
          {
            id: 3,
            username: 'stock_master',
            userImage: 'https://via.placeholder.com/32x32',
            text: '차트 분석이 정확하네요',
            timestamp: '15분 전',
          },
        ],
        shares: Math.floor(Math.random() * 50),
        timestamp: '방금 전',
        profileLink: `/profile/${(page - 1) * POSTS_PER_PAGE + i + 1}`,
        attachments: [
          {
            type: 'image',
            url: `https://picsum.photos/800/600?random=${(page - 1) * POSTS_PER_PAGE + i + 1}`,
          },
        ],
      }));

    setPosts(prev => [...prev, ...newPosts]);
    return newPosts;
  }, []);

  const { loading, error, loadMore } = useInfiniteScroll(fetchPosts);

  const handleInteraction = useCallback((type, postId) => {
    setInteractions(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [postId]: !prev[type][postId],
      },
    }));
  }, []);

  const handleAddComment = (postId, comment) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: post.comments.length + 1,
                  username: 'current_user',
                  userImage: 'https://via.placeholder.com/32x32',
                  text: comment,
                  timestamp: '방금 전',
                },
              ],
            }
          : post
      )
    );
  };

  const containerRef = useRef(null);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading) {
        loadMore();
      }
    }, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [loading, loadMore]);

  if (error) return <div className='error'>Error loading posts</div>;

  return (
    <div className='posts-container'>
      {posts.map(post => (
        <PostItem
          key={post.id}
          post={post}
          onLike={() => handleInteraction('likes', post.id)}
          onBookmark={() => handleInteraction('bookmarks', post.id)}
          liked={interactions.likes[post.id]}
          bookmarked={interactions.bookmarks[post.id]}
          isLike={true} // 추가: isLike prop
          onAddComment={handleAddComment}
        />
      ))}
      <div ref={containerRef} className='scroll-trigger'>
        {loading && <div className='loading'>게시물을 불러오는 중...</div>}
      </div>
    </div>
  );
}

export default Posts;
