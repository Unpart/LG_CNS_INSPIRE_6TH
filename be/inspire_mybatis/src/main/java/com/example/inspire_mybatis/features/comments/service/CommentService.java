package com.example.inspire_mybatis.features.comments.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.inspire_mybatis.features.comments.domain.dto.CommentRequestDTO;
import com.example.inspire_mybatis.features.comments.domain.dto.CommentResponseDTO;
import com.example.inspire_mybatis.features.comments.repository.CommentMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentMapper commentMapper;

    @Transactional(readOnly = true)
    public List<CommentResponseDTO> list(Integer blogId) {
        System.out.println("debug >>>> comment service list");
        System.out.println("debug >>>> comment service list blogMapper : " + commentMapper);
        return commentMapper.findByBlogId(blogId);
    }

    public int insert(CommentRequestDTO request) {
        System.out.println("debug >>>> comment service insert");
        System.out.println("debug >>>> comment service insert params : " + request);
        commentMapper.save(request);

        return request.getId();
    }

    public int delete(Integer id) {
        System.out.println("debug >>>> comment service delete");
        System.out.println("debug >>>> comment service delete params : " + id);
        return commentMapper.delete(id);
    }

    public int update(Map<String, Object> map) {
        System.out.println("debug >>>> comment service update");
        return commentMapper.update(map);
    }
}
