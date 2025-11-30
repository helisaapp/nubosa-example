# Nubosa Spring Boog Example

Proyecto Java Spring Boot con ejemplo de conexión a nubosa con firmado.

Estructura solicitada:

- `src/main/java/com/example/infraestructure/external/SignService.java`: Servicio de firmado para nubosa.
- `src/main/java/com/example/infraestructure/external/NubosaApiService.java`: Servicio de conexión a nubosa.
- `src/main/java/com/example/application/use_cases/TestUseCase.java`: Caso de uso de ejemplo petición get, traer una transacción.
- `src/main/java/com/example/application/use-cases/TestPostUseCase.java`: Caso de uso de ejemplo petición post, crear/modificar una empresa.
- `src/main/java/com/example/interfaces/http/TestController.java`: Controlador HTTP que llama los casos de uso.
- `com.example.Application`: clase main.

## Cómo ejecutar
1. Ejecutar la aplicación
```bash
mvn spring-boot:run
```
2. Abrir en el navegador:
   ```
   GET http://localhost:3000/test/get
   GET http://localhost:3000/test/post
   ```
   Respuesta esperada:
   ```json
   { "status": "<http-status>", "data": "<nubosa-response>" }
   ```

## Variables de entorno
Se debe ejecutar la aplicación con las variables de entorno:
````
NUBOSA_ID_CLIENT=<id-client>;NUBOSA_SECRET=<secret>;NUBOSA_URL=https://billing-input-backend-qa.up.railway.app
````

## Requisitos
- Java 17+
- Maven 3.9+