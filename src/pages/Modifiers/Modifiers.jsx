import { useState } from 'react';
import './Modifiers.css';

export default function Modifiers() {
  const [showModal, setShowModal] = useState(false);

  const modifiers = [
    {
      id: 1,
      name: 'Tamanho da Pizza',
      type: 'single',
      required: true,
      options: ['Pequena', 'Média', 'Grande'],
      products: 12,
      status: 'active'
    },
    {
      id: 2,
      name: 'Adicionais do Hambúrguer',
      type: 'multiple',
      required: false,
      options: ['Bacon', 'Queijo Extra', 'Cebola Caramelizada', 'Molho Especial'],
      products: 8,
      status: 'active'
    },
    {
      id: 3,
      name: 'Temperatura da Carne',
      type: 'single',
      required: true,
      options: ['Mal Passada', 'Ao Ponto', 'Bem Passada'],
      products: 5,
      status: 'active'
    }
  ];

  return (
    <div className="modifiers-page">
      <div className="page-header">
        <div className="page-title">
          <h1>Modificadores de Produtos</h1>
          <p>Personalize os produtos com opções e variações</p>
        </div>
        <button 
          className="add-modifier-btn"
          onClick={() => setShowModal(true)}
        >
          + NOVO MODIFICADOR
        </button>
      </div>

      <div className="modifiers-grid">
        {modifiers.map((modifier) => (
          <div key={modifier.id} className="modifier-card">
            <div className="modifier-header">
              <h3>{modifier.name}</h3>
              <span className={`status-badge ${modifier.status}`}>
                {modifier.status === 'active' ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            
            <div className="modifier-details">
              <div className="detail-item">
                <span className="label">Tipo:</span>
                <span className="value">{modifier.type === 'single' ? 'Única Escolha' : 'Múltipla Escolha'}</span>
              </div>
              
              <div className="detail-item">
                <span className="label">Obrigatório:</span>
                <span className="value">{modifier.required ? 'Sim' : 'Não'}</span>
              </div>
              
              <div className="detail-item">
                <span className="label">Opções:</span>
                <span className="value">{modifier.options.length}</span>
              </div>
              
              <div className="detail-item">
                <span className="label">Produtos:</span>
                <span className="value">{modifier.products}</span>
              </div>
            </div>
            
            <div className="modifier-options">
              <h4>Opções Disponíveis:</h4>
              <div className="options-list">
                {modifier.options.map((option, index) => (
                  <span key={index} className="option-tag">{option}</span>
                ))}
              </div>
            </div>
            
            <div className="modifier-actions">
              <button className="action-btn edit">Editar</button>
              <button className="action-btn delete">Excluir</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Novo Modificador</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Nome do Modificador</label>
                <input type="text" className="form-input" placeholder="Ex: Tamanho da Pizza" />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Tipo</label>
                  <select className="form-select">
                    <option value="single">Única Escolha</option>
                    <option value="multiple">Múltipla Escolha</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Obrigatório</label>
                  <select className="form-select">
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Opções</label>
                <textarea className="form-textarea" placeholder="Digite as opções, uma por linha"></textarea>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn-primary">Criar Modificador</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
