const usersByEmail = new Map();
const usersById = new Map();

export const userStore = {
  findByEmail(email) {
    return usersByEmail.get(email.toLowerCase()) ?? null;
  },
  findById(id) {
    return usersById.get(id) ?? null;
  },
  create(user) {
    const normalizedEmail = user.email.toLowerCase();
    usersByEmail.set(normalizedEmail, user);
    usersById.set(user.id, user);
    return user;
  },
};
