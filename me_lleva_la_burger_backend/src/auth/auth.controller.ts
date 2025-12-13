/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { LoginResponse } from '../types';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login/customer')
    @ApiOperation({ 
        summary: 'Iniciar sesión como cliente',
        description: 'Permite a un cliente iniciar sesión proporcionando su correo electrónico y contraseña. Devuelve un token de acceso si las credenciales son correctas.'
    })
    @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso. Devuelve un token de acceso.' })
    @ApiResponse({ status: 401, description: 'Credenciales inválidas. El correo electrónico o la contraseña son incorrectos.' })
    loginCustomer(@Body() loginDto: LoginCustomerDto): Promise<LoginResponse> {
        return this.authService.loginCustomer(loginDto);
    }

    @Post('login/employee')
    @ApiOperation({ 
        summary: 'Iniciar sesión como empleado',
        description: 'Permite a un empleado iniciar sesión proporcionando su correo electrónico y contraseña. Devuelve un token de acceso si las credenciales son correctas.'
    })
    @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso. Devuelve un token de acceso.' })
    @ApiResponse({ status: 401, description: 'Credenciales inválidas. El correo electrónico o la contraseña son incorrectos.' })
    loginEmployee(@Body() loginDto: LoginEmployeeDto): Promise<LoginResponse> {
        return this.authService.loginEmployee(loginDto);
    }
}
