package com.xyz.todo.controller;

import com.xyz.todo.dto.LoginDto;
import com.xyz.todo.dto.RegisterDto;
import com.xyz.todo.security.JwtAuthResponse;
import com.xyz.todo.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/auth")
@AllArgsConstructor
public class AuthController {
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        return new ResponseEntity<>(authService.register(registerDto), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto){
        JwtAuthResponse jwtAuthResponse = authService.login(loginDto);
        return ResponseEntity.ok(jwtAuthResponse);
    }
}
