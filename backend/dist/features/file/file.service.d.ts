import { FileDocument } from "./schemas/file.schema";
import { Model } from "mongoose";
import { UploadFileDto } from "./dto/uploadFile.dto";
export declare class FileService {
    private fileModel;
    constructor(fileModel: Model<FileDocument>);
    upload(dto: UploadFileDto, content: any): Promise<{
        path: string;
    }>;
    download(fileName: any, privateKey: any): Promise<string>;
    createFile(file: any, lifetime: string, numeric: any): Promise<{
        filePath: string;
        fileName: any;
        fileExtension: any;
    }>;
}
