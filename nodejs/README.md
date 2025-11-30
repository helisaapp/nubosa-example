# Nubosa NestJS Example

Proyecto NestJS con ejemplo de conexión a nubosa con firmado.

## Estructura
- `src/infraestructure/external/sign.service.ts`: Servicio de firmado para nubosa.
- `src/infraestructure/external/nubosa-api.service.ts`: Servicio de conexión a nubosa.
- `src/application/use-cases/test.use-case.ts`: Caso de uso de ejemplo petición get, traer una transacción.
- `src/application/use-cases/test-post.use-case.ts`: Caso de uso de ejemplo petición post, crear/modificar una empresa.
- `src/interfaces/http/test.controller.ts`: Controlador HTTP que llama los casos de uso.
- `src/app.module.ts`: Módulo raíz que registra el controlador y el caso de uso.
- `src/main.ts`: Bootstrap de la app.

## Scripts
- `npm run start:dev` — desarrollo con recarga (ts-node-dev)
- `npm run build` — compila a `dist/`
- `npm start` — ejecuta el build desde `dist/`

## Cómo ejecutar
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Modo desarrollo:
   ```bash
   npm run start:dev
   ```
3. Abrir en el navegador:
   ```
   GET http://localhost:3000/test/get
   GET http://localhost:3000/test/post
   ```
   Respuesta esperada:
   ```json
   { "status": "<http-status>", "data": "<nubosa-response>" }
   ```

## .env
Se debe ejecutar la aplicación con un archivo .env
````
NODE_ENV=development

NUBOSA_URL=https://billing-input-backend-qa.up.railway.app
NUBOSA_ID_CLIENT=<id-client>
NUBOSA_SECRET=<secret>

````

## Requisitos
- Node.js >= 18
