import React from 'react';
import styles from '../styles/SearchInput.module.css';

interface SearchInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
}

const SearchInput = ({ value, onChange, onClear }: SearchInputProps) => {
    return (
        <div className={styles.searchInputContainer}>
            <input
                type="text"
                value={value}
                onChange={onChange}
                className={styles.searchInput}
            />
            {value && (
                <button onClick={onClear} className={styles.clearButton}>
                    x
                </button>
            )}
        </div>
    );
};

export default SearchInput;
