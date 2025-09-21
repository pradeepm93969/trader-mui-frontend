class LocalStorageCache {
  /**
   * Stores a value in localStorage with an expiration time.
   * @param {string} key - The key under which the value is stored.
   * @param {T} value - The value to store.
   * @param {number} ttl - Time to live in milliseconds.
   */
  static put<T>(key: string, value: T, ttl: number) {
    const expiresAt = Date.now() + ttl;
    const data = {
      value,
      expiresAt,
    };
    localStorage.setItem(key, JSON.stringify(data));
  }

  static delete(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * Retrieves a value from localStorage if it hasn't expired.
   * @param {string} key - The key under which the value is stored.
   * @returns {T | null} - The retrieved value or null if expired or not found.
   */
  static get<T>(key: string): T | null {
    const storedData = localStorage.getItem(key);
    if (!storedData) return null;

    try {
      const parsedData = JSON.parse(storedData);
      const { value, expiresAt } = parsedData;

      if (Date.now() > expiresAt) {
        // If expired, remove from localStorage
        localStorage.removeItem(key);
        return null;
      }

      return value as T;
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return null;
    }
  }
}

export default LocalStorageCache;
