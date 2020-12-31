package com.murder.demo.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.murder.demo.model.Graduate;
import com.murder.demo.model.repository.IGraduateRepository;
import com.murder.demo.service.IGraduateService;

@Service
public class GraduateServiceImpl implements IGraduateService{
	
	@Autowired
	private IGraduateRepository graduateRepository;

	@Override
	public Graduate registrar(Graduate t) {
		return graduateRepository.save(t);
	}

	@Override
	public Graduate modificar(Graduate t) {
		return graduateRepository.save(t);
	}

	@Override
	public void eliminar(int id) {
		graduateRepository.deleteById(id);
	}

	@Override
	public Optional<Graduate> listarPorId(int id) {
		return graduateRepository.findById(id);
	}

	@Override
	public List<Graduate> listar() {
		return graduateRepository.findAll();
	}

}
