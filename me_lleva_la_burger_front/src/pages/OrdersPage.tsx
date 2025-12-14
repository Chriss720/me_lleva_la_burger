import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { Layout } from '../components/layout/Layout';
import type { Order } from '../types';

export const OrdersPage = () => {
    const { isAuthenticated, isLoading: authLoading } = useAuth(); // Rename to avoid conflict if needed, or just use isLoading
    const navigate = useNavigate();
    const location = useLocation(); // Import from react-router-dom
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return; // Wait for auth check

        if (!isAuthenticated) {
            navigate('/login', { state: { from: location } });
            return;
        }
        loadOrders();
    }, [isAuthenticated, authLoading]);

    const loadOrders = async () => {
        try {
            const data = await orderService.getMyOrders();
            // Filter out cancelled orders and sort by date descending
            const activeOrders = data.filter(order => order.estado !== 'Cancelado');
            setOrders(activeOrders.sort((a, b) => {
                const dateA = a.fecha_pedido ? new Date(a.fecha_pedido).getTime() : 0;
                const dateB = b.fecha_pedido ? new Date(b.fecha_pedido).getTime() : 0;
                return dateB - dateA;
            }));
        } catch (error) {
            console.error('Error loading orders:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelOrder = async (orderId: number) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, cancelar pedido',
            cancelButtonText: 'No, mantener',
            background: '#1a1a1a',
            color: '#fff'
        });

        if (result.isConfirmed) {
            try {
                await orderService.deleteOrder(orderId);

                await Swal.fire({
                    title: '¡Cancelado!',
                    text: 'Tu pedido ha sido cancelado exitosamente.',
                    icon: 'success',
                    confirmButtonColor: '#FFC72C',
                    background: '#1a1a1a',
                    color: '#fff'
                });

                loadOrders(); // Refresh list
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo cancelar el pedido. Intenta de nuevo.',
                    icon: 'error',
                    confirmButtonColor: '#d33',
                    background: '#1a1a1a',
                    color: '#fff'
                });
            }
        }
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'pendiente': return 'text-yellow-400 bg-yellow-400/10';
            case 'completado': return 'text-green-400 bg-green-400/10';
            case 'enviado': return 'text-blue-400 bg-blue-400/10';
            case 'cancelado': return 'text-red-400 bg-red-400/10';
            default: return 'text-gray-400 bg-gray-400/10';
        }
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="min-h-screen bg-[#111] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFC72C]"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-[#111] bg-cover bg-center bg-fixed" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url('/images/bg-texture.jpg')" }}>
                <div className="container mx-auto px-4 py-8 max-w-5xl">
                    <h1 className="text-4xl font-bold text-white font-oswald mb-8 border-b border-gray-800 pb-4 uppercase tracking-wide">
                        Mis <span className="text-[#FFC72C]">Pedidos</span>
                    </h1>

                    {orders.length === 0 ? (
                        <div className="text-center py-20 glass-card rounded-3xl">
                            <div className="text-6xl mb-4">🍔</div>
                            <h2 className="text-2xl font-bold text-white mb-2">Aún no tienes pedidos</h2>
                            <p className="text-gray-400 mb-6">¡Se te antoja algo? Ve a nuestro menú.</p>
                            <button onClick={() => navigate('/')} className="glow-button bg-[#DA291C] text-white px-8 py-3 rounded-full font-bold hover:bg-[#b91c1c] transition">
                                Ver Menú
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id_pedido} className="glass-card rounded-2xl p-6 border border-white/5 hover:border-[#FFC72C]/30 transition-colors">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-xl font-bold text-white font-oswald">Pedido #{order.id_pedido}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.estado)}`}>
                                                    {order.estado}
                                                </span>
                                            </div>
                                            <p className="text-gray-400 text-sm">
                                                {order.fecha_pedido ? new Date(order.fecha_pedido).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Fecha desconocida'}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[#FFC72C] font-bold text-2xl font-oswald">${Number(order.total).toFixed(2)}</p>
                                        </div>
                                    </div>

                                    {/* Products Preview (Compact) */}
                                    <div className="bg-black/40 rounded-xl p-4 mb-4">
                                        <ul className="space-y-2">
                                            {order.orderProducts?.map((op: any) => (
                                                <li key={op.id_pedido_producto || Math.random()} className="flex justify-between text-gray-300 text-sm">
                                                    <span>{op.cantidad}x {op.product?.nombre_producto || 'Producto'}</span>
                                                    <span>${Number(op.subtotal).toFixed(2)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex justify-end pt-2">
                                        {/* Only show Cancel button if status is 'Pendiente' */}
                                        {order.estado?.toLowerCase() === 'pendiente' && (
                                            <button
                                                onClick={() => handleCancelOrder(order.id_pedido || 0)}
                                                className="text-red-400 hover:text-red-300 hover:bg-red-400/10 px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Cancelar Pedido
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default OrdersPage;
