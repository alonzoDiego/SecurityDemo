package com.murder.demo.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.murder.demo.model.Graduate;

public interface IGraduateRepository extends JpaRepository<Graduate, Integer>{

}
