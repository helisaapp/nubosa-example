package com.example.infraestructure.adapters.controllers;

import com.example.application.dto.ResponseDto;
import com.example.application.use_cases.TestPostUseCase;
import com.example.application.use_cases.TestUseCase;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("/api/v1/test")
@AllArgsConstructor
public class TestController {

    private final TestUseCase useCase;
    private final TestPostUseCase testPostUseCase;

    @GetMapping("post")
    public ResponseEntity<ResponseDto> post() throws NoSuchAlgorithmException, IOException, InvalidKeyException, InterruptedException {
        return new ResponseEntity<>(testPostUseCase.execute(), HttpStatus.OK);
    }

    @GetMapping("get")
    public ResponseEntity<ResponseDto> get() throws NoSuchAlgorithmException, IOException, InvalidKeyException, InterruptedException {
        return new ResponseEntity<>(useCase.execute(), HttpStatus.OK);
    }
}
