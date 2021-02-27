package com.murder.demo.security.controller;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.murder.demo.security.dto.JwtDto;
import com.murder.demo.security.dto.LoginUser;
import com.murder.demo.security.dto.RegisterUser;
import com.murder.demo.security.enumRoles.RoleName;
import com.murder.demo.security.jwt.JWTTokenProvider;
import com.murder.demo.security.model.Role;
import com.murder.demo.security.model.User;
import com.murder.demo.security.service.RoleService;
import com.murder.demo.security.service.UserService;

@RestController
@RequestMapping(value = "/auth")
public class AuthController {
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UserService userService;
	
	@Autowired
	RoleService rolService;
	
	@Autowired
	JWTTokenProvider tokenProvider;
	
	@PostMapping("/nuevo")
	public ResponseEntity<?> register(@Valid @RequestBody RegisterUser registerUser, BindingResult bindingResult){
		
		if(bindingResult.hasErrors()) 
			return new ResponseEntity("Invalid Fields", HttpStatus.BAD_REQUEST);
		if(userService.existByUsername(registerUser.getUsername()))
			return new ResponseEntity("That name already exists", HttpStatus.BAD_REQUEST); 
		if(userService.existByEmail(registerUser.getEmail()))
			return new ResponseEntity("That email already exists", HttpStatus.BAD_REQUEST); 
		
		User user = new User();
		user.setFirstName(registerUser.getFirstName());
		user.setLastName(registerUser.getLastName());
		user.setUsername(registerUser.getUsername());
		user.setPassword(passwordEncoder.encode(registerUser.getPassword()));
		user.setEmail(registerUser.getEmail());
		user.setEnable(true);
		user.setJoinDate(new Date());
		
		Set<Role> roles = new HashSet<>();
		roles.add(rolService.getByName(RoleName.ROLE_USER).get());
		if(registerUser.getRoles().contains("admin")) {
			roles.add(rolService.getByName(RoleName.ROLE_ADMIN).get());
		}
		user.setRoles(roles);
		userService.save(user);
		
		return new ResponseEntity<>(user, HttpStatus.OK);
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<JwtDto> login(@Valid @RequestBody LoginUser loginUser, BindingResult bindingResult){
		
		if(bindingResult.hasErrors()) 
			return new ResponseEntity("Invalid Fields", HttpStatus.BAD_REQUEST);
		
		Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUser.getUsername(), loginUser.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(auth); //Aqui autenticamos al usuario
		
		String jwt = tokenProvider.generateJwtToken(auth);
		UserDetails userDetails = (UserDetails) auth.getPrincipal();
		JwtDto jwtDto = new JwtDto(jwt, userDetails.getUsername(), userDetails.getAuthorities());
		
		return new ResponseEntity<JwtDto>(jwtDto, HttpStatus.OK);
		
	}
}
