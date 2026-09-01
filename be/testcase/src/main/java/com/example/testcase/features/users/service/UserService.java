package com.example.testcase.features.users.service;

import com.example.testcase.features.users.domain.dto.UserRequestDTO;
import com.example.testcase.features.users.domain.dto.UserResponseDTO;

public interface UserService {
    public UserResponseDTO signIn(UserRequestDTO request);
}
