"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearingLoop = void 0;
const path = require("path");
const fs = require("fs");
const rimraf = require("rimraf");
const params = {
    lifetime: {
        day: 86400,
        week: 604800,
        month: 2592000
    },
    timeout: 2500
};
const clearingLoop = () => {
    setInterval(() => removeFiles('once', 15), params.timeout);
    setInterval(() => removeFiles('day', params.lifetime.day), params.timeout);
    setInterval(() => removeFiles('week', params.lifetime.week), params.timeout);
    setInterval(() => removeFiles('month', params.lifetime.month), params.timeout);
};
exports.clearingLoop = clearingLoop;
const removeFiles = (dir, lifetime) => {
    const staticDir = path.resolve(__dirname, '..', 'cloud', dir);
    fs.readdir(staticDir, (error, files) => {
        if (!files) {
            return null;
        }
        files.forEach((file, index) => {
            fs.stat(path.join(staticDir, file), (error, stat) => {
                let now, endTime;
                if (error) {
                    return console.log(error);
                }
                now = new Date().getTime();
                endTime = new Date(stat.ctime).getTime() + (lifetime * 1000);
                if (now > endTime) {
                    return rimraf(path.join(staticDir, file), (error) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log(`${file} successfully delete`);
                    });
                }
            });
        });
    });
};
//# sourceMappingURL=remove.js.map