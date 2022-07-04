import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDocument = File & Document;

@Schema()
export class File {
    @Prop()
    path: string;

    @Prop()
    name: string;

    @Prop()
    extension: string;

    @Prop()
    life_time: string;

    @Prop()
    private: boolean;

    @Prop()
    private_key: string;

    @Prop()
    numbers: boolean;
}

export const FileSchema = SchemaFactory.createForClass(File);