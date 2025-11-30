import {Injectable} from "@nestjs/common";
import axios from 'axios';
import {createHmac} from "crypto";
import {envs} from "../../infrastructure/config/envs";

@Injectable()
export class NubosaApiService {
    /**
     * Metodo para conectarse a nubosa y traer la información de una transacción
     */
    async get() {
        const idBilling = '07825037-eda9-4c58-acb6-bb7710dd928d';
        const time = new Date().getTime();
        const url = `/api/billing/${idBilling}`;
        const signature = NubosaApiService.generateSignature(
            [envs.nubosaIdClient, `${time}`, url, ''],
            envs.nubosaSecret,
        )
        const response = await axios.get(
            envs.nubosaUrl + url,
            {
                headers: {
                    'x-client-id': envs.nubosaIdClient,
                    'x-timestamp': time,
                    'x-signature': signature,
                }
            },
        );
        return {
            status: response.status,
            data: response.data,
        }
    }

    /**
     * Metodo para conectarse a nubosa y crear una compañía
     */
    async post(data: any) {
        const time = new Date().getTime();
        const url = `/api/company/${envs.nubosaIdClient}`;
        const signature = NubosaApiService.generateSignature(
            [envs.nubosaIdClient, `${time}`, url, JSON.stringify(data)],
            envs.nubosaSecret,
        )
        const response = await axios.post(
            envs.nubosaUrl + url,
            data,
            {
                headers: {
                    'x-client-id': envs.nubosaIdClient,
                    'x-timestamp': time,
                    'x-signature': signature,
                }
            },
        );
        return {
            status: response.status,
            data: response.data,
        }
    }

    public static generateSignature(params: string[], secret: string): string {
        return createHmac('sha256', secret)
            .update(JSON.stringify(params.join()))
            .digest('hex');
    }
}