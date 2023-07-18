package com.xyz.todo.service.impl;

import com.xyz.todo.dto.LoginDto;
import com.xyz.todo.dto.RegisterDto;
import com.xyz.todo.entity.Role;
import com.xyz.todo.entity.User;
import com.xyz.todo.exception.TodoApiException;
import com.xyz.todo.repository.RoleRepository;
import com.xyz.todo.repository.UserRepository;
import com.xyz.todo.security.JwtAuthResponse;
import com.xyz.todo.security.JwtTokenProvider;
import com.xyz.todo.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;
    @Override
    public String register(RegisterDto registerDto) {
        if(userRepository.existsByUsername(registerDto.getUsername())){
            throw new TodoApiException(HttpStatus.BAD_REQUEST, "Username is already exists");
        }
        if(userRepository.existsByEmail(registerDto.getEmail())){
            throw new TodoApiException(HttpStatus.BAD_REQUEST, "Email is already exists");
        }

        var user = new User();
        user.setName(registerDto.getName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Set<Role> roles = new HashSet<>();
        var userRole = roleRepository.findByName("ROLE_USER");
        roles.add(userRole);
        user.setRoles(roles);
        userRepository.save(user);
        return "Registration Successful";
    }

    @Override
    public JwtAuthResponse login(LoginDto loginDto) {
        var authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(),
                loginDto.getPassword()
        ));

        SecurityContextHolder
                .getContext()
                .setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);


        Optional<User> userOptional = userRepository.findByUsernameOrEmail(loginDto.getUsernameOrEmail(), loginDto.getUsernameOrEmail());

        String role = null;
        if(userOptional.isPresent()){
            User loggedInUser = userOptional.get();
            Optional<Role> optionalRole = loggedInUser.getRoles().stream().findFirst();

            if(optionalRole.isPresent()){
                Role userRole = optionalRole.get();
                role = userRole.getName();
            }
        }

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setRole(role);
        jwtAuthResponse.setAccessToken(token);

        return jwtAuthResponse;

    }
}
