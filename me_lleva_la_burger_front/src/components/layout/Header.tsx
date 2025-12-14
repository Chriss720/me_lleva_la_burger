import { useState, useEffect, useRef } from 'react';
import { useAuth, useCart } from '../../hooks';

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCartMenu, setShowCartMenu] = useState(false);
  const { getItemCount, items, getTotal, loadMyCart } = useCart();

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Cuando el usuario inicia sesiónUsuario, asegurarnos de cargar su carrito
    if (isAuthenticated) {
      loadMyCart().catch((e) => console.error('Error loading cart on auth change', e));
    }
  }, [isAuthenticated, loadMyCart]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
        setShowCartMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  console.log('User object in Header:', user); // For debugging

  const getUserName = () => {
    if (!user) return 'Acceder';

    const firstName = user.nombre_cliente || user.nombre;
    const lastName = user.apellido_cliente || user.apellido || '';

    if (firstName) {
      return `${firstName} ${lastName}`.trim();
    }

    return 'Usuario';
  };

  return (
    <header ref={headerRef} className="glass-card px-8 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/50">
      <a href="/" className="text-3xl md:text-4xl font-extrabold text-[#FFC72C] no-underline flex items-center gap-3 font-oswald tracking-wide hover:scale-105 transition-transform">
        <img src="/static/images/logo.png" alt="Logo" className="h-12 w-auto filter drop-shadow-[0_0_8px_rgba(255,199,44,0.5)]" />
        <span className="hidden md:block text-transparent bg-clip-text bg-gradient-to-r from-[#FFC72C] to-[#e0b000]">ME LLEVA LA BURGER</span>
      </a>

      <nav className="hidden md:block">
        <ul className="flex gap-8 list-none">
          {['Menú', 'Contacto', 'Ubicación'].map((item) => (
            <li key={item}>
              <a
                href={item === 'Menú' ? '/' : `/${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} // Simple normalization
                className="text-white text-lg font-bold font-oswald no-underline pb-1 hover:text-[#FFC72C] transition-colors relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFC72C] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-6 relative">
        {/* Carrito */}
        <button
          onClick={() => setShowCartMenu(!showCartMenu)}
          className="flex items-center gap-2 text-white hover:text-[#FFC72C] bg-transparent border-0 cursor-pointer transition-colors relative group"
        >
          <div className="p-2 rounded-full group-hover:bg-white/10 transition-colors">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </div>
          {((getItemCount ? getItemCount() : items.length) > 0) && (
            <span className="absolute -top-1 -right-1 bg-[#DA291C] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce shadow-lg shadow-red-900/50">
              {getItemCount ? getItemCount() : items.length}
            </span>
          )}
        </button>

        {/* Usuario */}
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-3 text-white bg-transparent border-0 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFC72C] to-[#DA291C] p-[2px]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-xs text-gray-400 font-light">Hola,</span>
            <span className="text-sm font-bold text-white group-hover:text-[#FFC72C] transition-colors">
              {isAuthenticated ? getUserName().split(' ')[0] : 'Acceder'}
            </span>
          </div>
        </button>
      </div>

      {/* User Menu Dropdown */}
      {showUserMenu && isAuthenticated && user && (
        <div className="glass-card rounded-2xl p-6 shadow-2xl w-72 absolute top-24 right-4 z-50 flex flex-col gap-4 animate-fade-in border border-white/10 bg-black/80">
          <div className="flex items-center gap-4 border-b border-white/10 pb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FFC72C] to-[#DA291C] flex items-center justify-center text-xl font-bold text-black shadow-lg">
              {user.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <p className="font-bold text-lg text-white font-oswald">{getUserName()}</p>
              <p className="text-xs text-gray-400 truncate w-32">{user.correo_cliente || user.email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <a href="/profile" className="text-left w-full p-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-colors flex items-center gap-3 no-underline">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Mi Perfil
            </a>
            <a href="/mis-pedidos" className="text-left w-full p-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-colors flex items-center gap-3 no-underline">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Mis Pedidos
            </a>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-white/5 hover:bg-[#DA291C]/20 border border-white/10 hover:border-[#DA291C] text-white py-3 rounded-xl font-bold transition-all text-sm uppercase tracking-wider flex justify-center items-center gap-2 group"
          >
            <svg className="w-4 h-4 group-hover:text-[#DA291C] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Cerrar sesión
          </button>
        </div>
      )}

      {/* Login Link */}
      {!isAuthenticated && showUserMenu && (
        <div className="glass-card rounded-2xl p-4 shadow-2xl w-64 absolute top-24 right-4 z-50 flex flex-col gap-2 animate-fade-in border border-white/10 bg-black/80">
          <a href="/login" className="text-white text-center font-bold font-oswald hover:bg-[#FFC72C] hover:text-black py-3 rounded-xl transition-all">
            INICIAR SESIÓN
          </a>
          <a href="/register" className="text-gray-300 text-center text-sm hover:text-white py-2 transition-colors">
            ¿No tienes cuenta? <span className="text-[#FFC72C] underline">Regístrate</span>
          </a>
        </div>
      )}

      {/* Cart Menu Dropdown */}
      {showCartMenu && (
        <div className="glass-card rounded-2xl p-6 shadow-2xl w-96 max-h-[500px] overflow-y-auto absolute top-24 right-4 md:right-24 z-50 flex flex-col animate-fade-in border border-white/10 bg-black/90">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
            <h3 className="font-bold text-xl text-white font-oswald tracking-wide">MI PEDIDO</h3>
            <span className="bg-[#FFC72C] text-black text-xs font-bold px-2 py-1 rounded-md">{items.length} ITEMS</span>
          </div>

          <div className="space-y-4 mb-6 flex-grow overflow-y-auto pr-2 custom-scrollbar">
            {items && items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors group">
                  <div className="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center p-1">
                    {item.producto?.imagen ? <img src={item.producto.imagen} alt="" className="w-full h-full object-contain" /> : <div className="w-4 h-4 bg-[#FFC72C] rounded-full"></div>}
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold text-white leading-tight">{item.producto?.nombre_producto || 'Producto'}</p>
                    <p className="text-xs text-gray-400 mt-1">Cant: <span className="text-[#FFC72C]">{item.cantidad}</span></p>
                  </div>
                  <div className="text-[#DA291C] font-bold font-oswald text-lg">${((item.cantidad || 1) * (item.precio_unitario || item.producto?.precio || 0)).toFixed(2)}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 opacity-50 flex flex-col items-center">
                <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                <p className="text-gray-400">Tu carrito está esperando...</p>
              </div>
            )}
          </div>

          <div className="mt-auto pt-4 border-t border-white/10">
            <div className="flex justify-between items-end mb-6">
              <span className="text-gray-400 font-light">Total a pagar</span>
              <span className="text-[#FFC72C] font-bold text-3xl font-oswald">${getTotal().toFixed(2)}</span>
            </div>
            <button
              onClick={() => window.location.href = '/checkout'}
              className="glow-button w-full bg-[#DA291C] text-white py-4 rounded-xl font-bold hover:bg-[#ff1f1f] text-lg transition-all shadow-lg uppercase tracking-wider flex justify-center items-center gap-2"
            >
              <span>Procesar Pago</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
