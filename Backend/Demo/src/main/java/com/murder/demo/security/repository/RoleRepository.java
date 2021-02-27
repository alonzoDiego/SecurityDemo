package com.murder.demo.security.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.murder.demo.security.enumRoles.RoleName;
import com.murder.demo.security.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
	
	Optional<Role> findByName(RoleName name);
}
