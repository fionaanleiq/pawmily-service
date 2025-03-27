import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { extname, join } from "path";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";

const uploadDir = join(process.cwd(), 'uploads');

@Module({
    imports: [
        // MulterModule.register({
        //     storage: diskStorage({
        //         destination: (req, file, cb) => {
        //             cb(null, uploadDir)
        //         },
        //         filename: (req, file, cb) => {
        //             const ext = extname(file.originalname);
        //             const filename = `${file.originalname.split(ext)[0]}_${Date.now().toString().split('T')[0]}${ext}`;
        //             cb(null, filename);
        //         }
        //     }),
        //     fileFilter: (req, file, cb) => {
        //         if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
        //             cb(null, true);
        //         } else cb(new Error('Only images (jpeg, png) are allowed'), false);
        //     }
        // })
    ],
    controllers: [UploadController],
    providers: [UploadService],
    exports: [UploadService]
})
export class UploadModule {}