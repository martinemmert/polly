import Signal from "min-signal";

class ProxyMap {

  constructor(iterable) {
    this.__map__ = new Map(iterable);
  }

  [Symbol.iterator]() { return this.__map__; }

  get size() { return this.__map__.size; }

  clear() { return this.__map__.clear(); }

  delete(key) { return this.__map__.delete(key); }

  entries() { return this.__map__.entries(); }

  forEach(callbackFn, thisArg) { this.__map__.forEach(callbackFn, thisArg); }

  get(key) { return this.__map__.get(key); }

  has(key) { return this.__map__.has(key); }

  keys() { return this.__map__.keys(); }

  set(key, value) { return this.__map__.set(key, value); }

  values() { return this.__map__.values(); }
}

class ProxyWeakMap {

  constructor(iterable) {
    this.__map__ = new WeakMap(iterable);
  }

  [Symbol.iterator]() { return this.__map__; }

  delete(key) { return this.__map__.delete(key); }

  get(key) { return this.__map__.get(key); }

  has(key) { return this.__map__.has(key); }

  set(key, value) { return this.__map__.set(key, value); }
}

export class SignalMap extends ProxyMap {

  get added(): Signal { return this._added; }

  get deleted(): Signal { return this._deleted; }

  get cleared(): Signal { return this._cleared; }

  constructor(iterable) {
    super(iterable);
    Object.defineProperties(this, {
      _added: {value: new Signal},
      _deleted: {value: new Signal},
      _cleared: {value: new Signal},
    });
  }

  set(key, value) {
    let existed = this.has(key);
    super.set(key, value);
    if (!existed) this.added.dispatch(value, key, this);
    return this;
  }

  delete(key) {
    let element = this.get(key);
    let removed = super.delete(key);

    if (element) {
      this.deleted.dispatch(element, key, this);
    }

    return removed;
  }

  clear() {
    super.clear();
    this.cleared.dispatch(this);
  }
}

export class SignalWeakMap extends ProxyWeakMap {

  get added(): Signal { return this._added; }

  get deleted(): Signal { return this._deleted; }

  constructor(iterable) {
    super(iterable);
    Object.defineProperties(this, {
      _added: {value: new Signal},
      _deleted: {value: new Signal},
    });
  }

  set(key, value) {
    let existed = this.has(key);
    super.set(key, value);
    if (!existed) this.added.dispatch(value, key, this);
    return this;
  }

  delete(key) {
    let element = this.get(key);
    let removed = super.delete(key);

    if (element) {
      this.deleted.dispatch(element, key, this);
    }

    return removed;
  }

}
