import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../../theme/index.jsx';
import { 
  Grid3X3, 
  Utensils, 
  ChefHat, 
  Settings, 
  Users, 
  ClipboardList, 
  Package, 
  Tags, 
  Edit3, 
  Target, 
  BarChart3, 
  Trash2, 
  DollarSign,
  Sun,
  Moon,
  LogOut
} from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  const { pathname } = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [adminExpanded, setAdminExpanded] = useState(false);
  
  const menuItems = [
    { 
      to: '/', 
      label: 'Dashboard', 
      icon: <Grid3X3 size={20} />,
      active: pathname === '/'
    },
    { 
      to: '/menu', 
      label: 'Cardápio', 
      icon: <Utensils size={20} />,
      active: pathname === '/menu'
    },
    { 
      to: '/kitchen', 
      label: 'Cozinha', 
      icon: <ChefHat size={20} />,
      badge: 3,
      active: pathname === '/kitchen'
    },
    { 
      to: '/tables', 
      label: 'Mesas', 
      icon: <Users size={20} />,
      active: pathname === '/tables'
    },
    { 
      to: '/orders', 
      label: 'Pedidos (Admin)', 
      icon: <ClipboardList size={20} />,
      badge: 2,
      active: pathname === '/orders'
    },
    { 
      to: '/products', 
      label: 'Produtos', 
      icon: <Package size={20} />,
      active: pathname === '/products'
    },
    { 
      to: '/categories', 
      label: 'Categorias de Produtos', 
      icon: <Tags size={20} />,
      active: pathname === '/categories'
    },
    { 
      to: '/modifiers', 
      label: 'Modificadores de Produtos', 
      icon: <Edit3 size={20} />,
      active: pathname === '/modifiers'
    },
    { 
      to: '/ingredients', 
      label: 'Ingredientes', 
      icon: <Target size={20} />,
      active: pathname === '/ingredients'
    },
    { 
      to: '/reports', 
      label: 'Relatórios', 
      icon: <BarChart3 size={20} />,
      active: pathname === '/reports'
    },
    { 
      to: '/stock', 
      label: 'Movimentação de Estoque', 
      icon: <Trash2 size={20} />,
      active: pathname === '/stock'
    },
    { 
      to: '/commission', 
      label: 'Configuração de Comissão', 
      icon: <DollarSign size={20} />,
      active: pathname === '/commission'
    }
  ];

  const handleLogout = () => {
    // Implementar lógica de logout
    console.log('Logout realizado');
  };

  return (
    <aside className="sidebar">
      {/* Logo e Nome da Aplicação */}
      <div className="app-header">
        <div className="logo-container">
          <div className="logo-icon">
            <Utensils size={24} />
          </div>
          <div className="logo-text">
            <h1>RestaurantPro</h1>
            <p>Sistema de Gestão</p>
          </div>
        </div>
      </div>

      {/* Perfil do Usuário */}
      <div className="user-profile">
        <div className="user-avatar">CS</div>
        <div className="user-info">
          <h3>Carlos Silva</h3>
          <p>Manager</p>
        </div>
      </div>

      {/* Menu de Navegação */}
      <nav className="nav-menu">
        {menuItems.map((item) => (
          <Link 
            key={item.to} 
            to={item.to} 
            className={`nav-item ${item.active ? 'active' : ''}`}
          >
            <div className="nav-item-content">
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </div>
            {item.badge && (
              <span className="badge">{item.badge}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Separador */}
      <div className="sidebar-separator"></div>

      {/* Configurações e Utilitários */}
      <div className="sidebar-utilities">
        {/* Toggle de Tema */}
        <div className="theme-toggle">
          <Sun size={18} />
          <span>Tema</span>
          <Moon size={18} />
          <button 
            className={`theme-switch ${isDarkMode ? 'dark' : 'light'}`}
            onClick={toggleTheme}
          >
            <div className="switch-slider"></div>
          </button>
        </div>

        {/* Botão de Logout */}
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
