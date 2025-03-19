import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

const MONGO_DB_URI = `mongodb+srv://pawmily:p4wm1ly@pawmilycluster.gx92f.mongodb.net/?retryWrites=true&w=majority&appName=PawmilyCluster`
console.log(MONGO_DB_URI)
export const mongooseConfig: MongooseModuleAsyncOptions = {
    useFactory: async () => ({ 
        uri: MONGO_DB_URI }), 
    };