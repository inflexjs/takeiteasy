import {Module} from "@nestjs/common";
import {FileModule} from "./features/file/file.module";
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";

@Module({
    controllers: [], // Контроллеры
    providers: [], // Сервисы
    imports: [ // Импорты
        ConfigModule.forRoot({ // Конфиг модуль (внутри содержит dotenv) для чтения .env
            isGlobal: true, // Подключается глобально для всех файлов
        }),
        MongooseModule.forRoot(process.env.MONGODB_URL), // Подключение к MongoBD
        FileModule
    ]
})
export class AppModule {}