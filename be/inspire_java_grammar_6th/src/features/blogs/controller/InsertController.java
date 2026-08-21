package features.blogs.controller;

import features.blogs.domain.dto.BlogRequestDTO;
import features.blogs.domain.dto.BlogResponseDTO;
import features.blogs.service.BlogReactService;
import features.blogs.util.ResponseEntity;

public class InsertController {
    private BlogReactService service;

    public InsertController() {
    }

    public InsertController(BlogReactService service) {
        this.service = service;
    }

    // view 에게 응답하는 역할의 메서드
    // 여러 파리미터를 객체로 바인딩하고 데이터의 유효성을 체크하는 역할이 필요함!!
    public ResponseEntity<Integer> insert(String title, String content, String email) {
        System.out.println("debug >>>> insert controller insert params :  " + title + "\t" + content + "\t" + email); 
        int result = service.insert(BlogRequestDTO.builder()
                                            .title(title)
                                            .content(content)
                                            .email(email)
                                            .build());
        return new ResponseEntity<>(result == 1 ? 200 : 400,
                                    result == 1 ? "입력성공" : "입력실패", result);
    }
}
