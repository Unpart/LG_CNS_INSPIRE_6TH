package features.blogs.controller;

import java.util.List;

import features.blogs.domain.dto.BlogResponseDTO;
import features.blogs.factory.BlogBeanFactory;

public class BlogFrontController {

    private BlogBeanFactory factory;

    public BlogFrontController() {
        factory = BlogBeanFactory.getInstance();
    }

    public List<BlogResponseDTO> list(String endPoint){
        System.out.println("debug >>>> front controller endPoint : " + endPoint);
        Object controller = factory.getBean(endPoint);
        return ((ListController)controller).list();
    }
}
