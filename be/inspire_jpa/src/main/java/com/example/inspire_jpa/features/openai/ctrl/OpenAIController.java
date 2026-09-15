package com.example.inspire_jpa.features.openai.ctrl;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.inspire_jpa.features.openai.service.OpenAIService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController 
@RequiredArgsConstructor 
@RequestMapping("/openai")
public class OpenAIController {
    
    private final OpenAIService openAIService;

    @PostMapping("/recommand")
    public ResponseEntity<?> recommend(@RequestParam("weather") String weather,
                                       @RequestParam("location") String location) {
        System.out.println("debug >>>> openai controller recommand");
        System.out.println("debug >>>> openai controller recommand params : " + weather);
        System.out.println("debug >>>> openai controller recommand params : " + location);
        
        // openAIService.recommand(weather, location);
        // return null;

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(openAIService.recommand(weather, location));
    }
    
    @PostMapping("/quiz")
    public ResponseEntity<?> quiz(@RequestParam("subject") String subject) {
        System.out.println("debug >>>> openai controller quiz");
        System.out.println("debug >>>> openai controller quiz params : " + subject);
        
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(openAIService.quiz(subject));
    }
    
}
