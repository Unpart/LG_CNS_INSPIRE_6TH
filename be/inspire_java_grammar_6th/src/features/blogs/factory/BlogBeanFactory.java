package features.blogs.factory;

import java.util.HashMap;
import java.util.Map;

import features.blogs.controller.InsertController;
import features.blogs.controller.ListController;
import features.blogs.controller.ReadController;
import features.blogs.controller.SearchController;
import features.blogs.repository.BlogReactDao;
import features.blogs.service.BlogReactService;
import features.blogs.service.BlogReactServiceImpl;

/*
singleton pattern
factory pattern
사용자의 요청 endPoint 로 각 controller 객체를 바인딩헤서 담을 것 : Map
*/
public class BlogBeanFactory {
    private Map<String, Object> map;
    private static BlogBeanFactory instance;
    private BlogReactService service;
    private BlogReactDao dao;

    private BlogBeanFactory() {
        map = new HashMap<>();
        dao = new BlogReactDao();
        service = new BlogReactServiceImpl(dao);
        // 추후 추가되는 각 기능을 구현하는 xxxController 등록
        map.put("list.inspire", new ListController(service));

        // Q) ReadController 등혹
        map.put("read.inspire", new ReadController(service));

        // SearchController 등혹
        map.put("search.inspire", new SearchController(service));

        // InsertController 등혹
        map.put("insert.inspire", new InsertController(service));
    }

    public static BlogBeanFactory getInstance() {
        if(instance == null) {
            instance = new BlogBeanFactory();
        }
        return instance;
    }

    // front controller 가 호출하는 메서드
    public Object getBean(String endPoint) {
        return map.get(endPoint);
    }
}
