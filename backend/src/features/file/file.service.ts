import {HttpException, HttpStatus, Injectable, StreamableFile} from "@nestjs/common"
import {InjectModel} from "@nestjs/mongoose"
import {File, FileDocument} from "./schemas/file.schema"
import {Model} from "mongoose"
import {UploadFileDto} from "./dto/uploadFile.dto"
import * as path from "path"
import * as fs from "fs"
import * as uuid from 'uuid'

@Injectable()
export class FileService {
    constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

    async upload(dto: UploadFileDto, content): Promise<{ path: string }> {
        const {filePath, fileName, fileExtension} = await this.createFile(content, dto.life_time, dto.numbers)
        const privateFile = dto.private

        let privateKey

        if (privateFile) {
            privateKey = Math.floor(100000 + Math.random() * 900000)
        }

        const file = await this.fileModel.create({
            ...dto,
            path: filePath,
            name: fileName,
            extension: fileExtension,
            private_key: privateKey
        })

        return {
            path: privateFile
                ? `/${fileName}?private_key=${privateKey}`
                : `/${fileName}`
        }
    }

    async download(fileName, privateKey) {
        const file = await this.fileModel.findOne({name: fileName})
        const filePath = path.resolve(__dirname, '..', '..', 'cloud', file.path)

        if (!file) {
            throw new HttpException('Не найдено', HttpStatus.NOT_FOUND)
        }

        if (privateKey) {
            if (file.private_key == privateKey) {
                return filePath
            } else {
                throw new HttpException('Доступ закрыт', HttpStatus.FORBIDDEN)
            }
        } else {
            if (file.private_key) {
                throw new HttpException('Доступ закрыт', HttpStatus.FORBIDDEN)
            } else {
                return filePath
            }
        }

    }

    async createFile(file, lifetime: string = 'once', numeric) {
        try {
            let fileName
            const fileExtension = file.originalname.split('.').pop()

            if (numeric) {
                fileName = Math.floor(10000000 + Math.random() * 90000000)
            } else {
                fileName = uuid.v4().split('-').join('').slice(0, 8)
            }

            const fileWithExtension = fileName + '.' + fileExtension
            const candidateFile = await this.fileModel.findOne({name: fileName})

            if (candidateFile) {
                console.log('this file name already used')
                await this.createFile(file, lifetime, numeric)
            }

            let filePath

            switch (lifetime) {
                case 'once':
                    filePath = path.resolve(__dirname, '..', '..', 'cloud', 'once')
                    break
                case 'day':
                    filePath = path.resolve(__dirname, '..', '..', 'cloud', 'day')
                    break
                case 'week':
                    filePath = path.resolve(__dirname, '..', '..', 'cloud', 'week')
                    break
                case 'month':
                    filePath = path.resolve(__dirname, '..', '..', 'cloud', 'month')
                    break
                default:
                    break
            }

            if(!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }

            fs.writeFileSync(path.resolve(filePath, fileWithExtension), file.buffer)

            return {
                filePath: `${lifetime}/${fileWithExtension}`,
                fileName,
                fileExtension
            }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}