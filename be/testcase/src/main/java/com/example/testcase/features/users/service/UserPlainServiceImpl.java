package com.example.testcase.features.users.service;

import org.springframework.stereotype.Service;

import com.example.testcase.features.users.domain.dto.UserRequestDTO;
import com.example.testcase.features.users.domain.dto.UserResponseDTO;

@Service(value = "plain")
public class UserPlainServiceImpl implements UserService {
    @Override
    public UserResponseDTO signIn(UserRequestDTO request) {
        System.out.println("debug >>>> user plain service signIn");
        System.out.println("debug >>>> params " + request);
        return null;
    }
    
}
