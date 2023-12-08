export const auth = {
  setUser: (userPayload) => {
    localStorage.setItem('user_token', userPayload);
  },
  getUser: () => {
    return localStorage.getItem('user_token');
  },
  deleteUser: () => {
    localStorage.removeItem('user_token');
  },
};
