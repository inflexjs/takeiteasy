"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const file_schema_1 = require("./schemas/file.schema");
const mongoose_2 = require("mongoose");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
let FileService = class FileService {
    constructor(fileModel) {
        this.fileModel = fileModel;
    }
    async upload(dto, content) {
        const { filePath, fileName, fileExtension } = await this.createFile(content, dto.life_time, dto.numbers);
        const privateFile = dto.private;
        let privateKey;
        if (privateFile) {
            privateKey = Math.floor(100000 + Math.random() * 900000);
        }
        const file = await this.fileModel.create(Object.assign(Object.assign({}, dto), { path: filePath, name: fileName, extension: fileExtension, private_key: privateKey }));
        return {
            path: privateFile
                ? `/${fileName}?private_key=${privateKey}`
                : `/${fileName}`
        };
    }
    async download(fileName, privateKey) {
        const file = await this.fileModel.findOne({ name: fileName });
        const filePath = path.resolve(__dirname, '..', '..', 'cloud', file.path);
        if (!file) {
            throw new common_1.HttpException('Не найдено', common_1.HttpStatus.NOT_FOUND);
        }
        if (privateKey) {
            if (file.private_key == privateKey) {
                return filePath;
            }
            else {
                throw new common_1.HttpException('Доступ закрыт', common_1.HttpStatus.FORBIDDEN);
            }
        }
        else {
            if (file.private_key) {
                throw new common_1.HttpException('Доступ закрыт', common_1.HttpStatus.FORBIDDEN);
            }
            else {
                return filePath;
            }
        }
    }
    async createFile(file, lifetime = 'once', numeric) {
        try {
            let fileName;
            const fileExtension = file.originalname.split('.').pop();
            if (numeric) {
                fileName = Math.floor(10000000 + Math.random() * 90000000);
            }
            else {
                fileName = uuid.v4().split('-').join('').slice(0, 8);
            }
            const fileWithExtension = fileName + '.' + fileExtension;
            const candidateFile = await this.fileModel.findOne({ name: fileName });
            if (candidateFile) {
                console.log('this file name already used');
                await this.createFile(file, lifetime, numeric);
            }
            let filePath;
            switch (lifetime) {
                case 'once':
                    filePath = path.resolve(__dirname, '..', '..', 'cloud', 'once');
                    break;
                case 'day':
                    filePath = path.resolve(__dirname, '..', '..', 'cloud', 'day');
                    break;
                case 'week':
                    filePath = path.resolve(__dirname, '..', '..', 'cloud', 'week');
                    break;
                case 'month':
                    filePath = path.resolve(__dirname, '..', '..', 'cloud', 'month');
                    break;
                default:
                    break;
            }
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            fs.writeFileSync(path.resolve(filePath, fileWithExtension), file.buffer);
            return {
                filePath: `${lifetime}/${fileWithExtension}`,
                fileName,
                fileExtension
            };
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(file_schema_1.File.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map