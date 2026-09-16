package com.example.inspire_jpa.features.commons.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;

import okhttp3.OkHttpClient;

@Configuration 
public class OpenAIConfig {
    
    @Bean 
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

    // agent 이용 시 주석처리 필요함
    // @Bean
    // public ChatClient chatClient(ChatClient.Builder builder) {
    //     return builder.build();
    // }

    @Bean 
    public OkHttpClient okHttpClient() {
        return new OkHttpClient();
    }
}
