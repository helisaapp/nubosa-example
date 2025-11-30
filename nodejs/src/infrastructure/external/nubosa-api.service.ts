import {Injectable} from "@nestjs/common";
import axios from 'axios';
import {envs} from "../../infrastructure/config/envs";
import {SignService} from "../../infrastructure/external/sign.service";

@Injectable()
export class NubosaApiService {
    constructor(private signService: SignService) {
        this.signService = signService;
    }


    /**
     * Metodo para conectarse a nubosa y traer la información de una transacción
     */
    async get() {
        const idBilling = '07825037-eda9-4c58-acb6-bb7710dd928d';
        const time = new Date().getTime();
        const url = `/api/billing/${idBilling}`;
        const signature = this.signService.generateSignature(
            [envs.nubosaIdClient, `${time}`, url, ''],
            envs.nubosaSecret,
        )
        try {
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
            };
        } catch (error) {
            return {
                status: error.response.status,
                data: error.response.data,
            }
        }
    }

    /**
     * Metodo para conectarse a nubosa y crear una compañía
     */
    async post(data: any) {
        const time = new Date().getTime();
        const url = `/api/company/${envs.nubosaIdClient}`;
        const signature = this.signService.generateSignature(
            [envs.nubosaIdClient, `${time}`, url, JSON.stringify(data)],
            envs.nubosaSecret,
        )
        try {
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
            };
        } catch (error) {
            return {
                status: error.response.status,
                data: error.response.data,
            }
        }
    }
}