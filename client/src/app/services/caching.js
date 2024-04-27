export const CacheService = {
  set: (key, data) => {
    const serializedData = JSON.stringify(data);
    sessionStorage.setItem(key, serializedData);
  },

  get: (key) => {
    const serializedData = sessionStorage.getItem(key);
    return serializedData ? JSON.parse(serializedData) : null;
  },

  clear: () => {
    sessionStorage.clear();
  },
};
