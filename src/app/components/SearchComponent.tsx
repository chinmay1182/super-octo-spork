"use client"
import React, { useState } from 'react';
import styles from '../SearchComponent.module.css';

interface Suggestion {
    icon: string;
    title: string;
}

const SearchComponent: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const suggestions: Suggestion[] = [
        {
            icon: 'cloud',
            title: 'What services does OMO offer in Cloud Migration?'
        },
        {
            icon: 'security',
            title: 'What services does OMO offer in Cybersecurity?'
        },
        {
            icon: 'trending_up',
            title: 'Generative AI trends for 2025'
        },

    ];

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Search query:', searchQuery);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSearchQuery(suggestion);
        console.log('Selected suggestion:', suggestion);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.cardContent}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Have tech questions?</h1>
                        <p className={styles.subtitle}>
                            Our <span className={styles.highlight}>AI answer engine</span> can help.
                        </p>
                    </div>

                    <div className={styles.cardContentTwo}>
                        <form onSubmit={handleSearch} className={styles.searchForm}>
                            <div className={styles.searchContainer}>
                                <div className={styles.searchInputWrapper}>

                                    <input
                                        type="text"
                                        placeholder="Please ask a question or initiate a search."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className={styles.searchInput}
                                    />
                                    <button type="submit" className={styles.searchButton}>
                                        <span  className="material-symbols-sharp">
                                            search
                                        </span>
                                    </button>
                                </div>

                            </div>
                        </form>

                        <div className={styles.suggestionsSection}>
                            <h3 className={styles.suggestionsTitle}>Suggestions</h3>
                            <div className={styles.suggestionsGrid}>
                                {suggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className={styles.suggestionCard}
                                        onClick={() => handleSuggestionClick(suggestion.title)}
                                    >

                                        <p className={styles.suggestionText}>{suggestion.title}</p>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchComponent;