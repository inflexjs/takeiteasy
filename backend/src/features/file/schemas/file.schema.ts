import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDocument = File & Document;

@Schema()
export class File {
    @Prop()
    content: string;

    @Prop()
    life_time: string;

    @Prop()
    private: boolean;

    @Prop()
    numbers: boolean;
}

export const FileSchema = SchemaFactory.createForClass(File);