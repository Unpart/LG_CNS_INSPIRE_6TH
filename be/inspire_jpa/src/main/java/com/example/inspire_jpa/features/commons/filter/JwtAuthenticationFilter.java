package com.example.inspire_jpa.features.commons.filter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.Key;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.webauthn.authentication.WebAuthnAuthentication;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component 
public class JwtAuthenticationFilter extends OncePerRequestFilter{

    @Value ("${jwt.secret}") 
    private String  secret ; 
    private Key     key ; 

    @PostConstruct
    private void init() {
        System.out.println("debug >>>> JwtAuthenticationFilter jwt secret : "+secret); 
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest  request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain)
    throws ServletException, IOException {

        System.out.println("debug >>>> JwtAuthenticationFilter doFilterInternal"); 

        
        String endPoint = request.getRequestURI() ;
        System.out.println("debug >>>> JwtAuthenticationFilter user endPoint : "+endPoint); 
        String method   = request.getMethod() ;
        System.out.println("debug >>>> JwtAuthenticationFilter user method : "+method); 
        
        
        // preflight : get,post -> options 전달이 이루어짐 
        if("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            System.out.println("debug >>>> JwtAuthenticationFilter preflight OPTIONS"); 
            // header set : Origin, Method, Header 
            // SecurityConfig 통해서 처리할 예정
            // response.setStatus(HttpServletResponse.SC_OK);
            // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
            // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT,PATCH, DELETE, OPTIONS");
            // res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, Refresh-token");
            // res.setHeader("Access-Control-Allow-Credentials", "true");

            filterChain.doFilter(request, response);
            return ;

        }

        /*
        토큰 유효성 검증
        - white list 등록되지 않은 endPoint
        - request header 토큰 존재 유무 및 유효성을 검증(만료, 서명, 발행자)
        - Bearer xxxxxxxxxxx ;
        */
        String header = request.getHeader("Authorization");
        System.out.println("debug >>>> JwtAuthenticationFilter header "+header); 
        if( header == null || !header.startsWith("Bearer ")) {
            System.out.println("debug >>>> JwtAuthenticationFilter UNAUTHORIZED "); 
            filterChain.doFilter(request, response);
            return ;
        }

        // token이 존재한다면?
        // token: header, payload(claims), signature 
        String token = header.substring(7);
        System.out.println("debug >>>> JwtAuthenticationFilter token validation pass"); 
        System.out.println("debug >>>> JwtAuthenticationFilter token "+token); 

        try {
            // Claims == JWT 데이터(header, payload, sign)
            Claims claims = Jwts.parserBuilder()
                                .setSigningKey(key)
                                .build()
                                .parseClaimsJws(token)
                                .getBody();

            String email = claims.getSubject();
            System.out.println("debug >>>> JwtAuthenticationFilter token claims get email : " + email);
            
            // role
            String role = claims.get("role", String.class);
            System.out.println("debug >>>> JwtAuthenticationFilter token claims role : " + role);

            // security 인증정보를 담을 수 있는 객체
            // Principal, credential, authorities
            // UsernamePasswordAuthenticationToken
            // SecurityContextHolder <- user id(email)
            UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(email, 
                    null,
                    role != null ?
                    java.util.List.of(() -> "ROLE_" + role) :
                    java.util.List.of());

            // 요청한 사용자와 인증정보객체를 연동
            authenticationToken.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request)
            );

            // 사용자의 정보를 securityContextHolder 저장하고
            // 필요한 경우 controller 또는 service 에서 로드하여 정보를 비교할 수 있도록
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            System.out.println("debug >>>> JwtAuthenticationFilter security context holder save authenticationToken");
            filterChain.doFilter(request, response);

        } catch(Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return  ;    
        }
    }
    
}
