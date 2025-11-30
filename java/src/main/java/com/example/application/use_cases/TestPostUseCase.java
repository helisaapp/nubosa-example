package com.example.application.use_cases;

import com.example.application.dto.ResponseDto;
import com.example.application.dto.UpsertCompanyDto;
import com.example.infraestructure.external.NubosaApiService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@Service
@AllArgsConstructor
public class TestPostUseCase {
    private final NubosaApiService nubosaApiService;

    public ResponseDto execute() throws NoSuchAlgorithmException, IOException, InvalidKeyException, InterruptedException {
        return this.nubosaApiService.post(new UpsertCompanyDto(
                "11111111",
                "Example company",
                "Excom",
                "certifiedPass"
        ));
    }
}
