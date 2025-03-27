import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Story, StorySchema } from "./story.schema";
import { StoryController } from "./story.controller";
import { StoryService } from "./story.service";
import { StoryRepository } from "./story.repository";
import { StoryProfile } from "./story.profile";
import { UploadModule } from "src/upload/upload.module";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";

const uploadDir = join(process.cwd(), 'uploads');

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Story.name, schema: StorySchema }]),
        UploadModule,
        MulterModule.register({
            storage: diskStorage({
                destination: (req, file, cb) => {
                    cb(null, uploadDir)
                },
                filename: (req, file, cb) => {
                    const ext = extname(file.originalname);
                    const filename = `${file.originalname.split(ext)[0].replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_')}_${Date.now().toString().split('T')[0]}${ext}`;
                    cb(null, filename);
                }
            }),
            fileFilter: (req, file, cb) => {
                if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
                    cb(null, true);
                } else cb(new Error('Only images (jpeg, png) are allowed'), false);
            }
        })
    ],
    controllers: [StoryController],
    providers: [StoryService, StoryRepository, StoryProfile],
})
export class StoryModule { }