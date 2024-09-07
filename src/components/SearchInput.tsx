interface SearchInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => (
    <input type="text" value={value} onChange={onChange} />
);

export default SearchInput;
