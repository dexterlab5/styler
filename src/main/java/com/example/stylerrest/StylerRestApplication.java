package com.example.stylerrest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class StylerRestApplication {

    @GetMapping
    public String hello() {
        return "Hello WOrld!";
    }

    public static void main(String[] args) {
        SpringApplication.run(StylerRestApplication.class, args);
    }

}
