"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalWeakMap = exports.SignalMap = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _minSignal = require("min-signal");

var _minSignal2 = _interopRequireDefault(_minSignal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProxyMap = function () {
  function ProxyMap(iterable) {
    _classCallCheck(this, ProxyMap);

    this.__map__ = new Map(iterable);
  }

  _createClass(ProxyMap, [{
    key: Symbol.iterator,
    value: function value() {
      return this.__map__;
    }
  }, {
    key: "clear",
    value: function clear() {
      return this.__map__.clear();
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      return this.__map__.delete(key);
    }
  }, {
    key: "entries",
    value: function entries() {
      return this.__map__.entries();
    }
  }, {
    key: "forEach",
    value: function forEach(callbackFn, thisArg) {
      this.__map__.forEach(callbackFn, thisArg);
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.__map__.get(key);
    }
  }, {
    key: "has",
    value: function has(key) {
      return this.__map__.has(key);
    }
  }, {
    key: "keys",
    value: function keys() {
      return this.__map__.keys();
    }
  }, {
    key: "set",
    value: function set(key, value) {
      return this.__map__.set(key, value);
    }
  }, {
    key: "values",
    value: function values() {
      return this.__map__.values();
    }
  }, {
    key: "size",
    get: function get() {
      return this.__map__.size;
    }
  }]);

  return ProxyMap;
}();

var ProxyWeakMap = function () {
  function ProxyWeakMap(iterable) {
    _classCallCheck(this, ProxyWeakMap);

    this.__map__ = new WeakMap(iterable);
  }

  _createClass(ProxyWeakMap, [{
    key: Symbol.iterator,
    value: function value() {
      return this.__map__;
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      return this.__map__.delete(key);
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.__map__.get(key);
    }
  }, {
    key: "has",
    value: function has(key) {
      return this.__map__.has(key);
    }
  }, {
    key: "set",
    value: function set(key, value) {
      return this.__map__.set(key, value);
    }
  }]);

  return ProxyWeakMap;
}();

var SignalMap = exports.SignalMap = function (_ProxyMap) {
  _inherits(SignalMap, _ProxyMap);

  _createClass(SignalMap, [{
    key: "added",
    get: function get() {
      return this._added;
    }
  }, {
    key: "deleted",
    get: function get() {
      return this._deleted;
    }
  }, {
    key: "cleared",
    get: function get() {
      return this._cleared;
    }
  }]);

  function SignalMap(iterable) {
    _classCallCheck(this, SignalMap);

    var _this = _possibleConstructorReturn(this, (SignalMap.__proto__ || Object.getPrototypeOf(SignalMap)).call(this, iterable));

    Object.defineProperties(_this, {
      _added: { value: new _minSignal2.default() },
      _deleted: { value: new _minSignal2.default() },
      _cleared: { value: new _minSignal2.default() }
    });
    return _this;
  }

  _createClass(SignalMap, [{
    key: "set",
    value: function set(key, value) {
      var existed = this.has(key);
      _get(SignalMap.prototype.__proto__ || Object.getPrototypeOf(SignalMap.prototype), "set", this).call(this, key, value);
      if (!existed) this.added.dispatch(value, key, this);
      return this;
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      var element = this.get(key);
      var removed = _get(SignalMap.prototype.__proto__ || Object.getPrototypeOf(SignalMap.prototype), "delete", this).call(this, key);

      if (element) {
        this.deleted.dispatch(element, key, this);
      }

      return removed;
    }
  }, {
    key: "clear",
    value: function clear() {
      _get(SignalMap.prototype.__proto__ || Object.getPrototypeOf(SignalMap.prototype), "clear", this).call(this);
      this.cleared.dispatch(this);
    }
  }]);

  return SignalMap;
}(ProxyMap);

var SignalWeakMap = exports.SignalWeakMap = function (_ProxyWeakMap) {
  _inherits(SignalWeakMap, _ProxyWeakMap);

  _createClass(SignalWeakMap, [{
    key: "added",
    get: function get() {
      return this._added;
    }
  }, {
    key: "deleted",
    get: function get() {
      return this._deleted;
    }
  }]);

  function SignalWeakMap(iterable) {
    _classCallCheck(this, SignalWeakMap);

    var _this2 = _possibleConstructorReturn(this, (SignalWeakMap.__proto__ || Object.getPrototypeOf(SignalWeakMap)).call(this, iterable));

    Object.defineProperties(_this2, {
      _added: { value: new _minSignal2.default() },
      _deleted: { value: new _minSignal2.default() }
    });
    return _this2;
  }

  _createClass(SignalWeakMap, [{
    key: "set",
    value: function set(key, value) {
      var existed = this.has(key);
      _get(SignalWeakMap.prototype.__proto__ || Object.getPrototypeOf(SignalWeakMap.prototype), "set", this).call(this, key, value);
      if (!existed) this.added.dispatch(value, key, this);
      return this;
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      var element = this.get(key);
      var removed = _get(SignalWeakMap.prototype.__proto__ || Object.getPrototypeOf(SignalWeakMap.prototype), "delete", this).call(this, key);

      if (element) {
        this.deleted.dispatch(element, key, this);
      }

      return removed;
    }
  }]);

  return SignalWeakMap;
}(ProxyWeakMap);