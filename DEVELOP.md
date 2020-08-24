# Develop

## How to debug with trace and call stack

```js
console.log("[DEBUG]", "processLPressed()");

console.log("[DEBUG]", "processLPressed()", "call stack:", new Error().stack);
console.log("[DEBUG]", "processLPressed()", "console trace start: {");
console.trace();
console.log("[DEBUG]", "processLPressed()", "}: console trace end");
```
