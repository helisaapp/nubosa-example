import { Injectable } from '@nestjs/common';
import {NubosaApiService} from "../../infrastructure/external/nubosa-api.service";


// Simple use case for demonstration purposes
@Injectable()
export class TestUseCase {
  constructor(private nubosaService: NubosaApiService) {
  }

  execute() {
    return this.nubosaService.get();
  }
}
