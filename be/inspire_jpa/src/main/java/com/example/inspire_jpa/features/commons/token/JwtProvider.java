package com.example.inspire_jpa.features.commons.token;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtProvider {

    // .yml 설정된 키 값을 사용할 수 있음.
    @Value("${jwt.secret}")
    private String secret;
    
    // ms 단위로 계산하는 것이 기본
    private final long ACCESS_TOKEN_EXPIRY = 1000L * 60 * 30;
    private final long REFRESH_TOKEN_EXPIRY = 1000L * 60 * 60 * 24 * 7;

    private Key getSecretKey() {
        System.out.println("debug >>>> Provider jwt secret : " + secret);
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String createAt(String email) {
        System.out.println("debug >>>> Provider createAt");
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRY))
                .signWith(getSecretKey())
                .compact(); 
    }

    public String createRt(String email) {
        System.out.println("debug >>>> Provider createRt");
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRY))
                .signWith(getSecretKey())
                .compact(); 
    }

    // AT를 통해서 subject를 추출해야하는 상황이 있다면?
    public String getUserEmailFromAT(String at){
        System.out.println("debug >>>> Provider getUserEmailFromAT");
        return null;
    }
}
