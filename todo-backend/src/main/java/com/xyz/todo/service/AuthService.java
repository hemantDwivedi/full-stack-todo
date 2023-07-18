package com.xyz.todo.service;

import com.xyz.todo.dto.LoginDto;
import com.xyz.todo.dto.RegisterDto;
import com.xyz.todo.security.JwtAuthResponse;

public interface AuthService {
    String register(RegisterDto registerDto);
    JwtAuthResponse login(LoginDto loginDto);
}
