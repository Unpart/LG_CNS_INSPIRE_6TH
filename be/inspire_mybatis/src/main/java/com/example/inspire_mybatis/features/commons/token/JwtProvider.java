package com.example.inspire_mybatis.features.commons.token;

import org.springframework.stereotype.Component;

@Component
public class JwtProvider {
    
    public String createAt(String email) {
        return "Bearer XXXXXX"; 
    }

    public String createRt(String email) {
        return "XXXXXXXXXXXXX";
    }
}
