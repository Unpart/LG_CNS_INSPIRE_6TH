package features.blogs.controller;

import features.blogs.domain.dto.BlogResponseDTO;
import features.blogs.service.BlogReactService;
import features.blogs.util.ResponseEntity;

public class ReadController {
    /*
    BlogService 와 의존성 관계를 형성
    */
    private BlogReactService service;

    public ReadController() {
    }

    public ReadController(BlogReactService service) {
        this.service = service;
    }

    public ResponseEntity<BlogResponseDTO> read(int blogId) {
        System.out.println("debug >>>> read controller read params :  "+blogId ); 
        try {
            return new ResponseEntity<>(200, "ok", service.read(blogId));
        } catch (RuntimeException e) {
            return new ResponseEntity<>(404, e.getMessage(), null);
        }
    }
}
