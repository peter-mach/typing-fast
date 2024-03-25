class LocalStorageService {
  // Retrieve a value from local storage
  static getItem(key: string): string | null {
    return localStorage.getItem(key)
  }

  // Store a value in local storage
  static setItem(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  // Remove an item from local storage
  static removeItem(key: string): void {
    localStorage.removeItem(key)
  }
}
export default LocalStorageService
