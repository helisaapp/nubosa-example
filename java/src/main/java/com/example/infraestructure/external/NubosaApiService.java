package com.example.infraestructure.external;

import com.example.application.dto.ResponseDto;
import com.example.application.dto.UpsertCompanyDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@Service
public class NubosaApiService {

    private final ObjectMapper objectMapper;
    private final SignService signService;

    @Value("${nubosa.url}")
    private String nubosaUrl;

    @Value("${nubosa.idClient}")
    private String nubosaIdClient;

    @Value("${nubosa.secret}")
    private String nubosaSecret;

    public NubosaApiService(ObjectMapper objectMapper, SignService signService) {
        this.objectMapper = objectMapper;
        this.signService = signService;
    }

    public ResponseDto post(UpsertCompanyDto data) throws NoSuchAlgorithmException, InvalidKeyException, IOException, InterruptedException {
        long time = System.currentTimeMillis();
        String url = "/api/company/" + nubosaIdClient;
        String signature = signService.generateSignature(new String[]{nubosaIdClient, time+"", url, objectMapper.writeValueAsString(data)}, nubosaSecret);

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(nubosaUrl + url)) // Set the target URI
                .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(data))) // For a POST request with a JSON body
                .header("x-client-id", nubosaIdClient)
                .header("x-timestamp", time+"")
                .header("x-signature", signature)
                .header("Content-Type", "application/json")
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        int statusCode = response.statusCode();
        String responseBody = response.body();

        return new ResponseDto(responseBody, statusCode);
    }

    public ResponseDto get() throws NoSuchAlgorithmException, InvalidKeyException, IOException, InterruptedException {
        String idBilling = "377c179b-2eba-481f-b891-ebbce7221531";
        long time = System.currentTimeMillis();
        String url = "/api/billing/" + idBilling;
        String signature = signService.generateSignature(new String[]{nubosaIdClient, time+"", url, ""}, nubosaSecret);

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(nubosaUrl + url)) // Set the target URI
                .GET() // For a GET request
                .header("x-client-id", nubosaIdClient)
                .header("x-timestamp", time+"")
                .header("x-signature", signature)
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        int statusCode = response.statusCode();
        String responseBody = response.body();

        return new ResponseDto(responseBody, statusCode);
    }
}
