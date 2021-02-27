package com.murder.demo.security.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.murder.demo.security.model.User;
import com.murder.demo.security.repository.UserRepository;

@Service
@Transactional //Evita una incoherencia si se escribe en la tabla al mismo tiempo
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
	public Optional<User> getByUsername(String username){
		return userRepository.findByUsername(username);
	}
	
	public boolean existByUsername(String username) {
		return userRepository.existsByUsername(username);
	}
	
	public boolean existByEmail(String email) {
		return userRepository.existsByEmail(email);
	}
	
	public void save(User user) {
		userRepository.save(user);
	}
	
}
