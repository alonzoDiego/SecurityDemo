package com.murder.demo.security.jwt;

import java.util.Base64;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.murder.demo.security.constant.SecurityConstant;
import com.murder.demo.security.model.UserPrincipal;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.impl.TextCodec;

@Component
public class JWTTokenProvider {
	
	private final static Logger logger = LoggerFactory.getLogger(JWTTokenProvider.class);
	
	@Value("${jwt.secret}")
	private String secret;
	
	public String generateJwtToken(Authentication authentication) {
		UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
		return Jwts.builder()
				.setSubject(userPrincipal.getUsername()) //Identificacion del usuario para determinar el propietario del token
				.setIssuer(SecurityConstant.GET_ARRAYS_LLC) //Emisor del token
				.setAudience(SecurityConstant.GET_ARRAYS_ADMINISTRATION) //Creado para la audiencia
				.setIssuedAt(new Date()) //Fecha de creacion del token
				.setExpiration(new Date(System.currentTimeMillis() + SecurityConstant.EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS512, secret) //Algoritmo de encriptacion para Signature 
				.compact(); 
	}
	
	public String getUserNameFromToken(String token) {
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
	}
	
	public boolean isTokenValid(String token) {
		try {
			Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
			return true;
			
		} catch(MalformedJwtException e) {
			logger.error("Malformed Token");
		}
		catch(UnsupportedJwtException e) {
			logger.error("Unsupported Token");
		}
		catch(ExpiredJwtException e) {
			logger.error("Expired Token");
		}
		catch(IllegalArgumentException e) {
			logger.error("Empty Token");
		}
		catch(SignatureException e) {
			logger.error("Signature failure" + e.getMessage());
		}
		return false;
	}
	
}