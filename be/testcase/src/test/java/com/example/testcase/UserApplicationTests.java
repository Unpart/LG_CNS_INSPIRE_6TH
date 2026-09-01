package com.example.testcase;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.testcase.features.users.domain.dto.UserRequestDTO;
import com.example.testcase.features.users.domain.dto.UserResponseDTO;
import com.example.testcase.features.users.repository.UserMapper;

// Junit + TDD(Test Driven Development : given-when-then)
@SpringBootTest
public class UserApplicationTests {
    
    @Autowired
    private UserMapper userMapper;

    @Test
    public void signUp() {

        System.out.println("debug >>>> userMapper : " + userMapper);

        // given(데이터 준비)
        UserRequestDTO request = UserRequestDTO.builder()
                .EMAIL("test2@example.com")
                .PASSWORD("password")
                .NAME("Test User")
                .build();

        // when(테스트 실행)
        int flag = userMapper.save(request);

        // then(검증)
        System.out.println("result : " + flag);
        Assertions.assertEquals(1, flag);
    }

    @Test
    public void list() {
        // 관리자로서 회원의 전체정보를 조회
        // given(데이터 준비)
        // when(테스트 실행)
        List<UserResponseDTO> list = userMapper.findAll();

        // then(검증)
        list.stream().forEach(System.out::println);
    }

    @Test
    public void signIn() {
        System.out.println("debug >>>> 사용자 로그인 검증");
        // given(데이터 준비)
        UserRequestDTO request = UserRequestDTO.builder()
                .EMAIL("test2@example.com")
                .PASSWORD("password")
                .build();

        // when(테스트 실행)
        Optional<UserResponseDTO>response = userMapper.login(request);

        // response.orElseThrow(() -> new RuntimeException("로그인 실패 : 이메일 또는 비밀번호를 확인하세요."));

        // then(검증)
        Assertions.assertNotNull(response.get());
        Assertions.assertEquals("test2@example.com", response.get().getEMAIL());
    }

}
