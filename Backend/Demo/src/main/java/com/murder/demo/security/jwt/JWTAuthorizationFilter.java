package com.murder.demo.security.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import com.murder.demo.security.constant.SecurityConstant;
import com.murder.demo.security.service.UserDetailsServiceImpl;

public class JWTAuthorizationFilter extends OncePerRequestFilter{//Se ejecuta una vez por cada peticion
	
	private final static Logger logger = LoggerFactory.getLogger(JWTAuthorizationFilter.class);
	
	@Autowired
	JWTTokenProvider jwtTokenProvider;
	
	@Autowired
	UserDetailsServiceImpl userDetailsServiceImpl;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		try {
			String token = getToken(request);
			
			//Se comprueba si el token es valido
			if(token != null && jwtTokenProvider.isTokenValid(token)) {
				String username = jwtTokenProvider.getUserNameFromToken(token); //Obtener el usuario del token
				UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(username); //Carga el usuario
				UsernamePasswordAuthenticationToken auth = 
						new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities()); //Se le pasa el usuario que va a estar autenticado
				SecurityContextHolder.getContext().setAuthentication(auth); //Pasamos la autenticacion al contexto
				
			}
			
		}catch(Exception e) {
			logger.error("Fail method doFilter");
		}
		filterChain.doFilter(request, response);
		
	}
	
	//Metodo para extraer la palabra Bearer y el espacio del token
	private String getToken(HttpServletRequest request) {
		
		String header = request.getHeader(HttpHeaders.AUTHORIZATION);
		
		if(header != null && header.startsWith(SecurityConstant.TOKE_PREFIX)) {
			return header.replace(SecurityConstant.TOKE_PREFIX, "");
		}
		return null;
	}

}
