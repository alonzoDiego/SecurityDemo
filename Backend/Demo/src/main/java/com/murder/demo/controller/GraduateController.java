package com.murder.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.murder.demo.exception.ModelNotFoundException;
import com.murder.demo.model.Graduate;
import com.murder.demo.service.IGraduateService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/api/graduates")
@Api(tags="Graduate", value="Service Web RESTFul of Graduate")
public class GraduateController {
	
	@Autowired
	private IGraduateService graduateService;
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping
	@ApiOperation(value="Crear Graduado", notes="Servicio para crear un nuevo graduado")
	@ApiResponses(value= {@ApiResponse(code=201, message="Graduado creado correctamente"),
						 @ApiResponse(code=400, message="Solicitud Invalida")})
	public ResponseEntity<Graduate> registrar(@Valid @RequestBody Graduate graduate){
		Graduate graduateNew = new Graduate();
		graduateNew = graduateService.registrar(graduate);
		
		return new ResponseEntity<Graduate>(graduateNew, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping
	@ApiOperation(value="Actualizar Graduado", notes="Servicio para actualizar un graduado")
	@ApiResponses(value= {@ApiResponse(code=201, message="Graduado actualizado correctamente"),
						 @ApiResponse(code=400, message="Solicitud Invalida")})
	public ResponseEntity<Graduate> actualizar(@Valid @RequestBody Graduate graduate){
		graduateService.modificar(graduate);
		
		return new ResponseEntity<Graduate>(HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping(value="/{id}")
	@ApiOperation(value="Eliminar Graduado", notes="Servicio para eliminar un graduado")
	@ApiResponses(value= {@ApiResponse(code=201, message="Graduado eliminado correctamente"),
						 @ApiResponse(code=400, message="Graduado no encontrado")})
	public void eliminar(@PathVariable("id") Integer id){
		Optional<Graduate> graduate = graduateService.listarPorId(id);
		
		if(graduate.isPresent()) {
			graduateService.eliminar(id);
		}else {
			throw new ModelNotFoundException("ID "+id);
		}
	}
	
	@GetMapping(value="/{id}")
	@ApiOperation(value="Listar Graduado por id", notes="Servicio para listar un graduado por id")
	@ApiResponses(value= {@ApiResponse(code=201, message="Graduado encontrado"),
						 @ApiResponse(code=400, message="Graduado no encontrado")})
	public ResponseEntity<Graduate> listarPorId(@PathVariable("id") Integer id){
		Optional<Graduate> graduate = graduateService.listarPorId(id);
		
		if(!graduate.isPresent()) 
			throw new ModelNotFoundException("ID "+id);
		
		return new ResponseEntity<Graduate>(graduate.get(), HttpStatus.OK);
	}
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	@ApiOperation(value="Listar Graduados", notes="Servicio para listar todos los graduados")
	@ApiResponses(value= {@ApiResponse(code=201, message="Graduados encontrados"),
						 @ApiResponse(code=400, message="Graduados no encontrados")})
	public ResponseEntity<List<Graduate>> listar(){
		List<Graduate> graduates = new ArrayList<Graduate>();
		graduates = graduateService.listar();
		
		return new ResponseEntity<List<Graduate>>(graduates, HttpStatus.OK);
	}
}
