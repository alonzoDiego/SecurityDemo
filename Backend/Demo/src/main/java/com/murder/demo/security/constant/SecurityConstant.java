package com.murder.demo.security.constant;

public class SecurityConstant {
	
	public static final long EXPIRATION_TIME = 432_000_000;//(5 dias). Segun los requerimientos de la empresa
	public static final String TOKE_PREFIX = "Bearer ";
	public static final String JWT_TOKEN_HEADER = "Jwt-Token";
	public static final String TOKEN_CANNOT_BE_VERIFIED = "Token cannot be verified"; //Para un token alterado
	public static final String GET_ARRAYS_LLC = "Get Arrays, LLC"; //Dato de la empresa como el nombre por ejemplo
	public static final String GET_ARRAYS_ADMINISTRATION = "User management portal";
	public static final String AUTHORITIES = "authorities"; //Para la autorizacion
	public static final String FORBIDDEN_MESSAGE = "You need log in to access this page"; //Para solicitar acceso
	public static final String ACCESS_DENIED_MESSAGE = "You do not have permission to access this page"; //Para el acceso denegado
	public static final String OPTIONS_HTTP_METHOD = "OPTIONS";
	public static final String[] PUBLIC_URLS = {"/user/login", "/user/register", "/user/resetpassword/**", "/user/image/**"};
}
