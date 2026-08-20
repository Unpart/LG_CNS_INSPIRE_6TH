package features.blogs.controller;

import features.blogs.domain.dto.BlogResponseDTO;
import features.blogs.service.BlogReactService;

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

    public BlogResponseDTO read(int blogId) {
        System.out.println("debug >>>> read controller read params :  "+blogId ); 
        // Q) service read() 호출해서 반환 
        return service.read(blogId) ;
    }
}
