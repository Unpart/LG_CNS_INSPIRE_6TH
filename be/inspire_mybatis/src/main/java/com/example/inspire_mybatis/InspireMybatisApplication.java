package com.example.inspire_mybatis;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InspireMybatisApplication {

	public static void main(String[] args) {
		Dotenv env = Dotenv.configure().ignoreIfMissing().load();
		env.entries().forEach(entry -> {
			System.setProperty(entry.getKey(), entry.getValue());
			System.out.println("debug >>>> end : " + entry.getKey() + "\t" + entry.getValue());
		});
		SpringApplication.run(InspireMybatisApplication.class, args);
	}

}
