package features.blogs.controller;

import features.blogs.service.BlogReactService;
import features.blogs.util.ResponseEntity;

public class DeleteController {
    private BlogReactService service;

    public DeleteController() {
    }

    public DeleteController(BlogReactService service) {
        this.service = service;
    }

    public ResponseEntity<Integer> delete(int blogId) {
        System.out.println("debug >>>> read controller read params :  " + blogId );
        int result = service.delete(blogId);
        return new ResponseEntity<>(result == 1 ? 200 : 400,
                                    result == 1 ? "삭제성공" : "삭제실패", result);
    }
}
