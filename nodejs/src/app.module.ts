import { Module } from '@nestjs/common';
import {TestController} from "./infrastructure/adapters/controllers/test.controller";
import {NubosaApiService} from "./infrastructure/external/nubosa-api.service";
import {TestUseCase} from "./application/use-cases/test.use-case";
import {TestPostUseCase} from "./application/use-cases/test-post.use-case";

@Module({
  imports: [],
  controllers: [TestController],
  providers: [TestUseCase, NubosaApiService, TestPostUseCase],
})
export class AppModule {}
