package com.murder.demo.security.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.murder.demo.security.enumRoles.RoleName;
import com.murder.demo.security.model.Role;
import com.murder.demo.security.repository.RoleRepository;

@Service
@Transactional
public class RoleService {
	
	@Autowired
	RoleRepository roleRepository;
	
	public Optional<Role> getByName(RoleName name){
		return roleRepository.findByName(name);
	}
	
	public void save(Role role) {
		roleRepository.save(role);
	}
}
