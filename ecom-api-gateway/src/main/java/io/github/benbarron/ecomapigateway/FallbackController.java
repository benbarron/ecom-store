package io.github.benbarron.ecomapigateway;

import java.util.Date;
import java.util.HashMap;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestController
@RestControllerAdvice
public class FallbackController {

    @RequestMapping("/api/fallback")
    public ResponseEntity<Object> productServiceFallback() {
        var res = new HashMap<>();
        res.put("date", new Date().toString());
        res.put("message", "The api is taking too long to respond or is down. Please try again later");
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(res);
    }
}
