export const nativeToString = Object.prototype.toString;
function isType(type: string) {
  return function (value: any): boolean {
    return nativeToString.call(value) === `[object ${type}]`;
  };
}

/**
 * 检测变量类型
 * @param type
 */
export const variableTypeDetection = {
  isNumber: isType('Number'),
  isString: isType('String'),
  isBoolean: isType('Boolean'),
  isNull: isType('Null'),
  isUndefined: isType('Undefined'),
  isSymbol: isType('Symbol'),
  isFunction: isType('Function'),
  isObject: isType('Object'),
  isArray: isType('Array'),
  isProcess: isType('process'),
  isWindow: isType('Window'),
};

export function getMitoGlobalVar() {
  const _window = window as any;
  if (_window && _window['__MITO__']) {
    return _window['__MITO__'];
  }
  return false;
}

/**
 *
 * @param base 判断cpu性能是否能开启录制 超过26开启
 */
export const mockPerformance = (base: number) => {
  const start = new Date().getTime();
  let i = 0;
  let j = 0;
  let p = 0;
  let b = false;
  while (new Date().getTime() - start < 1e3) {
    for (let k = 0; k < 1e7; k++) {
      p += ((b = !b) ? 1 : -1) / (2 * j++ + 1);
    }
    i++;
  }
  return base < i;
};
