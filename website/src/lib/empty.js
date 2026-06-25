// Empty browser stub for Node.js built-ins (CJS so Turbopack allows any named import)
module.exports = new Proxy({}, { get: () => undefined })
