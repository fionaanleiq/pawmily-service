import { Module } from "@nestjs/common";
import { RolesGuard } from "./guards/roles.guard";
import { AllExceptionFilter } from "./filters/all-exeption.filter";

@Module({
    imports: [],
    providers: [
        RolesGuard,
        AllExceptionFilter
    ],
    exports: []
}) 
export class SharedModule {}