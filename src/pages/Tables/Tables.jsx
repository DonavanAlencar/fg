import { useState } from 'react';
import './Tables.css';

export default function Tables() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const tables = [
    { id: 1, number: 1, status: 'occupied', capacity: 4, currentOrder: 'M1', time: '45 min', total: 'R$ 87.80' },
    { id: 2, number: 2, status: 'occupied', capacity: 6, currentOrder: 'M2', time: '32 min', total: 'R$ 172.60' },
    { id: 3, number: 3, status: 'available', capacity: 4, currentOrder: null, time: null, total: null },
    { id: 4, number: 4, status: 'payment', capacity: 2, currentOrder: 'M3', time: '15 min', total: 'R$ 74.80' },
    { id: 5, number: 5, status: 'reserved', capacity: 8, currentOrder: null, time: null, total: null, reservation: '20:30' },
    { id: 6, number: 6, status: 'available', capacity: 4, currentOrder: null, time: null, total: null }
  ];

  const getStatusInfo = (status) => {
    switch (status) {
      case 'occupied':
        return { label: 'Ocupada', color: '#3b82f6', icon: '👥' };
      case 'available':
        return { label: 'Disponível', color: '#10b981', icon: '✅' };
      case 'payment':
        return { label: 'Aguarda Pagto', color: '#ef4444', icon: '💰' };
      case 'reserved':
        return { label: 'Reservada', color: '#f59e0b', icon: '📅' };
      default:
        return { label: 'Desconhecido', color: '#6b7280', icon: '❓' };
    }
  };

  const handleTableClick = (table) => {
    setSelectedTable(table);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTable(null);
  };

  return (
    <div className="tables-page">
      {/* Header da Página */}
      <div className="page-header">
        <div className="page-title">
          <h1>Gestão de Mesas</h1>
          <p>Controle de ocupação e status das mesas</p>
        </div>
        <button className="add-table-btn">+ NOVA MESA</button>
      </div>

      {/* Estatísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🍽️</div>
          <div className="stat-content">
            <h3>Total de Mesas</h3>
            <span className="stat-value">{tables.length}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Ocupadas</h3>
            <span className="stat-value">{tables.filter(t => t.status === 'occupied').length}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Disponíveis</h3>
            <span className="stat-value">{tables.filter(t => t.status === 'available').length}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Faturamento Atual</h3>
            <span className="stat-value">
              R$ {tables
                .filter(t => t.total)
                .reduce((sum, t) => sum + parseFloat(t.total.replace('R$ ', '')), 0)
                .toFixed(2)
              }
            </span>
          </div>
        </div>
      </div>

      {/* Grid de Mesas */}
      <div className="tables-section">
        <div className="section-header">
          <h2>Status das Mesas</h2>
          <p>Visualização em tempo real da ocupação</p>
        </div>

        <div className="tables-grid">
          {tables.map((table) => {
            const statusInfo = getStatusInfo(table.status);
            return (
              <div 
                key={table.id} 
                className={`table-card ${table.status}`}
                onClick={() => handleTableClick(table)}
              >
                <div className="table-header">
                  <span className="table-number">Mesa {table.number}</span>
                  <span 
                    className="table-status"
                    style={{ backgroundColor: statusInfo.color }}
                  >
                    {statusInfo.icon} {statusInfo.label}
                  </span>
                </div>
                
                <div className="table-details">
                  <div className="table-capacity">
                    <span className="capacity-icon">👥</span>
                    Capacidade: {table.capacity} pessoas
                  </div>
                  
                  {table.currentOrder && (
                    <>
                      <div className="table-order">
                        <span className="order-icon">📋</span>
                        Pedido: {table.currentOrder}
                      </div>
                      <div className="table-time">
                        <span className="time-icon">⏱️</span>
                        {table.time}
                      </div>
                      <div className="table-total">
                        <span className="total-icon">💰</span>
                        {table.total}
                      </div>
                    </>
                  )}
                  
                  {table.reservation && (
                    <div className="table-reservation">
                      <span className="reservation-icon">📅</span>
                      Reserva: {table.reservation}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de Detalhes da Mesa */}
      {showModal && selectedTable && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Mesa {selectedTable.number}</h2>
              <button className="close-btn" onClick={handleCloseModal}>✕</button>
            </div>
            
            <div className="modal-body">
              <div className="table-info-grid">
                <div className="info-item">
                  <label>Status:</label>
                  <span className={`status-badge ${selectedTable.status}`}>
                    {getStatusInfo(selectedTable.status).label}
                  </span>
                </div>
                
                <div className="info-item">
                  <label>Capacidade:</label>
                  <span>{selectedTable.capacity} pessoas</span>
                </div>
                
                {selectedTable.currentOrder && (
                  <>
                    <div className="info-item">
                      <label>Pedido Atual:</label>
                      <span>{selectedTable.currentOrder}</span>
                    </div>
                    
                    <div className="info-item">
                      <label>Tempo de Ocupação:</label>
                      <span>{selectedTable.time}</span>
                    </div>
                    
                    <div className="info-item">
                      <label>Total:</label>
                      <span className="total-value">{selectedTable.total}</span>
                    </div>
                  </>
                )}
                
                {selectedTable.reservation && (
                  <div className="info-item">
                    <label>Reserva:</label>
                    <span>{selectedTable.reservation}</span>
                  </div>
                )}
              </div>
              
              <div className="table-actions">
                {selectedTable.status === 'occupied' && (
                  <button className="action-btn primary">Finalizar Pedido</button>
                )}
                {selectedTable.status === 'available' && (
                  <button className="action-btn primary">Abrir Pedido</button>
                )}
                {selectedTable.status === 'payment' && (
                  <button className="action-btn success">Processar Pagamento</button>
                )}
                <button className="action-btn secondary">Editar Mesa</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
