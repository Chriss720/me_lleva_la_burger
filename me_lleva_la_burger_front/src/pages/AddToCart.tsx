import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useProduct } from '../hooks/useProducts';
import { Layout } from '../components/layout/Layout';

export const AddToCart = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addItem, isAdding, loadMyCart } = useCart();
  const { product, isLoading, error } = useProduct(Number(productId));
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    loadMyCart().catch(() => { });
  }, [isAuthenticated, navigate, loadMyCart]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    try {
      await addItem(product, quantity);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <Layout>
      <div className="min-h-screen bg-black flex flex-col bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url('/images/bg-texture.jpg')" }}>
        <div className="max-w-4xl mx-auto px-4 py-8 w-full flex-grow flex items-center justify-center">

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FFC72C] mx-auto mb-6 shadow-[0_0_15px_rgba(255,199,44,0.3)]"></div>
              <p className="text-gray-400 text-lg animate-pulse">Cargando producto...</p>
            </div>
          ) : error ? (
            <div className="glass-card border-l-4 border-red-600 text-white p-8 rounded-2xl text-center max-w-lg mx-auto">
              <h3 className="text-2xl font-bold mb-2 font-oswald text-[#DA291C]">Error</h3>
              <p>{error}</p>
            </div>
          ) : product ? (
            <div className="glass-card rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row w-full animate-fade-in border border-white/10 backdrop-blur-md">
              <div className="md:w-1/2 h-80 md:h-auto bg-gray-900/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                {product.imagen ? (
                  <img
                    src={product.imagen}
                    alt={product.nombre_producto}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 flex-col gap-4">
                    <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="text-sm uppercase tracking-widest font-bold opacity-40">Sin Imagen</span>
                  </div>
                )}
                {/* Categoría Badge */}
                {product.categoria && (
                  <div className="absolute top-4 left-4 z-20 bg-[#FFC72C] text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
                    {product.categoria}
                  </div>
                )}
              </div>

              <div className="p-8 md:p-10 md:w-1/2 flex flex-col justify-between relative">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC72C]/10 rounded-full blur-3xl -z-10"></div>

                <div>
                  <h2 className="text-sm font-bold text-[#FFC72C] uppercase tracking-widest mb-2 font-oswald opacity-80">Personalizar Pedido</h2>
                  <h3 className="text-4xl text-white font-bold font-oswald mb-4 uppercase leading-none">{product.nombre_producto}</h3>
                  <div className="w-16 h-1 bg-[#DA291C] mb-6 rounded-full"></div>

                  <p className="text-gray-300 mb-8 leading-relaxed font-light text-lg">{product.descripcion}</p>

                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-5xl font-bold text-[#FFC72C] font-oswald drop-shadow-lg">${product.precio}</span>
                    <span className="text-gray-400 font-light">mxn</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <label className="block text-gray-400 text-xs uppercase tracking-widest font-bold mb-4">Cantidad</label>
                    <div className="flex items-center gap-6">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-[#FFC72C] hover:text-[#FFC72C] font-bold text-xl transition-all active:scale-95 flex items-center justify-center"
                      >
                        -
                      </button>
                      <div className="w-24 h-12 flex items-center justify-center bg-white/5 rounded-full border border-white/10">
                        <input
                          type="number"
                          min={1}
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                          className="w-full text-center bg-transparent text-2xl font-bold text-white focus:outline-none font-oswald"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-[#FFC72C] hover:text-[#FFC72C] font-bold text-xl transition-all active:scale-95 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isAdding}
                    className="glow-button w-full bg-[#DA291C] text-white py-5 rounded-full font-bold text-xl hover:bg-[#b91c1c] transition-all uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed group flex justify-center items-center gap-3"
                  >
                    <span>{isAdding ? 'Agregando...' : 'Agregar al Pedido'}</span>
                    {!isAdding && (
                      <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    )}
                  </button>
                </form>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default AddToCart;
