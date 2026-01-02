'use client';

import React, { useState, useEffect } from 'react';
import styles from '../BlogSection.module.css';
import Image from 'next/image';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  image: string;
}

const BlogSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Building Sahaj Hyderabad: A Journey of Community,",
      excerpt: "A little over a year ago, I landed in Hyderabad with a single mission—to set up and grow Sahaj's presence",
      author: "Chinmay Awade",
      image: "/blogs/image6.jpg" // Corrected path

    },
    {
      id: 2,
      title: "Building Sahaj Hyderabad: A Journey of Community,",
      excerpt: "A little over a year ago, I landed in Hyderabad with a single mission—to set up and grow Sahaj's presence",
      author: "Chinmay Awade",
      image: "/blogs/image7.jpg" // Corrected path
    },
    {
      id: 3,
      title: "Building Sahaj Hyderabad: A Journey of Community,",
      excerpt: "A little over a year ago, I landed in Hyderabad with a single mission—to set up and grow Sahaj's presence",
      author: "Chinmay Awade",
      image: "/blogs/image8.jpg" // Corrected path
    },
    {
      id: 4,
      title: "Building Sahaj Hyderabad: A Journey of Community,",
      excerpt: "A little over a year ago, I landed in Hyderabad with a single mission—to set up and grow Sahaj's presence",
      author: "Chinmay Awade",
      image: "/blogs/image10.jpg" // Corrected path
    },
    {
      id: 5,
      title: "Building Sahaj Hyderabad: A Journey of Community,",
      excerpt: "A little over a year ago, I landed in Hyderabad with a single mission—to set up and grow Sahaj's presence",
      author: "Chinmay Awade",
      image: "/blogs/image9.jpg" // Corrected path
    }
  ];

  const visiblePosts = 3.5; // Show 3.5 cards at a time
  const maxIndex = Math.max(0, blogPosts.length - Math.floor(visiblePosts));

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= maxIndex) {
          return 0; // Reset to beginning
        }
        return prev + 1;
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0));
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Blogs, News and Articles</h2>
      </div>

      <div
        className={styles.carouselContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <span className="material-symbols-sharp">
            west
          </span>
        </button>

        <div className={styles.carousel}>
          <div
            className={styles.carouselTrack}
            style={{
              transform: `translateX(-${currentIndex * (100 / visiblePosts)}%)`,
            }}
          >
            {blogPosts.map((post) => (
              <div key={post.id} className={styles.blogCard}>
                <div className={styles.imageContainer}>
                  <div className={styles.placeholderImage}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  </div>
                </div>


                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
          
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={handleNext}
          disabled={currentIndex === maxIndex}
        >
          <span className="material-symbols-sharp">
            arrow_right_alt
          </span>
        </button>
      </div>

      <div className={styles.indicators}>
        {Array.from({ length: maxIndex + 1 }, (_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ''
              }`}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;