import {
  isArray,
  isJSON,
  isObject,
  isUndefined,
  isNull,
  isNumber,
  isBoolean,
  isRegExp
} from "./utils";

export default function storage(type = "session") {
  const storage = window[`${type}Storage`];
  const set = (name, data) => {
    if (isArray(data) || isJSON(data) || isObject(data)) {
      storage[name] = _serialize(data);
      return;
    }
    if (isBoolean(data) || isNull(data) || isUndefined(data)) {
      storage[name] = data;
      return;
    }
    storage[name] = data.toString();
  };

  // 与本地新旧数据合并
  const merge = (name, data) => {
    // 如果是数组或JSON 对象则数据可以合并，否则直接替换
    if (isArray(data) || isJSON(data) || isObject(data)) {
      if (isArray(data)) {
        storage[name] = _serialize([..._deserialize(storage[name]), ...data]);
      } else {
        storage[name] = _serialize({ ..._deserialize(storage[name]), ...data });
      }
    } else {
      set(name, data);
    }
  };

  const _serialize = obj => JSON.stringify(obj);
  const _deserialize = strVal => {
    if (!strVal) return strVal;
    let val = "";
    try {
      val = JSON.parse(strVal);
    } catch (e) {
      val = strVal;
    }
    return val;
  };

  // 删除数据
  const _remove = name => storage.removeItem(name);
  // 删除一项或多项数据
  const del = name => {
    if (Array.isArray(name)) {
      name.forEach(key => _remove(key));
    } else {
      _remove(name);
    }
  };
  // 清除所有数据
  const clear = () => storage.clear();

  // 读取本地数据
  const get = name => {
    if (Array.isArray(name)) {
      const obj = {};
      name.forEach(key => {
        obj[key] = _deserialize(storage[key]);
      });

      return obj;
    }

    return _deserialize(storage[name]);
  };
  return {
    set,
    get,
    del,
    clear,
    merge
  };
}
