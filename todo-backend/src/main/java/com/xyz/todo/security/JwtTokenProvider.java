package com.xyz.todo.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class JwtTokenProvider {
    private String jwtSecret;
    private String jwtExpirationDate;
    @Value("${app.jwt-secret}")
    public void setJwtSecret(String jwtSecret){
        this.jwtSecret = jwtSecret;
    }
    @Value("${app.jwt-expiration-milliseconds}")
    public void setJwtExpirationDate(String jwtExpirationDate){
        this.jwtExpirationDate = jwtExpirationDate;
    }

    public String generateToken(Authentication authentication) {
        String username = authentication.getName();

        return Jwts
                .builder()
                .setSubject(username)
                .signWith(key())
                .compact();
    }

    private Key key() {
        return Keys
                .hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String getUsername(String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        Jwts
                .parserBuilder()
                .setSigningKey(key())
                .build()
                .parse(token);

        return true;
    }
}
