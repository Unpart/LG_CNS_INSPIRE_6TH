package com.example.testcase.features.users.ctrl;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.testcase.features.users.domain.dto.UserRequestDTO;
import com.example.testcase.features.users.domain.dto.UserResponseDTO;
import com.example.testcase.features.users.service.UserEncriptionServiceImpl;
import com.example.testcase.features.users.service.UserPlainServiceImpl;
import com.example.testcase.features.users.service.UserService;

import jakarta.annotation.Resource;

import java.nio.file.attribute.UserPrincipal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
// endPoint : http://ip:port/users
@RequestMapping("/users")
public class UserController {
    
    @Resource(name = "encryption")
    private UserService userService;

    // @Autowired
    // private UserEncriptionServiceImpl userService;

    // @Autowired
    // private UserPlainServiceImpl userService;

    // http://ip:port/users/signIn : method(GET)
    // http://ip:port/users/signIn : email=xxxx&password=xxxx
    @GetMapping("/signIn")
    // public ResponseEntity<?> signIn(@RequestParam String email, @RequestParam String password) {
    public ResponseEntity<?> signIn(UserRequestDTO request) {
        System.out.println("debug >>>> user controller signIn get mapping");
        System.out.println("debug >>>> user controller signIn params " + request);
        System.out.println("debug >>>> user controller signIn service binding " + userService);
        UserResponseDTO response = userService.signIn(request);
        if (response != null) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .header("access-token", "12345")
                    .body(response);
        }
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(null);
    }   
    
}
