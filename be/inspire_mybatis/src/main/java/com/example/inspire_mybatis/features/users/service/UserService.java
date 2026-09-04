package com.example.inspire_mybatis.features.users.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.inspire_mybatis.features.commons.exception.users.LoginFailException;
import com.example.inspire_mybatis.features.commons.token.JwtProvider;
import com.example.inspire_mybatis.features.users.domain.dto.UserRequestDTO;
import com.example.inspire_mybatis.features.users.domain.dto.UserResponseDTO;
import com.example.inspire_mybatis.features.users.repository.UserMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    // constructor injection 
    private final UserMapper userMapper;
    private final JwtProvider jwtProvider;

    public int signUp(UserRequestDTO request) {
        System.out.println("debug >>>> user service signUp");
        return userMapper.save(request);
    }

    public Map<String, Object> signIn(UserRequestDTO request) {
        System.out.println("debug >>>> user service signIn");
        
        UserResponseDTO response = 
            userMapper.signIn(request)
                      .orElseThrow(() -> new LoginFailException("로그인 실패"));
                      
        // 사용자 로그인이 정상적으로 수행되면 token 발급되어야 함.
        System.out.println("debug >>>> user service signIn token provider ");
        String at = jwtProvider.createAt(response.getEmail());
        String rt = jwtProvider.createRt(response.getEmail());

        // inMemory DB = Redis, H2
        // at, rt 담아서 관리 - redis - docker
        Map<String, Object> map = new HashMap<>();
        map.put("response", response); 
        map.put("at", at);
        map.put("rt", rt);

        return map;
    }
}
