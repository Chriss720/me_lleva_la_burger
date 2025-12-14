import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks';
import { Header } from '../components/layout/Header';
import { StatusModal } from '../components/common/StatusModal';

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const { items, getTotal, checkout, addItem, removeItem, isLoading } = useCart();
    const [paymentMethod, setPaymentMethod] = useState<'Tarjeta' | 'Efectivo'>('Tarjeta');
    const [isProcessing, setIsProcessing] = useState(false);
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        type: 'success' | 'error';
        title: string;
        message: string;
        imageSrc?: string;
    }>({
        isOpen: false,
        type: 'success',
        title: '',
        message: '',
    });
    const isMountedRef = useRef(true);

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const handleQuantityChange = async (product: any, change: number) => {
        if (change > 0) {
            await addItem(product, 1);
        } else {
            await removeItem(product.id_producto || product.id);
        }
    };

    const handleCheckout = async () => {
        try {
            setIsProcessing(true);
            await checkout(paymentMethod);
            if (isMountedRef.current) {
                setModalState({
                    isOpen: true,
                    type: 'success',
                    title: '¡Pedido Recibido!',
                    message: 'Tu pedido ha sido procesado exitosamente y pronto estará en camino.',
                    imageSrc: '/static/images/RemGracias.gif'
                });
            }
        } catch (error) {
            console.error('Error processing checkout:', error);
            if (isMountedRef.current) {
                setModalState({
                    isOpen: true,
                    type: 'error',
                    title: 'Error de Pago',
                    message: 'Hubo un error al procesar tu pago. Por favor verifica tu conexión o intenta más tarde.',
                });
            }
        } finally {
            if (isMountedRef.current) {
                setIsProcessing(false);
            }
        }
    };

    const handleCloseModal = () => {
        const wasSuccess = modalState.type === 'success';
        setModalState(prev => ({ ...prev, isOpen: false }));

        // Usar setTimeout para asegurar que el modal se cierre antes de navegar
        if (wasSuccess) {
            setTimeout(() => {
                if (isMountedRef.current) {
                    navigate('/');
                }
            }, 100);
        }
    };

    if (items.length === 0 && !modalState.isOpen) {
        return (
            <div className="min-h-screen bg-black text-white">
                <Header />
                <div className="container mx-auto px-4 py-12 text-center">
                    <h2 className="text-3xl font-bold text-[#FFC72C] mb-4">Tu carrito está vacío</h2>
                    <p className="text-gray-300 mb-8">Agrega algunas deliciosas hamburguesas para continuar.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-[#DA291C] text-white px-8 py-3 rounded-full font-bold hover:bg-[#b91c1c] transition"
                    >
                        Volver al Menú
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url('/images/bg-texture.jpg')" }}>
            <Header />

            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="flex items-center mb-10 gap-4">
                    <button onClick={() => navigate('/')} className="bg-white/5 p-3 rounded-full text-[#FFC72C] hover:bg-[#FFC72C] hover:text-black transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <h1 className="text-4xl font-bold text-white font-oswald uppercase tracking-wide">Resumen <span className="text-[#FFC72C]">de Pedido</span></h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Order Items */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-xl backdrop-blur-md">
                            <h2 className="text-2xl font-bold text-[#FFC72C] mb-8 flex items-center gap-3 font-oswald uppercase border-b border-white/10 pb-4">
                                <span className="bg-[#FFC72C]/10 p-2 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </span>
                                Tus Productos
                            </h2>

                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors group">
                                        <div className="flex items-center gap-6 w-full sm:w-auto">
                                            <div className="w-20 h-20 bg-black/50 rounded-xl overflow-hidden shadow-lg border border-white/10">
                                                {item.producto?.foto || item.producto?.imagen ? (
                                                    <img
                                                        src={item.producto?.foto || item.producto?.imagen}
                                                        alt={item.producto?.nombre_producto}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-[#FFC72C]">
                                                        <span className="text-black font-bold text-xs uppercase">Burger</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-xl text-white font-oswald uppercase tracking-wide">{item.producto?.nombre_producto}</h3>
                                                <p className="text-[#FFC72C] font-bold text-lg">${Number(item.precio_unitario).toFixed(2)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 bg-black/40 rounded-full px-4 py-2 mt-4 sm:mt-0 border border-white/5">
                                            <button
                                                onClick={() => handleQuantityChange(item.producto, -1)}
                                                className="text-gray-400 hover:text-white font-bold text-xl w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
                                                disabled={isLoading}
                                            >
                                                -
                                            </button>
                                            <span className="font-bold w-6 text-center text-lg">{item.cantidad}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.producto, 1)}
                                                className="text-[#FFC72C] hover:text-white font-bold text-xl w-8 h-8 flex items-center justify-center hover:bg-[#FFC72C] hover:text-black rounded-full transition-colors"
                                                disabled={isLoading}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment Method Selection */}
                        <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-xl backdrop-blur-md">
                            <h2 className="text-2xl font-bold text-[#FFC72C] mb-8 flex items-center gap-3 font-oswald uppercase border-b border-white/10 pb-4">
                                <span className="bg-[#FFC72C]/10 p-2 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </span>
                                Método de Pago
                            </h2>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <label className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden group ${paymentMethod === 'Tarjeta' ? 'bg-[#FFC72C]/10 border-[#FFC72C]' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                                    <div className={`absolute top-2 right-2 w-4 h-4 rounded-full border border-white flex items-center justify-center ${paymentMethod === 'Tarjeta' ? 'bg-[#FFC72C] border-[#FFC72C]' : 'bg-transparent'}`}>
                                        {paymentMethod === 'Tarjeta' && <div className="w-2 h-2 bg-black rounded-full"></div>}
                                    </div>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="Tarjeta"
                                        checked={paymentMethod === 'Tarjeta'}
                                        onChange={() => setPaymentMethod('Tarjeta')}
                                        className="hidden"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 mb-3 transition-colors ${paymentMethod === 'Tarjeta' ? 'text-[#FFC72C]' : 'text-gray-400 group-hover:text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    <span className={`font-bold text-lg font-oswald uppercase tracking-wide transition-colors ${paymentMethod === 'Tarjeta' ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>Tarjeta</span>
                                </label>

                                <label className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden group ${paymentMethod === 'Efectivo' ? 'bg-[#FFC72C]/10 border-[#FFC72C]' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                                    <div className={`absolute top-2 right-2 w-4 h-4 rounded-full border border-white flex items-center justify-center ${paymentMethod === 'Efectivo' ? 'bg-[#FFC72C] border-[#FFC72C]' : 'bg-transparent'}`}>
                                        {paymentMethod === 'Efectivo' && <div className="w-2 h-2 bg-black rounded-full"></div>}
                                    </div>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="Efectivo"
                                        checked={paymentMethod === 'Efectivo'}
                                        onChange={() => setPaymentMethod('Efectivo')}
                                        className="hidden"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 mb-3 transition-colors ${paymentMethod === 'Efectivo' ? 'text-[#FFC72C]' : 'text-gray-400 group-hover:text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className={`font-bold text-lg font-oswald uppercase tracking-wide transition-colors ${paymentMethod === 'Efectivo' ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>Efectivo</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="md:col-span-1">
                        <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-2xl backdrop-blur-md sticky top-28">
                            <h2 className="text-2xl font-bold text-[#FFC72C] mb-8 font-oswald uppercase tracking-wide text-center">Resumen de Pago</h2>

                            <div className="space-y-4 mb-8 text-gray-300">
                                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                                    <span className="text-sm uppercase tracking-wider font-bold text-gray-400">Subtotal</span>
                                    <span className="font-bold text-white text-lg">${getTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                                    <span className="text-sm uppercase tracking-wider font-bold text-gray-400">Envío</span>
                                    <span className="text-[#00FF00] font-bold text-sm bg-[#00FF00]/10 px-2 py-1 rounded-md uppercase tracking-wider">Gratis</span>
                                </div>

                                <div className="my-6 border-t-2 border-dashed border-white/10"></div>

                                <div className="flex justify-between items-center">
                                    <span className="text-white font-bold text-xl uppercase font-oswald">Total</span>
                                    <span className="text-[#FFC72C] font-extrabold text-4xl font-oswald drop-shadow-lg">${getTotal().toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={isProcessing || items.length === 0}
                                className="glow-button w-full bg-[#DA291C] text-white py-5 rounded-full font-bold text-xl hover:bg-[#b91c1c] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3 uppercase tracking-widest group shadow-lg shadow-red-900/40"
                            >
                                {isProcessing ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Procesando...
                                    </>
                                ) : (
                                    <>
                                        <span>Confirmar Pedido</span>
                                        <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </>
                                )}
                            </button>
                            <p className="text-gray-500 text-xs text-center mt-6">
                                Al confirmar, aceptas nuestros términos y condiciones.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <StatusModal
                isOpen={modalState.isOpen}
                onClose={handleCloseModal}
                type={modalState.type}
                title={modalState.title}
                message={modalState.message}
                imageSrc={modalState.imageSrc}
            />
        </div>
    );
};

export default CheckoutPage;
