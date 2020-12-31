package com.murder.demo.service;

import java.util.List;
import java.util.Optional;

public interface IService<T> {
	T registrar(T t);
	T modificar(T t);
	void eliminar(int id);
	Optional<T> listarPorId(int id);
	List<T> listar();
}
