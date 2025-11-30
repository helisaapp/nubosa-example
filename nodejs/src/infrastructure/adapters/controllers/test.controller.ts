import { Controller, Get } from '@nestjs/common';
import {TestUseCase} from "../../../application/use-cases/test.use-case";
import {TestPostUseCase} from "../../../application/use-cases/test-post.use-case";

@Controller('test')
export class TestController {
  constructor(private readonly testUseCase: TestUseCase,
              private readonly postUseCase: TestPostUseCase) {}

  @Get('/get')
  handle() {
    return this.testUseCase.execute();
  }

  @Get('/post')
  handlePost() {
    return this.postUseCase.execute();
  }
}
