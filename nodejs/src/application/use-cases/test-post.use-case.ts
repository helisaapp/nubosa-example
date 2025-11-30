import { Injectable } from '@nestjs/common';
import {NubosaApiService} from "../../infrastructure/external/nubosa-api.service";
import {UpsertCompanyDto} from "../dto/upsert-company.dto";

// Simple use case for demonstration purposes
@Injectable()
export class TestPostUseCase {
  constructor(private nubosaService: NubosaApiService) {
  }

  execute() {
    return this.nubosaService.post({
      certifiedPass: 'certifiedPass',
      name: 'Example company',
      document: '11111111',
      commercialName: 'Excom',
    } as UpsertCompanyDto);
  }
}
