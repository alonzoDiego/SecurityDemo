package com.murder.demo.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "graduate")
@Data @NoArgsConstructor
public class Graduate implements Serializable{
	 
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name="year")
	private Integer year;
	
	@Column(name="sex")
	private String sex;
	
	@Column(name="type_course")
	private String typeCourse;
	
	@Column(name="graduates")
	private Integer graduates;
	
}
