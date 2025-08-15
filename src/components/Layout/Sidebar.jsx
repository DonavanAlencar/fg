import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const { pathname } = useLocation();
  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/kitchen', label: 'Cozinha' },
    { to: '/menu', label: 'Cardápio' },
    { to: '/orders', label: 'Pedidos' },
    { to: '/stock', label: 'Estoque' },
    { to: '/categories', label: 'Categorias' },
    { to: '/ingredients', label: 'Ingredientes' }
  ];
  return (
    <aside className="sidebar">
      <h2 className="logo">RestaurantPro</h2>
      <nav>
        {links.map(l => (
          <Link key={l.to} to={l.to} className={pathname === l.to ? 'active' : ''}>
            {l.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
