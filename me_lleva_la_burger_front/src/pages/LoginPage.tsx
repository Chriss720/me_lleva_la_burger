import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const trimmedEmail = email.trim();

        // Try employee login first
        try {
            const employeeResponse = await client.post('/auth/login/employee', {
                correo_empleado: trimmedEmail,
                contrasena_empleado: password,
            });

            const responseData = employeeResponse.data?.data || employeeResponse.data;
            const { access_token, user } = responseData;

            // Mapeamos el usuario para el contexto
            const userData = {
                id: user.id,
                email: user.email,
                role: user.cargo, // 'gerente', 'encargado', 'empleado', 'cajero'
                nombre: user.nombre,
            };

            login(access_token, userData);

            // Redirección basada en el rol
            const role = (userData.role || '').toLowerCase();
            if (['gerente', 'encargado'].includes(role)) {
                navigate('/admin/dashboard');
            } else if (['empleado', 'cajero'].includes(role)) {
                navigate('/staff/pedidos');
            } else {
                navigate('/'); // Fallback
            }
            return; // Exit after successful employee login
        } catch (employeeError: any) {
            // Employee login failed, try client login
            console.log('Employee login failed, trying client login...');

            try {
                const clientResponse = await client.post('/auth/login/customer', {
                    correo_cliente: trimmedEmail,
                    contrasena_cliente: password,
                });

                const responseData = clientResponse.data?.data || clientResponse.data;
                const { access_token, user } = responseData;

                // Mapear el usuario cliente para el contexto
                const clientData = {
                    id: user.id,
                    email: user.email || user.correo_cliente || trimmedEmail, // Backend returns 'email'
                    role: 'cliente',
                    nombre: user.nombre, // Backend returns 'nombre'
                    apellido: user.apellido, // Backend returns 'apellido'
                    nombre_cliente: user.nombre, // Alias for compatibility
                    apellido_cliente: user.apellido, // Alias for compatibility
                    correo_cliente: user.email || user.correo_cliente || trimmedEmail,
                };

                // IMPORTANTE: Usar login() del contexto para que se actualice el estado
                // y se dispare el useEffect en Header que carga el carrito
                login(access_token, clientData);

                // También guardar en clienteActual para compatibilidad
                localStorage.setItem('clienteActual', JSON.stringify(user));

                // Redirect to previous page or home
                const state = location.state as { from?: { pathname: string } } | null;
                const from = state?.from?.pathname || '/';
                navigate(from, { replace: true });
            } catch (clientError: any) {
                // Both employee and client login failed
                console.error('Both login attempts failed:', { employeeError, clientError });
                setError('Credenciales inválidas');
            }
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-[#1a1a1a] p-8 rounded-lg border-2 border-[#FFC72C] w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-[#FFC72C] mb-2 font-oswald">Inicia sesion</h1>
                    <p className="text-gray-400">Inicia sesión para continuar</p>
                </div>

                {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="mx-4 text-gray-500 text-sm">O continúa con</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[#FFC72C] font-bold mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#222] text-white border border-gray-700 rounded p-3 focus:border-[#FFC72C] focus:outline-none transition"
                            placeholder="ejemplo@burgerexpress.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[#FFC72C] font-bold mb-2">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#222] text-white border border-gray-700 rounded p-3 focus:border-[#FFC72C] focus:outline-none transition"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-3 mb-6">
                        <a href="http://localhost:3000/auth/google" className="flex items-center justify-center gap-2 bg-white text-black font-bold py-3 rounded hover:bg-gray-100 transition transform active:scale-95 border border-gray-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png" alt="Google" className="w-5 h-5" />
                            <span>Iniciar con Google</span>
                        </a>
                        <a href="http://localhost:3000/auth/github" className="flex items-center justify-center gap-2 bg-[#2b3137] text-white font-bold py-3 rounded hover:bg-[#24292e] transition transform active:scale-95 border border-gray-700">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="Github" className="w-5 h-5 invert" />
                            <span>Iniciar con GitHub</span>
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#FFC72C] text-black font-bold py-3 rounded hover:bg-[#FFB700] transition transform active:scale-95"
                    >
                        INICIAR SESIÓN
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
