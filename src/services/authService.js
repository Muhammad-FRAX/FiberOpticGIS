export const login = async (username, password) => {
    
    if (username === 'admin' && password === 'admin') {
      return { username: 'admin' };
    } else {
      throw new Error('Invalid username or password');
    }
  };
  