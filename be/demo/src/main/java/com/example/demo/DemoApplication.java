package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class DemoApplication {

	/*
	npm start (react)
	build - ./gradlew bootJar - xxxxx.jar
	deploy - start tomcat server (xxxx.jar)
	*/
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
