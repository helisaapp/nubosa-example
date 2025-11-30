package com.example.application.use_cases;

import com.example.application.dto.ResponseDto;
import com.example.infraestructure.external.NubosaApiService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@Service
@AllArgsConstructor
public class TestUseCase {
    private final NubosaApiService nubosaApiService;

    public ResponseDto execute() throws NoSuchAlgorithmException, IOException, InvalidKeyException, InterruptedException {
        return this.nubosaApiService.get();
    }
}
