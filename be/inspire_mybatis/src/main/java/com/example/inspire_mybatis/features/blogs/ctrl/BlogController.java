package com.example.inspire_mybatis.features.blogs.ctrl;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.inspire_mybatis.features.blogs.domain.BlogRequestDTO;
import com.example.inspire_mybatis.features.blogs.domain.BlogResponseDTO;
import com.example.inspire_mybatis.features.blogs.service.BlogService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;



@RestController
@RequestMapping("/blogs")
@RequiredArgsConstructor
public class BlogController {
    
    private final BlogService blogService; 

    // endPoint -> http:// ip : port / blogs / index
    @GetMapping("/index")
    public ResponseEntity<?> index() {
        System.out.println("debug >>>> blog controller index");
        List<BlogResponseDTO> list = blogService.list();

        // status code : NO_CONTENT(204), OK(200)
    //     return list.isEmpty()
    //             ? ResponseEntity.status(HttpStatus.NO_CONTENT).build()
    //             : ResponseEntity.status(HttpStatus.OK).body(list);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }
    
    @PostMapping("/insert")
    public ResponseEntity<?> insert(@RequestBody BlogRequestDTO request) {
        System.out.println("debug >>>> blog controller insert");
        System.out.println("debug >>>> blog controller insert params : " + request);

        int flag = blogService.insert(request);
        System.out.println("debug >>>> blog controller insert result flag : " + flag);

        return flag != 0
                ? ResponseEntity.status(HttpStatus.CREATED).build()
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/read/{id}")
    public ResponseEntity<?> read(@PathVariable("id") Integer id, @RequestHeader("Authorization") String at) {
        System.out.println("debug >>>> blog controller read");
        System.out.println("debug >>>> blog controller read access token : " + at);
        System.out.println("debug >>>> blog controller read params : " + id);

        BlogResponseDTO response = blogService.read(id);
        System.out.println("debug >>>> blog controller insert result : " + response);

        return response != null
                ? ResponseEntity.status(HttpStatus.OK).body(response)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    
    
}
