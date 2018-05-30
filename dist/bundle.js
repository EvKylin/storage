'use strict';

var version = "0.0.1";

function Storage(type) {
    this.version = version;
    const storage = type === "local" ? localStorage : sessionStorage;
    const set = (name$$1, data) => {
      const type = Object.prototype.toString.call(data);
      if (storage[name$$1]) {
        switch (type) {
          case "[object Array]":
            storage[name$$1] = JSON.stringify(data);
            break;
          case "[object JSON]":
          case "[object Object]":
            storage[name$$1] = JSON.stringify({
              ...JSON.parse(storage[name$$1]),
              ...data
            });
            break;
          case "[object String]":
            storage[name$$1] = data;
            break;
          case "[object Number]":
          case "[object Null]":
          case "[object Undefined]":
          default:
            storage[name$$1] = data.toString();
        }
      } else {
        switch (type) {
          case "[object Array]":
          case "[object JSON]":
          case "[object Object]":
            storage[name$$1] = JSON.stringify(data);
            break;
          case "[object String]":
            storage[name$$1] = data;
            break;
          case "[object Number]":
          case "[object Null]":
          case "[object Undefined]":
          default:
            storage[name$$1] = data.toString();
        }
      }
    };
    const del = name$$1 => storage.removeItem(name$$1);
    const get = name$$1 => {
      if (storage[name$$1]) {
        try {
          return JSON.parse(storage[name$$1]);
        } catch (e) {
          return storage[name$$1];
        }
      }
    };
    return {
      set: set,
      get: get,
      del: del
    };
  }

module.exports = Storage;
