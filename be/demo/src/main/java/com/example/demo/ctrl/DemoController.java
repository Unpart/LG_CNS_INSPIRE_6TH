package com.example.demo.ctrl;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


/*
user endpoint : 
- http:// ip : port / demo / index
- http:// ip : port / demo / update
- http:// ip : port / demo / delete
- http:// ip : port / demo / select
- http:// ip : port / demo / insert
*/
@Controller // ( DemoController demoController = new DemoController() )
@RequestMapping("/demo") // http:// ip : port / demo
public class DemoController {
    
    @GetMapping("/index") // / index
    public String getMethodName() {
        System.out.println("debug >>>> user endPoint : /index");
        return "index";
    }
}
