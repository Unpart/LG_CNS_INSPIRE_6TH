package com.example.inspire_mybatis.features.comments.ctrl;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.inspire_mybatis.features.comments.domain.dto.CommentRequestDTO;
import com.example.inspire_mybatis.features.comments.domain.dto.CommentResponseDTO;
import com.example.inspire_mybatis.features.comments.service.CommentService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/index")
    public ResponseEntity<?> index(@RequestParam("blogId") Integer blogId) {
        System.out.println("debug >>>> comment controller index");
        List<CommentResponseDTO> list = commentService.list(blogId);

        // status code : NO_CONTENT(204), OK(200)
    //     return list.isEmpty()
    //             ? ResponseEntity.status(HttpStatus.NO_CONTENT).build()
    //             : ResponseEntity.status(HttpStatus.OK).body(list);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }
    
    @PostMapping("/insert")
    public ResponseEntity<?> insert(@RequestBody CommentRequestDTO request) {
        System.out.println("debug >>>> comment controller insert");
        System.out.println("debug >>>> comment controller insert params : " + request);

        int id = commentService.insert(request);
        System.out.println("debug >>>> blog controller insert result id : " + id);

        return id != 0
                ? ResponseEntity.status(HttpStatus.CREATED).body(CommentResponseDTO.builder()
                                                                    .blogId(request.getBlogId())
                                                                    .email(request.getEmail())
                                                                    .comment(request.getComment())
                                                                    .id(id)
                                                                    .build())
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
    
}
