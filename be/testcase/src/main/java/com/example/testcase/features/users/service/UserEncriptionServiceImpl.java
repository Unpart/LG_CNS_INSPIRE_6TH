package com.example.testcase.features.users.service;

import org.springframework.stereotype.Service;

import com.example.testcase.features.users.domain.dto.UserRequestDTO;
import com.example.testcase.features.users.domain.dto.UserResponseDTO;
import com.example.testcase.features.users.repository.UserMapper;

import lombok.RequiredArgsConstructor;

@Service(value = "encryption")
@RequiredArgsConstructor
public class UserEncriptionServiceImpl implements UserService{

    private final UserMapper userMapper;
    private int x;

    @Override
    public UserResponseDTO signIn(UserRequestDTO request) {
        System.out.println("debug >>>> user encryption service signIn");
        System.out.println("debug >>>> params " + request);
        return userMapper.login(request)
            .orElseThrow(() -> new RuntimeException("로그인 실패"));
    }

}