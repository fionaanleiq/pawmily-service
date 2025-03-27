import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Home, HomeSchema } from "./home.schema";
import { HomeController } from "./home.controller";
import { HomeService } from "./home.service";
import { HomeRepository } from "./home.repository";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { extname, join } from "path";
import { UploadModule } from "src/upload/upload.module";

const uploadDir = join(process.cwd(), 'uploads');

@Module({
    imports: [MongooseModule.forFeature([{ name: Home.name, schema: HomeSchema }]),
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
    }),
    UploadModule
    ],
    controllers: [HomeController],
    providers: [HomeService, HomeRepository],
    exports: []
})
export class HomeModule { }