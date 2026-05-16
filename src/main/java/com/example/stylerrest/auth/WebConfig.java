package com.example.stylerrest.auth;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 1. Get the absolute path to the folder next to your project
        String path = Paths.get("..", "uploads")
                .toAbsolutePath()
                .toUri()
                .toString();

        // 2. Map the URL /uploads/** to that folder
        // The "file:" prefix is handled automatically by toUri()
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(path);
    }
}
