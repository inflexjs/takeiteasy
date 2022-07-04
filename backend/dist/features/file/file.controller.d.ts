/// <reference types="multer" />
import { FileService } from "./file.service";
import { UploadFileDto } from "./dto/uploadFile.dto";
export declare class FileController {
    private fileService;
    constructor(fileService: FileService);
    upload(content: Express.Multer.File, dto: UploadFileDto): Promise<{
        path: string;
    }>;
    download(params: any, query: any, response: any): Promise<any>;
}
