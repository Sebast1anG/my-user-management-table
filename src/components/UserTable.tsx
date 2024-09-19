import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getUsers, setFilter } from '../features/users/usersSlice';
import SearchInput from './SearchInput';
import styles from '../styles/UserTable.module.css';

interface Filter {
    name: string;
    username: string;
    email: string;
    phone: string;
}

const UserTable = () => {
    const dispatch = useAppDispatch();
    const { users, filter } = useAppSelector((state) => state.users);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const handleFilterChange = (field: keyof Filter, value: string) => {
        dispatch(setFilter({ field, value }));
    };

    const handleClearFilter = (field: keyof Filter) => {
        dispatch(setFilter({ field, value: '' }));
    };

    const filteredUsers = useMemo(() => {
        if (!users.length) return [];
        return users.filter((user) =>
            Object.keys(filter).every((key) =>
                user[key as keyof Filter].toLowerCase().includes((filter as { [key: string]: string })[key].toLowerCase())
            )
        );
    }, [users, filter]);

    const highlightMatch = (text: string, filterValue: string) => {
        if (!filterValue) return text;
        const regex = new RegExp(`(${filterValue})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, index) =>
            regex.test(part) ? <mark key={index} className={styles.highlight}>{part}</mark> : part
        );
    };

    return (
        <div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {(['name', 'username', 'email', 'phone'] as const).map((field) => (
                            <TableHeaderCell
                                key={field}
                                field={field}
                                value={filter[field]}
                                onChange={handleFilterChange}
                                onClear={() => handleClearFilter(field)}
                            />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{highlightMatch(user.name, filter.name)}</td>
                            <td>{highlightMatch(user.username, filter.username)}</td>
                            <td>{highlightMatch(user.email, filter.email)}</td>
                            <td>{highlightMatch(user.phone, filter.phone)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

interface TableHeaderCellProps {
    field: keyof Filter;
    value: string;
    onChange: (field: keyof Filter, value: string) => void;
    onClear: () => void;
}

const TableHeaderCell = ({ field, value, onChange, onClear }: TableHeaderCellProps) => {
    return (
        <th>
            {field.charAt(0).toUpperCase() + field.slice(1)}
            <SearchInput value={value} onChange={(e) => onChange(field, e.target.value)} onClear={onClear} />
        </th>
    );
};

export default UserTable;
