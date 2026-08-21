package features.blogs.controller;

import java.util.List;

import features.blogs.domain.dto.BlogRequestDTO;
import features.blogs.domain.dto.BlogResponseDTO;
import features.blogs.service.BlogReactService;
import features.blogs.util.ResponseEntity;

public class SearchController {
    private BlogReactService service;

    public SearchController() {
    }

    public SearchController(BlogReactService service) {
        this.service = service;
    }

    public ResponseEntity<List<BlogResponseDTO>> search(String keyword) {
        System.out.println("debug >>>> search controller search params :  " + keyword); 
        List<BlogResponseDTO> data = service.search(BlogRequestDTO.builder()
                                            .keyword(keyword)
                                            .build());
        return new ResponseEntity<>(200, "ok", data);
    }
}
