package com.example.testcase.features.users.service;

import org.springframework.stereotype.Service;

import com.example.testcase.features.users.domain.dto.UserRequestDTO;
import com.example.testcase.features.users.domain.dto.UserResponseDTO;

@Service(value = "encryption")
public class UserEncriptionServiceImpl implements UserService{

    @Override
    public UserResponseDTO signIn(UserRequestDTO request) {
        System.out.println("debug >>>> user encryption service signIn");
        System.out.println("debug >>>> params " + request);
        return null;
    }

}