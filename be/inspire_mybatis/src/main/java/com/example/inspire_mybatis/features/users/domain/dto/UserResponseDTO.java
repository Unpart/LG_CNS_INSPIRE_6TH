package com.example.inspire_mybatis.features.users.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@Getter
@ToString
public class UserResponseDTO {
    private String email, password, name;
}
