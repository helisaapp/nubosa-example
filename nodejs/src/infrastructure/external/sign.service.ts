import {Injectable} from "@nestjs/common";
import {createHmac} from "crypto";

@Injectable()
export class SignService {
    public generateSignature(params: string[], secret: string): string {
        return createHmac('sha256', secret)
            .update(params.join())
            .digest('hex');
    }
}