const dataType = data => Object.prototype.toString.call(data);
export function isFunction(data) {
  return dataType(data) === "[object Function]";
}
export function isArray(data) {
  return dataType(data) === "[object Array]";
}
export function isObject(data) {
  return dataType(data) === "[object Object]";
}
export function isNull(data) {
  return dataType(data) === "[object Null]";
}
export function isUndefined(data) {
  return dataType(data) === "[object Undefined]";
}
export function isJSON(data) {
  return window.JSON && dataType(data) === "[object JSON]";
}
export function isNumber(data) {
  return dataType(data) === "[object Number]";
}
export function isBoolean(data) {
  return dataType(data) === "[object Boolean]";
}

export function isRegExp(data) {
  return dataType(data) == "[object RegExp]";
}
