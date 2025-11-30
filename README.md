# nubosa-example

Repositorio de ayuda para implementación de conexión con los servicios de nubosa.

# Firmado
### Secret
El secret es un valor privado (evitar subirlo a repositorios o a lugares que pueden ser públicos) proporcionado por Helisa
### Headers
Todas las peticiones deben ir con las siguientes cabeceras:

| header      |                                        Valor de ejemplo | Descripción                              |
|:------------|--------------------------------------------------------:|:-----------------------------------------|
| x-client-id |                    cde2bd3a-7576-4844-bd68-1cf4147693a7 | Id del cliente, proporcionado por Helisa |
| x-timestamp |                                              1764522353 | Tiempo en milisegundos de la petición    |
| x-signature | 79c2a07ca7164758ddceed396f0fd31360eac2a3939ddb0fadca... | Url a la que se hará la petición         |


### GET y subida de archivos
Para las peticiones GET y cuando se suban los archivos se debe firmar la concatenación (separados por coma) de los siguientes atributos:

| Campo     |                                  Valor de ejemplo | Descripción                              |
|:----------|--------------------------------------------------:|:-----------------------------------------|
| idClient  |              cde2bd3a-7576-4844-bd68-1cf4147693a7 | Id del cliente, proporcionado por helisa |
| timestamp |                                        1764522353 | Tiempo en milisegundos de la petición    |
| url       | /api/billing/31fd76dd-cc8d-49f6-b4c6-82701cb0a864 | Url a la que se hará la petición         |
| payload   |                                                   | String vacío                             |

La cadena a a firmar es:
````
cde2bd3a-7576-4844-bd68-1cf4147693a7,1764522353,/api/billing/31fd76dd-cc8d-49f6-b4c6-82701cb0a864,
````

### POST, DELETE, PATCH, PUT
Para las peticiones GET y cuando se suban los archivos se debe firmar la concatenación (separados por coma) de los siguientes atributos:

| Campo     |                                                                                          Valor de ejemplo | Descripción                                                                                                         |
|:----------|----------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------|
| idClient  |                                                                      cde2bd3a-7576-4844-bd68-1cf4147693a7 | Id del cliente, proporcionado por helisa                                                                            |
| timestamp |                                                                                                1764522353 | Tiempo en milisegundos de la petición                                                                               |
| url       |                                                         /api/billing/31fd76dd-cc8d-49f6-b4c6-82701cb0a864 | Url a la que se hará la petición                                                                                    |
| payload   | {"document":"11111111","name":"Example company","commercialName":"Excom","certifiedPass":"certifiedPass"} | Payload de la petición (debe ser exactamente igual a como se envía). Si el payload es vacío, enviar un string vacio |

La cadena a a firmar es:
````
cde2bd3a-7576-4844-bd68-1cf4147693a7,1764522353,/api/billing/31fd76dd-cc8d-49f6-b4c6-82701cb0a864,{"document":"11111111","name":"Example company","commercialName":"Excom","certifiedPass":"certifiedPass"}
````
# nodejs
En la carpeta nodejs de este repositorio (https://github.com/helisaapp/nubosa-example/tree/main/nodejs) se encuentra un ejemplo completo de llamado con GET y POST de servicios de nubosa

### Para utilizar en su proyecto
1. Copiar el archivo https://github.com/helisaapp/nubosa-example/blob/main/nodejs/src/infrastructure/external/sign.service.ts en su proyecto.
2. En las peticiones que vaya hacer a nubosa llamar:
   ````typescript
   const signature = this.signService.generateSignature(
            [envs.nubosaIdClient, `${time}`, url, payload],
            secret,
        )
   ````

# Java
En la carpeta nodejs de este repositorio (https://github.com/helisaapp/nubosa-example/tree/main/java) se encuentra un ejemplo completo de llamado con GET y POST de servicios de nubosa

### Para utilizar en su proyecto
1. Copiar el archivo https://github.com/helisaapp/nubosa-example/blob/main/java/src/main/java/com/example/infraestructure/external/SignService.java en su proyecto.
2. En las peticiones que vaya hacer a nubosa llamar:
   ````java
   String signature = signService.generateSignature(new String[]{nubosaIdClient, time+"", url, 
                objectMapper.writeValueAsString(payload)}, nubosaSecret);
   ````
