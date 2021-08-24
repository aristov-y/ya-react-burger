// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
class LocalStorageMock implements Storage {
  private store: any;
  constructor() {
    this.store = {};
  }

  get length() {
    return Object.keys(this.store).length;
  }

  key(n: number) {
    const keys = Object.keys(this.store);
    const key = keys[n];
    if (key) {
      return this.store[key];
    }
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock;
