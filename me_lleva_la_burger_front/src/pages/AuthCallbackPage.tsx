import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { User } from '../context/AuthContext';
import { jwtDecode } from "jwt-decode";
import api from '../services/api';

const AuthCallbackPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const fetchUserData = async (token: string) => {
            try {
                // We set the token temporarily to allow the API interceptor to use it
                localStorage.setItem('token', token);

                // Fetch the full user profile from our backend
                const response = await api.get('/customer/perfil');
                const backendUser = response.data.data || response.data;

                // Construct the user for context combining JWT basic structure and DB data
                const userForContext: User = {
                    id: backendUser.id_cliente,
                    id_cliente: backendUser.id_cliente,
                    email: backendUser.correo_cliente,
                    role: 'cliente',
                    nombre: backendUser.nombre_cliente || backendUser.nombre,
                    apellido: backendUser.apellido_cliente || backendUser.apellido || '',
                    correo_cliente: backendUser.correo_cliente,
                    nombre_cliente: backendUser.nombre_cliente,
                    apellido_cliente: backendUser.apellido_cliente || '',
                    telefono_cliente: backendUser.telefono_cliente || ''
                };

                login(token, userForContext);
                navigate('/');
            } catch (error) {
                console.error('Error fetching backend user profile', error);
                // Fallback to basic JWT decode if fetch fails (unlikely, but safe)
                try {
                    const decoded: any = jwtDecode(token);
                    const userId = typeof decoded.sub === 'string' ? parseInt(decoded.sub, 10) : decoded.sub;
                    const userForContext: User = {
                        id: userId,
                        id_cliente: userId,
                        email: decoded.email,
                        role: 'cliente',
                        nombre: decoded.nombre || 'Usuario',
                        apellido: decoded.apellido || '',
                        correo_cliente: decoded.email,
                        nombre_cliente: decoded.nombre || 'Usuario',
                        apellido_cliente: decoded.apellido || ''
                    };
                    login(token, userForContext);
                    navigate('/');
                } catch (decodeError) {
                    navigate('/login');
                }
            }
        };

        const token = searchParams.get('token');
        if (token) {
            fetchUserData(token);
        } else {
            navigate('/login');
        }
    }, [searchParams, login, navigate]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center text-[#FFC72C]">
            <p className="text-xl font-bold">Autenticando...</p>
        </div>
    );
};

export default AuthCallbackPage;
