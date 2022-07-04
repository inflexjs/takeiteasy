"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBase64 = void 0;
const fs = require("fs");
const toBase64 = file => {
    const binaryData = fs.readFileSync(file);
    return new Buffer(binaryData).toString('base64');
};
exports.toBase64 = toBase64;
//# sourceMappingURL=toBase64.js.map