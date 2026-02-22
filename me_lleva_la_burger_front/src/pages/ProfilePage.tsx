import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../hooks';
import { authService } from '../services/authService';
import Swal from 'sweetalert2';

export const ProfilePage = () => {
    const { user, updateUser } = useAuth(); // Usamos login para actualizar el contexto si es necesario, o recargamos
    const [formData, setFormData] = useState({
        nombre_cliente: '',
        apellido_cliente: '',
        correo_cliente: '',
        telefono_cliente: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                nombre_cliente: user.nombre_cliente || user.nombre || '',
                apellido_cliente: user.apellido_cliente || user.apellido || '',
                correo_cliente: user.correo_cliente || user.email || '',
                telefono_cliente: user.telefono_cliente || '',
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsLoading(true);
        try {
            // El ID puede estar en user.id o user.id_cliente dependiendo de la respuesta del backend
            const userId = user.id || user.id_cliente;

            if (!userId) {
                console.error('User ID not found');
                Swal.fire({
                    title: 'Error',
                    text: 'Error de identificación de usuario',
                    icon: 'error'
                });
                setIsLoading(false);
                return;
            }

            const updatedProfileData = await authService.updateProfile(userId, formData);

            // Actualizar el estado global en AuthContext para evitar recargar la página y mezclar keys de localStorage
            const newUserData = { ...user, ...updatedProfileData };
            updateUser(newUserData);

            Swal.fire({
                title: '¡Actualizado!',
                text: 'Tu perfil ha sido actualizado correctamente.',
                icon: 'success',
                confirmButtonColor: '#FFC72C',
                background: '#1a1a1a',
                color: '#fff'
            });

        } catch (error) {
            console.error('Error updating profile:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo actualizar el perfil. Intenta de nuevo.',
                icon: 'error',
                confirmButtonColor: '#DA291C',
                background: '#1a1a1a',
                color: '#fff'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.95), rgba(0,0,0,0.95)), url('/images/bg-texture.jpg')" }}>
            <Header />

            <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
                <div className="glass-card w-full max-w-2xl p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur-md animate-fade-in border border-white/10">
                    <h1 className="text-4xl font-extrabold text-[#FFC72C] mb-8 text-center font-oswald uppercase tracking-wide">
                        Mi Perfil
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-300 font-bold ml-1">Nombre</label>
                                <input
                                    type="text"
                                    name="nombre_cliente"
                                    value={formData.nombre_cliente}
                                    onChange={handleChange}
                                    className="bg-transparent border-b border-gray-600 px-4 py-3 text-white focus:outline-none focus:border-[#FFC72C] transition-colors placeholder-gray-600"
                                    placeholder="Tu nombre"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-300 font-bold ml-1">Apellido</label>
                                <input
                                    type="text"
                                    name="apellido_cliente"
                                    value={formData.apellido_cliente}
                                    onChange={handleChange}
                                    className="bg-transparent border-b border-gray-600 px-4 py-3 text-white focus:outline-none focus:border-[#FFC72C] transition-colors placeholder-gray-600"
                                    placeholder="Tu apellido"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 font-bold ml-1">Correo Electrónico</label>
                            <input
                                type="email"
                                name="correo_cliente"
                                value={formData.correo_cliente}
                                onChange={handleChange}
                                className="bg-transparent border-b border-gray-600 px-4 py-3 text-white focus:outline-none focus:border-[#FFC72C] transition-colors placeholder-gray-600"
                                placeholder="tucorreo@ejemplo.com"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 font-bold ml-1">Teléfono</label>
                            <input
                                type="tel"
                                name="telefono_cliente"
                                value={formData.telefono_cliente}
                                onChange={handleChange}
                                className="bg-transparent border-b border-gray-600 px-4 py-3 text-white focus:outline-none focus:border-[#FFC72C] transition-colors placeholder-gray-600"
                                placeholder="Tu número de teléfono"
                            />
                        </div>

                        <div className="pt-8">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="glow-button w-full bg-[#DA291C] text-white py-4 rounded-full font-bold hover:bg-[#b91c1c] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-wider text-xl"
                            >
                                {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};
