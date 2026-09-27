package com.heison.homepage.api;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/system")
public class SystemController {

    private final String environment;
    private final String storageMode;

    public SystemController(
        @Value("${app.environment}") String environment,
        @Value("${app.storage.mode}") String storageMode
    ) {
        this.environment = environment;
        this.storageMode = storageMode;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of(
            "status", "ok",
            "environment", environment,
            "storage", storageMode
        );
    }
}

