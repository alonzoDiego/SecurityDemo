package com.murder.demo.security.dto;

import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor
public class LoginUser {
	
	@NotBlank
	private String username;
	
	@NotBlank
	private String password;
}
