package com.example.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UpsertCompanyDto {
    private String document;
    private String name;
    private String commercialName;
    private String certifiedPass;
}
