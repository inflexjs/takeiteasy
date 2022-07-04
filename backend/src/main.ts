import {NestFactory} from "@nestjs/core"
import {AppModule} from "./app.module"
import {clearingLoop} from "./helpers/remove"

const PORT = process.env.PORT || 5000

async function init() {
    const app = await NestFactory.create(AppModule) // Модуль APP
    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
    clearingLoop()
}

init()