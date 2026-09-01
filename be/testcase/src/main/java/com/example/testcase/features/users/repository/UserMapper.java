package com.example.testcase.features.users.repository;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import com.example.testcase.features.users.domain.dto.UserRequestDTO;
import com.example.testcase.features.users.domain.dto.UserResponseDTO;

@Mapper
// xxxxMapper.java : mybatis를 구현하는 interface
public interface UserMapper {
    public int save(UserRequestDTO requset);
    public java.util.List<UserResponseDTO> findAll();
    public Optional<UserResponseDTO> login(UserRequestDTO request);
}
