import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getUsers, setFilter } from '../features/users/usersSlice';
import SearchInput from './SearchInput';
import styles from '../styles/UserTable.module.css';

const UserTable = () => {
    const dispatch = useAppDispatch();
    const { users, filter } = useAppSelector((state) => state.users);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const handleFilterChange = (field: string, value: string) => {
        dispatch(setFilter({ field: field as keyof typeof filter, value }));
    };

    const filteredUsers = users.filter((user) =>
        Object.keys(filter).every((key) =>
            user[key as keyof typeof filter].toLowerCase().includes(filter[key as keyof typeof filter].toLowerCase())
        )
    );

    if (!users.length) {
        return null;
    }

    return (
        <div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>
                            Name
                            <SearchInput
                                value={filter.name}
                                onChange={(e) => handleFilterChange('name', e.target.value)}
                            />
                        </th>
                        <th>
                            Username
                            <SearchInput
                                value={filter.username}
                                onChange={(e) => handleFilterChange('username', e.target.value)}
                            />
                        </th>
                        <th>
                            Email
                            <SearchInput
                                value={filter.email}
                                onChange={(e) => handleFilterChange('email', e.target.value)}
                            />
                        </th>
                        <th>
                            Phone
                            <SearchInput
                                value={filter.phone}
                                onChange={(e) => handleFilterChange('phone', e.target.value)}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
