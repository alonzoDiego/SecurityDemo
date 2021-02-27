package com.murder.demo.security.dto;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.NoArgsConstructor;

//Se crea el dto de NewUser para que en el registro se pueda manejar el json con esta estructura 
//y no con todos los campos de la clase User, ya que pueden ser muchos y el trafico de datos seria lento.
//Los roles lo manejaremos como cadena para que de igual manera agilizar el trafico de datos

@Data @NoArgsConstructor
public class RegisterUser {
	
	@NotBlank
	private String firstName;
	
	@NotBlank
	private String lastName;
	
	@NotBlank
	private String username;
	
	@NotBlank
	private String password;
	
	@Email
	private String email;
	private Set<String> roles = new HashSet<>();
}
