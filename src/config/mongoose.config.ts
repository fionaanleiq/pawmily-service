import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

const MONGO_DB_URI = `mongodb+srv://pawmilyuser:p4m1ly@nestproject.uwnut.mongodb.net/?retryWrites=true&w=majority&appName=NestProject`
console.log(MONGO_DB_URI)
export const mongooseConfig: MongooseModuleAsyncOptions = {
    useFactory: async () => ({ 
        uri: MONGO_DB_URI }), 
    };