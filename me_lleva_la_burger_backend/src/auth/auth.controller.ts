/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GithubAuthGuard } from './guards/github-auth.guard';
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
    @Get('google')
    @UseGuards(GoogleAuthGuard)
    @ApiOperation({ summary: 'Iniciar sesión con Google' })
    googleAuth() {
        // Initiates the Google OAuth2 login flow
    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    @ApiOperation({ summary: 'Callback para Google OAuth2' })
    async googleAuthRedirect(@Req() req, @Res() res) {
        const { access_token } = await this.authService.loginOAuth(req.user);
        // Redirect to frontend with token
        res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/callback?token=${access_token}`);
    }

    @Get('github')
    @UseGuards(GithubAuthGuard)
    @ApiOperation({ summary: 'Iniciar sesión con GitHub' })
    githubAuth() {
        // Initiates the GitHub OAuth2 login flow
    }

    @Get('github/callback')
    @UseGuards(GithubAuthGuard)
    @ApiOperation({ summary: 'Callback para GitHub OAuth2' })
    async githubAuthRedirect(@Req() req, @Res() res) {
        const { access_token } = await this.authService.loginOAuth(req.user);
        // Redirect to frontend with token
        res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/callback?token=${access_token}`);
    }
}
