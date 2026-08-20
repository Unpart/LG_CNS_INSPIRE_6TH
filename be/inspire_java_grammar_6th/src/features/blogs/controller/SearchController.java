package features.blogs.controller;

import java.util.List;

import features.blogs.domain.dto.BlogRequestDTO;
import features.blogs.domain.dto.BlogResponseDTO;
import features.blogs.service.BlogReactService;

public class SearchController {
    private BlogReactService service;

    public SearchController() {
    }

    public SearchController(BlogReactService service) {
        this.service = service;
    }

    public List<BlogResponseDTO> search(String keyword) {
        System.out.println("debug >>>> search controller search params :  " + keyword); 
        // Q) service read() 호출해서 반환 
        return service.search(BlogRequestDTO.builder()
                                            .keyword(keyword)
                                            .build());
    }
}
