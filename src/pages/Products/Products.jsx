import { useState } from 'react';
import './Products.css';

export default function Products() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas as Categorias');

  const products = [
    {
      id: 1,
      name: 'Hambúrguer Artesanal',
      sku: 'PROD001',
      category: 'Pratos Principais',
      price: 'R$ 45.90',
      cost: 'R$ 18.90',
      stock: 25,
      minStock: 10,
      status: 'active',
      supplier: 'Fornecedor A',
      lastUpdated: '06/01/2025'
    },
    {
      id: 2,
      name: 'Cerveja Artesanal IPA',
      sku: 'PROD002',
      category: 'Bebidas',
      price: 'R$ 18.90',
      cost: 'R$ 6.50',
      stock: 8,
      minStock: 15,
      status: 'active',
      supplier: 'Fornecedor B',
      lastUpdated: '03/01/2025'
    },
    {
      id: 3,
      name: 'Queijo Brie',
      sku: 'PROD003',
      category: 'Ingredientes',
      price: 'R$ 28.50',
      cost: 'R$ 22.00',
      stock: 12,
      minStock: 8,
      status: 'active',
      supplier: 'Fornecedor C',
      lastUpdated: '05/01/2025'
    },
    {
      id: 4,
      name: 'Tomate Cereja',
      sku: 'PROD004',
      category: 'Ingredientes',
      price: 'R$ 15.90',
      cost: 'R$ 8.50',
      stock: 5,
      minStock: 10,
      status: 'inactive',
      supplier: 'Fornecedor D',
      lastUpdated: '04/01/2025'
    }
  ];

  const categories = ['Todas as Categorias', 'Pratos Principais', 'Bebidas', 'Ingredientes', 'Sobremesas'];

  const getStatusInfo = (status) => {
    switch (status) {
      case 'active':
        return { label: 'Ativo', color: '#10b981', bgColor: '#d1fae5' };
      case 'inactive':
        return { label: 'Inativo', color: '#6b7280', bgColor: '#f3f4f6' };
      default:
        return { label: 'Desconhecido', color: '#6b7280', bgColor: '#f3f4f6' };
    }
  };

  const getStockStatus = (stock, minStock) => {
    if (stock <= minStock) {
      return { label: 'Estoque Baixo', color: '#ef4444', bgColor: '#fee2e2' };
    } else if (stock <= minStock * 1.5) {
      return { label: 'Atenção', color: '#f59e0b', bgColor: '#fef3c7' };
    } else {
      return { label: 'OK', color: '#10b981', bgColor: '#d1fae5' };
    }
  };

  return (
    <div className="products-page">
      {/* Header da Página */}
      <div className="page-header">
        <div className="page-title">
          <h1>Gestão de Produtos</h1>
          <p>Controle completo do inventário de produtos</p>
        </div>
        <button 
          className="add-product-btn"
          onClick={() => setShowModal(true)}
        >
          + NOVO PRODUTO
        </button>
      </div>

      {/* Estatísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>Total de Produtos</h3>
            <span className="stat-value">{products.length}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Ativos</h3>
            <span className="stat-value">{products.filter(p => p.status === 'active').length}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <h3>Estoque Baixo</h3>
            <span className="stat-value">{products.filter(p => p.stock <= p.minStock).length}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Valor Total</h3>
            <span className="stat-value">
              R$ {products
                .reduce((sum, p) => sum + (p.stock * parseFloat(p.cost.replace('R$ ', ''))), 0)
                .toFixed(2)
              }
            </span>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="filters-section">
        <div className="search-filter">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar por nome, SKU ou fornecedor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="category-filter">
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="filter-info">
          <span>{products.length} de {products.length} produtos</span>
          <button className="clear-filters">Limpar Filtros</button>
        </div>
      </div>

      {/* Tabela de Produtos */}
      <div className="products-table-section">
        <div className="section-header">
          <h2>Lista de Produtos</h2>
          <p>Todos os produtos cadastrados no sistema</p>
        </div>
        
        <div className="table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>PRODUTO</th>
                <th>SKU</th>
                <th>CATEGORIA</th>
                <th>PREÇO</th>
                <th>ESTOQUE</th>
                <th>STATUS</th>
                <th>FORNECEDOR</th>
                <th>ATUALIZADO</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const statusInfo = getStatusInfo(product.status);
                const stockStatus = getStockStatus(product.stock, product.minStock);
                
                return (
                  <tr key={product.id}>
                    <td className="product-cell">
                      <div className="product-info">
                        <div className="product-thumbnail">📦</div>
                        <div className="product-details">
                          <h4>{product.name}</h4>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="sku-code">{product.sku}</span>
                    </td>
                    <td>
                      <span className="category-tag">{product.category}</span>
                    </td>
                    <td className="price-cell">
                      <div className="price-info">
                        <span className="price">{product.price}</span>
                        <span className="cost">{product.cost}</span>
                      </div>
                    </td>
                    <td>
                      <div className="stock-info">
                        <span className="stock-quantity">{product.stock}</span>
                        <span 
                          className={`stock-status ${stockStatus.label.toLowerCase().replace(' ', '-')}`}
                          style={{ 
                            backgroundColor: stockStatus.bgColor,
                            color: stockStatus.color
                          }}
                        >
                          {stockStatus.label}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span 
                        className="status-badge"
                        style={{ 
                          backgroundColor: statusInfo.bgColor,
                          color: statusInfo.color
                        }}
                      >
                        {statusInfo.label}
                      </span>
                    </td>
                    <td>{product.supplier}</td>
                    <td>{product.lastUpdated}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn edit" title="Editar">✏️</button>
                        <button className="action-btn view" title="Visualizar">👁️</button>
                        <button className="action-btn delete" title="Excluir">🗑️</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Novo Produto */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Novo Produto</h2>
              <p>Adicione um novo produto ao inventário</p>
              <button 
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Nome do Produto</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="Ex: Hambúrguer Artesanal"
                  />
                </div>
                <div className="form-group">
                  <label>SKU</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="Ex: PROD001"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Categoria</label>
                  <select className="form-select">
                    <option>Selecione a categoria</option>
                    <option>Pratos Principais</option>
                    <option>Bebidas</option>
                    <option>Ingredientes</option>
                    <option>Sobremesas</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Fornecedor</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="Nome do fornecedor"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Preço de Venda</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="R$ 0,00"
                  />
                </div>
                <div className="form-group">
                  <label>Custo</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="R$ 0,00"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Estoque Inicial</label>
                  <input 
                    type="number" 
                    className="form-input"
                    placeholder="0"
                  />
                </div>
                <div className="form-group">
                  <label>Estoque Mínimo</label>
                  <input 
                    type="number" 
                    className="form-input"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Descrição</label>
                <textarea 
                  className="form-textarea"
                  placeholder="Descrição detalhada do produto..."
                ></textarea>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button className="btn-primary">
                Criar Produto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
