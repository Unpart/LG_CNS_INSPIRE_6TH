package features.blogs.controller;

import features.blogs.service.BlogReactService;

public class FileContoller {
    private BlogReactService service;

    public FileContoller() {
    }

    public FileContoller(BlogReactService service) {
        this.service = service;
    }

    public boolean save() {
        System.out.println("debug >>>> file controller save :  "); 
        return service.saveToFile();

    }

    public boolean load() {
        System.out.println("debug >>>> file controller load :  "); 
        return service.loadToFile();
    }
}
