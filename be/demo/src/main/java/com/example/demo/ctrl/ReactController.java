package com.example.demo.ctrl;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.MessageDTO;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController // jsp 페이지를 반환 x, data(json)
@RequestMapping("/rest") // user endPoint : http://ip:port/context
public class ReactController {
    
    // @GetMapping("/index")
    // public MessageDTO getMethodName() {
    //     System.out.println("debug >>>> react controller GetMapping /index");
    //     return MessageDTO.builder().message("테스트").build();
    // }

    @GetMapping("/index")
    public ResponseEntity getMethodName() {
        System.out.println("debug >>>> react controller GetMapping /index");
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .header("access-token", "12345")
                .body(MessageDTO.builder().message("테스트").build());
    }
    
}
