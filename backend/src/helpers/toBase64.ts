import * as fs from "fs";

export const toBase64 = file => {
    const binaryData = fs.readFileSync(file);
    return new Buffer(binaryData).toString('base64')
};