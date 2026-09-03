package com.example.inspire_mybatis.features.blogs.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.inspire_mybatis.features.blogs.domain.BlogRequestDTO;
import com.example.inspire_mybatis.features.blogs.domain.BlogResponseDTO;
import com.example.inspire_mybatis.features.blogs.repository.BlogMapper;
import com.example.inspire_mybatis.features.comments.repository.CommentMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BlogService {
    
    private final BlogMapper blogMapper;
    private final CommentMapper commentMapper;

    @Transactional(readOnly = true)
    public List<BlogResponseDTO> list() {
        System.out.println("debug >>>> blog service list");
        System.out.println("debug >>>> blog service list blogMapper : " + blogMapper);
        return blogMapper.findByAll();
    }

    public int insert(BlogRequestDTO request) {
        System.out.println("debug >>>> blog service insert");
        System.out.println("debug >>>> blog service insert params : " + request);
        return blogMapper.save(request);
    }

    @Transactional(readOnly = true)
    public BlogResponseDTO read(Integer id) {
        // blog select - comment [] select
        System.out.println("debug >>>> blog service read");
        System.out.println("debug >>>> blog service read params : " + id);

        // case 01
        BlogResponseDTO blog = blogMapper
                .findById(id)
                .orElseThrow(() -> new RuntimeException(id + "BLOG NOT FOUND"));

        // bad case
        // blog.setComments(commentMapper.findByBlogId(blog.getId()));

        return blog.toBuilder()
                .comments(commentMapper.findByBlogId(blog.getId()))
                .build();

        // case 02
        // BlogResponseDTO blog = blogMapper
        //         .findById(id)
        //         .map( dto -> BlogResponseDTO.builder()
        //                         .id(dto.getId())
        //                         .title(dto.getTitle())
        //                         .content(dto.getContent())
        //                         .comments(commentMapper.findByBlogId(dto.getId()))
        //                         .build())
        //         .orElseThrow(() -> new RuntimeException(id + " BLOG NOT FOUND")) ;
    }
}
