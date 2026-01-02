"use client"
import React, { useState, useEffect, useRef } from 'react';
import styles from './SearchModal.module.css';
import TranslatedText from './TranslatedText';
import { useTranslation } from '../contexts/TranslationContext';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'page' | 'service' | 'blog' | 'faq';
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const { translateText } = useTranslation();

  // Mock search data - replace with your actual search implementation
  const searchData: SearchResult[] = [
    {
      id: '1',
      title: 'Web Development Services',
      description: 'Custom web development solutions using modern technologies',
      url: '/services/web-development',
      type: 'service'
    },
    {
      id: '2',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications',
      url: '/services/mobile-development',
      type: 'service'
    },
    {
      id: '3',
      title: 'AI & Machine Learning',
      description: 'Artificial intelligence and machine learning solutions',
      url: '/services/ai-ml',
      type: 'service'
    },
    {
      id: '4',
      title: 'About OMO Digital',
      description: 'Learn about our company, mission, and values',
      url: '/about',
      type: 'page'
    },
    {
      id: '5',
      title: 'Contact Us',
      description: 'Get in touch with our team for your project needs',
      url: '/contact',
      type: 'page'
    }
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            handleResultClick(results[selectedIndex]);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Filter results based on query
    const filteredResults = searchData.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filteredResults);
    setSelectedIndex(-1);
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    performSearch(value);
  };

  const handleResultClick = (result: SearchResult) => {
    // Navigate to result URL
    window.location.href = result.url;
    onClose();
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'service':
        return 'build';
      case 'page':
        return 'description';
      case 'blog':
        return 'article';
      case 'faq':
        return 'help';
      default:
        return 'search';
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <span className={`material-symbols-sharp ${styles.searchIcon}`}>
              search
            </span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search services, pages, and more..."
              value={query}
              onChange={handleInputChange}
              className={styles.searchInput}
            />
            {isLoading && (
              <span className={`material-symbols-sharp ${styles.loadingIcon}`}>
                progress_activity
              </span>
            )}
          </div>
        </div>

        <div className={styles.resultsContainer}>
          {query && !isLoading && results.length === 0 && (
            <div className={styles.noResults}>
              <span className="material-symbols-sharp">search_off</span>
              <p><TranslatedText text="No results found" /></p>
              <small><TranslatedText text="Try different keywords" /></small>
            </div>
          )}

          {results.length > 0 && (
            <div className={styles.results}>
              <div className={styles.resultsHeader}>
                <TranslatedText text="Search Results" />
                <span className={styles.resultCount}>
                  {results.length} {results.length === 1 ? 'result' : 'results'}
                </span>
              </div>
              
              {results.map((result, index) => (
                <div
                  key={result.id}
                  className={`${styles.resultItem} ${
                    index === selectedIndex ? styles.selected : ''
                  }`}
                  onClick={() => handleResultClick(result)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <span className={`material-symbols-sharp ${styles.resultIcon}`}>
                    {getResultIcon(result.type)}
                  </span>
                  <div className={styles.resultContent}>
                    <h3 className={styles.resultTitle}>{result.title}</h3>
                    <p className={styles.resultDescription}>{result.description}</p>
                    <span className={styles.resultUrl}>{result.url}</span>
                  </div>
                  <span className={`material-symbols-sharp ${styles.resultArrow}`}>
                    arrow_forward
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.shortcuts}>
            <span className={styles.shortcut}>
              <kbd>↑</kbd><kbd>↓</kbd> <TranslatedText text="to navigate" />
            </span>
            <span className={styles.shortcut}>
              <kbd>↵</kbd> <TranslatedText text="to select" />
            </span>
            <span className={styles.shortcut}>
              <kbd>esc</kbd> <TranslatedText text="to close" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;