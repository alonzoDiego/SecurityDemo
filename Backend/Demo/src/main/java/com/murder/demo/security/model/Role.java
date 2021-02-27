package com.murder.demo.security.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.murder.demo.security.enumRoles.RoleName;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="roles")
@Data @NoArgsConstructor
public class Role implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "role_id", nullable = false)
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "name")
	@Enumerated(EnumType.STRING)
	private RoleName name;

}
