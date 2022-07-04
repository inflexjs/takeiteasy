import {
    Body,
    Controller,
    Get, HttpException, HttpStatus,
    Param,
    Post,
    Query,
    Res,
    StreamableFile,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import {FileService} from "./file.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {UploadFileDto} from "./dto/uploadFile.dto";
import { createReadStream } from 'fs';
import * as path from "path"

@Controller('/files')
export class FileController {
    constructor(private fileService: FileService) {}

    @Post('/upload')
    @UseInterceptors(FileInterceptor('content'))
    upload(@UploadedFile() content: Express.Multer.File, @Body() dto: UploadFileDto) {
        // console.log(dto, content)
        return this.fileService.upload(dto, content)
    }

    @Get('/:fileName')
    async download(@Param() params, @Query() query, @Res() response) {
        const filePath = await this.fileService.download(params.fileName, query.key)

        if (!filePath) {
            throw new HttpException('Не найдено', HttpStatus.NOT_FOUND)
        }
        // console.log(params.fileName)
        // console.log(query.private_key)
        // console.log(query.lifetime)
        return response.sendFile(filePath)
    }
}