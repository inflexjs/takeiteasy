"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const remove_1 = require("./helpers/remove");
const PORT = process.env.PORT || 5000;
async function init() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
    (0, remove_1.clearingLoop)();
}
init();
//# sourceMappingURL=main.js.map