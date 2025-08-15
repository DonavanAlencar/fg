import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const { pathname } = useLocation();
  
  // Mapear rotas para títulos das páginas
  const getPageTitle = () => {
    switch (pathname) {
      case '/': return 'Dashboard';
      case '/kitchen': return 'Cozinha';
      case '/menu': return 'Cardápio';
      case '/tables': return 'Mesas';
      case '/orders': return 'Pedidos (Admin)';
      case '/products': return 'Produtos';
      case '/categories': return 'Categorias de Produtos';
      case '/modifiers': return 'Modificadores de Produtos';
      case '/ingredients': return 'Ingredientes';
      case '/reports': return 'Relatórios';
      case '/stock': return 'Movimentação de Estoque';
      case '/commission': return 'Configuração de Comissão';
      default: return 'Dashboard';
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '280px' }}>
        <Header pageTitle={getPageTitle()} />
        <main style={{ 
          flex: 1, 
          padding: 24, 
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          transition: 'all 0.3s ease'
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
