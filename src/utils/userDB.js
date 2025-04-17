// src/utils/userDB.js
export const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
};

export const getUsers = () => {
    const usersJSON = localStorage.getItem('users');
    return usersJSON ? JSON.parse(usersJSON) : [];
};

export const getUserById = (id) => {
    const users = getUsers();
    return users.find(user => user.id === id);
};

export const deleteUser = (id) => {
    const users = getUsers().filter(user => user.id !== id);
    localStorage.setItem('users', JSON.stringify(users));
};