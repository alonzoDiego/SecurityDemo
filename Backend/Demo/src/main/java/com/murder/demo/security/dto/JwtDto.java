package com.murder.demo.security.dto;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import lombok.Data;
import lombok.NoArgsConstructor;

//Cada vez que hagamos un Login, nos va a devolver el ResponseEntity del controlador (un jason web token) 

@Data
public class JwtDto {
	
	private String token;
	private String bearer = "Bearer";
	private String username;
	private Collection<? extends GrantedAuthority> authorities;
	
	
	public JwtDto(String token, String username, Collection<? extends GrantedAuthority> authorities) {
		super();
		this.token = token;
		this.username = username;
		this.authorities = authorities;
	}
	
}
