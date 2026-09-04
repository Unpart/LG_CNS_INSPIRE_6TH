package com.example.inspire_mybatis.features.users.domain.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor

/*
Validation Annotation
@NotNull, @NotEmpty, @NotBlank, @Pattern(정규표현식), @Email etc.....
*/
public class UserRequestDTO {

    @NotBlank(message = "이메일은 필수 입력 항목입니다.")
    @Email(message = "이메일 형식을 지켜주세요!!")
    private String email;

    @NotBlank(message = "비밀번호는 필수 입력 항목입니다.")
    @Size(min = 4, max = 20)
    // @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]+$", 
    //          message="패스워드 정책에 맞지 않습니다.")
    private String password;

    @NotBlank(message = "이름은 필수 입력 항목입니다.")
    private String name;

    // optional (spring security role)
    private String role;
}
