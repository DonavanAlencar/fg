import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Kitchen from '../pages/Kitchen/Kitchen';
import Menu from '../pages/Menu/Menu';
import Orders from '../pages/Orders/Orders';
import Stock from '../pages/Stock/Stock';
import Categories from '../pages/Categories/Categories';
import Ingredients from '../pages/Ingredients/Ingredients';
import Tables from '../pages/Tables/Tables';
import Products from '../pages/Products/Products';
import Modifiers from '../pages/Modifiers/Modifiers';
import Reports from '../pages/Reports/Reports';
import Commission from '../pages/Commission/Commission';

export default function RoutesIndex() {
  const { pathname } = useLocation();
  const lowerPath = pathname.toLowerCase();
  if (pathname !== lowerPath) {
    return <Navigate to={lowerPath} replace />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}> 
        <Route index element={<Dashboard />} />
        <Route path="kitchen" element={<Kitchen />} />
        <Route path="menu" element={<Menu />} />
        <Route path="tables" element={<Tables />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="stock" element={<Stock />} />
        <Route path="categories" element={<Categories />} />
        <Route path="modifiers" element={<Modifiers />} />
        <Route path="ingredients" element={<Ingredients />} />
        <Route path="reports" element={<Reports />} />
        <Route path="commission" element={<Commission />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
