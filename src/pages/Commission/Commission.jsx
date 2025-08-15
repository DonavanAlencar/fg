import { useState } from 'react';
import './Commission.css';

export default function Commission() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState(null);

  const commissionRules = [
    {
      id: 1,
      name: 'Comissão por Vendas',
      type: 'percentage',
      value: 5.0,
      minAmount: 1000,
      maxAmount: 5000,
      description: '5% sobre vendas mensais entre R$ 1.000 e R$ 5.000',
      status: 'active',
      employees: 8,
      lastUpdated: '01/01/2025'
    },
    {
      id: 2,
      name: 'Comissão por Produto',
      type: 'fixed',
      value: 2.50,
      minAmount: 0,
      maxAmount: 0,
      description: 'R$ 2,50 por produto vendido',
      status: 'active',
      employees: 12,
      lastUpdated: '15/12/2024'
    },
    {
      id: 3,
      name: 'Bônus por Performance',
      type: 'bonus',
      value: 150.00,
      minAmount: 0,
      maxAmount: 0,
      description: 'Bônus de R$ 150,00 para funcionários com avaliação 5 estrelas',
      status: 'inactive',
      employees: 5,
      lastUpdated: '20/12/2024'
    }
  ];

  const employees = [
    { id: 1, name: 'João Silva', role: 'Garçom', commission: 'R$ 245,80', performance: 4.8 },
    { id: 2, name: 'Maria Santos', role: 'Caixa', commission: 'R$ 189,50', performance: 4.9 },
    { id: 3, name: 'Carlos Oliveira', role: 'Cozinheiro', commission: 'R$ 312,00', performance: 4.7 },
    { id: 4, name: 'Ana Costa', role: 'Garçom', commission: 'R$ 198,30', performance: 4.6 }
  ];

  const getCommissionTypeInfo = (type) => {
    switch (type) {
      case 'percentage':
        return { label: 'Porcentagem', color: '#3b82f6', icon: '%' };
      case 'fixed':
        return { label: 'Valor Fixo', color: '#10b981', icon: 'R$' };
      case 'bonus':
        return { label: 'Bônus', color: '#f59e0b', icon: '🎁' };
      default:
        return { label: 'Desconhecido', color: '#6b7280', icon: '❓' };
    }
  };

  const getStatusInfo = (status) => {
    return status === 'active' 
      ? { label: 'Ativo', color: '#10b981', bgColor: '#d1fae5' }
      : { label: 'Inativo', color: '#6b7280', bgColor: '#f3f4f6' };
  };

  return (
    <div className="commission-page">
      <div className="page-header">
        <div className="page-title">
          <h1>Configuração de Comissão</h1>
          <p>Gerencie as regras de comissão e bonificações</p>
        </div>
        <button 
          className="add-commission-btn"
          onClick={() => setShowModal(true)}
        >
          + NOVA REGRA
        </button>
      </div>

      {/* Estatísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Total de Comissões</h3>
            <span className="stat-value">
              R$ {employees.reduce((sum, emp) => sum + parseFloat(emp.commission.replace('R$ ', '')), 0).toFixed(2)}
            </span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Funcionários Ativos</h3>
            <span className="stat-value">{employees.length}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>Regras de Comissão</h3>
            <span className="stat-value">{commissionRules.length}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>Performance Média</h3>
            <span className="stat-value">
              {(employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length).toFixed(1)}/5.0
            </span>
          </div>
        </div>
      </div>

      <div className="commission-content">
        {/* Regras de Comissão */}
        <div className="commission-rules-section">
          <div className="section-header">
            <h2>Regras de Comissão</h2>
            <p>Configure como as comissões são calculadas</p>
          </div>
          
          <div className="rules-grid">
            {commissionRules.map((rule) => {
              const typeInfo = getCommissionTypeInfo(rule.type);
              const statusInfo = getStatusInfo(rule.status);
              
              return (
                <div key={rule.id} className="rule-card">
                  <div className="rule-header">
                    <h3>{rule.name}</h3>
                    <span 
                      className="status-badge"
                      style={{ 
                        backgroundColor: statusInfo.bgColor,
                        color: statusInfo.color
                      }}
                    >
                      {statusInfo.label}
                    </span>
                  </div>
                  
                  <div className="rule-details">
                    <div className="rule-type">
                      <span className="type-icon" style={{ color: typeInfo.color }}>
                        {typeInfo.icon}
                      </span>
                      <span className="type-label">{typeInfo.label}</span>
                    </div>
                    
                    <div className="rule-value">
                      {rule.type === 'percentage' && <span className="value">{rule.value}%</span>}
                      {rule.type === 'fixed' && <span className="value">R$ {rule.value}</span>}
                      {rule.type === 'bonus' && <span className="value">R$ {rule.value}</span>}
                    </div>
                    
                    <p className="rule-description">{rule.description}</p>
                    
                    <div className="rule-meta">
                      <span className="meta-item">
                        <span className="meta-label">Funcionários:</span>
                        <span className="meta-value">{rule.employees}</span>
                      </span>
                      <span className="meta-item">
                        <span className="meta-label">Atualizado:</span>
                        <span className="meta-value">{rule.lastUpdated}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="rule-actions">
                    <button className="action-btn edit">Editar</button>
                    <button className="action-btn toggle">
                      {rule.status === 'active' ? 'Desativar' : 'Ativar'}
                    </button>
                    <button className="action-btn delete">Excluir</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Funcionários e Comissões */}
        <div className="employees-section">
          <div className="section-header">
            <h2>Comissões dos Funcionários</h2>
            <p>Resumo mensal de comissões por funcionário</p>
          </div>
          
          <div className="employees-table">
            <table>
              <thead>
                <tr>
                  <th>FUNCIONÁRIO</th>
                  <th>CARGO</th>
                  <th>COMISSÃO</th>
                  <th>PERFORMANCE</th>
                  <th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="employee-cell">
                      <div className="employee-info">
                        <div className="employee-avatar">{employee.name.charAt(0)}</div>
                        <span className="employee-name">{employee.name}</span>
                      </div>
                    </td>
                    <td>{employee.role}</td>
                    <td className="commission-value">{employee.commission}</td>
                    <td>
                      <div className="performance-rating">
                        <span className="rating-value">{employee.performance}</span>
                        <span className="rating-stars">⭐⭐⭐⭐⭐</span>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn view">👁️</button>
                        <button className="action-btn edit">✏️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de Nova Regra */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Nova Regra de Comissão</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Nome da Regra</label>
                <input type="text" className="form-input" placeholder="Ex: Comissão por Vendas" />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Tipo de Comissão</label>
                  <select className="form-select">
                    <option value="percentage">Porcentagem</option>
                    <option value="fixed">Valor Fixo</option>
                    <option value="bonus">Bônus</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Valor</label>
                  <input type="number" className="form-input" placeholder="0.00" step="0.01" />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Valor Mínimo</label>
                  <input type="number" className="form-input" placeholder="0.00" />
                </div>
                
                <div className="form-group">
                  <label>Valor Máximo</label>
                  <input type="number" className="form-input" placeholder="0.00" />
                </div>
              </div>
              
              <div className="form-group">
                <label>Descrição</label>
                <textarea className="form-textarea" placeholder="Descreva como a comissão funciona..."></textarea>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn-primary">Criar Regra</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
