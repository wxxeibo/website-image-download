/* global createLogger */
/* exported createLogger */

/**
 * logger.js Could be loaded multiple times
 */

/**
 * 如果网站 A 中以 iframe 嵌入了网站 B，并且这两个网站都引用（调用）了当前脚本，就会出现重复定义的报错
 *
 * ```
 * Uncaught SyntaxError: Identifier 'createLogger' has already been declared
 * ```
 *
 * 所以不要像如下方式这样直接定义函数
 *
 * ```
 * const foo = () => "bar"
 * ```
 *
 * 而是先判断函数是否已经定义，再决定是否定义。(https://stackoverflow.com/a/8839136)
 *
 * ```
 * if (typeof foo !== "function") foo = () => ""
 * ```
 *
 * 还有一个更简单的写法，但是可能会报错。(https://stackoverflow.com/a/22249301)
 *
 * ```
 * var foo = foo || (() => "")
 * ```
 */

// const createLogger = name => (...arg) => console.log(`[${name}]`, ...arg);

/**
 * Solution 1
 */
if (typeof createLogger !== "function") {
  createLogger = name => (...arg) => console.log(`[${name}]`, ...arg);
}

/**
 * **Solution 2**
 *
 * Seeing error message when using this solution
 * ```
 * Uncaught ReferenceError: Cannot access 'createLogger' before initialization
 * ```
 */
// const createLogger = createLogger || (name => (...arg) => console.log(`[${name}]`, ...arg));

console.log("logger.js loaded.");
