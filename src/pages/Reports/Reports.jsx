import { useState } from 'react';
import './Reports.css';

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState('sales');
  const [dateRange, setDateRange] = useState('week');

  const reports = [
    {
      id: 'sales',
      name: 'Relatório de Vendas',
      icon: '💰',
      description: 'Análise detalhada de vendas e receita',
      metrics: ['Receita Total', 'Ticket Médio', 'Vendas por Período', 'Produtos Mais Vendidos']
    },
    {
      id: 'inventory',
      name: 'Relatório de Estoque',
      icon: '📦',
      description: 'Controle de inventário e movimentações',
      metrics: ['Produtos em Estoque', 'Estoque Baixo', 'Movimentações', 'Valor do Estoque']
    },
    {
      id: 'customers',
      name: 'Relatório de Clientes',
      icon: '👥',
      description: 'Análise de comportamento e preferências',
      metrics: ['Total de Clientes', 'Clientes Frequentes', 'Preferências', 'Satisfação']
    },
    {
      id: 'performance',
      name: 'Relatório de Performance',
      icon: '📊',
      description: 'Métricas de operação e eficiência',
      metrics: ['Tempo de Preparo', 'Ocupação de Mesas', 'Produtividade', 'Qualidade']
    }
  ];

  const getReportData = (reportId) => {
    // Dados simulados para cada relatório
    const data = {
      sales: {
        totalRevenue: 'R$ 12.450,80',
        averageTicket: 'R$ 89,65',
        topProducts: ['Hambúrguer Artesanal', 'Cerveja IPA', 'Pizza Margherita'],
        growth: '+15.3%'
      },
      inventory: {
        totalProducts: 156,
        lowStock: 12,
        totalValue: 'R$ 8.750,00',
        movements: 89
      },
      customers: {
        totalCustomers: 342,
        newCustomers: 28,
        repeatCustomers: 89,
        satisfaction: '4.8/5.0'
      },
      performance: {
        avgPrepTime: '18 min',
        tableOccupancy: '78%',
        efficiency: '92%',
        qualityScore: '4.9/5.0'
      }
    };
    return data[reportId] || {};
  };

  return (
    <div className="reports-page">
      <div className="page-header">
        <div className="page-title">
          <h1>Relatórios</h1>
          <p>Análises e insights para tomada de decisão</p>
        </div>
        <div className="header-actions">
          <select 
            className="date-range-select"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="today">Hoje</option>
            <option value="week">Esta Semana</option>
            <option value="month">Este Mês</option>
            <option value="quarter">Este Trimestre</option>
            <option value="year">Este Ano</option>
          </select>
          <button className="export-btn">📊 Exportar</button>
        </div>
      </div>

      <div className="reports-container">
        {/* Seleção de Relatórios */}
        <div className="reports-sidebar">
          <h3>Tipos de Relatório</h3>
          <div className="report-types">
            {reports.map((report) => (
              <button
                key={report.id}
                className={`report-type-btn ${selectedReport === report.id ? 'active' : ''}`}
                onClick={() => setSelectedReport(report.id)}
              >
                <span className="report-icon">{report.icon}</span>
                <div className="report-info">
                  <span className="report-name">{report.name}</span>
                  <span className="report-description">{report.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo do Relatório */}
        <div className="report-content">
          <div className="report-header">
            <h2>{reports.find(r => r.id === selectedReport)?.name}</h2>
            <p>Período: {dateRange === 'today' ? 'Hoje' : 
                         dateRange === 'week' ? 'Esta Semana' : 
                         dateRange === 'month' ? 'Este Mês' : 
                         dateRange === 'quarter' ? 'Este Trimestre' : 'Este Ano'}</p>
          </div>

          {/* Métricas Principais */}
          <div className="metrics-grid">
            {(() => {
              const data = getReportData(selectedReport);
              const currentReport = reports.find(r => r.id === selectedReport);
              
              return currentReport.metrics.map((metric, index) => {
                let value = '';
                let icon = '';
                let color = '';
                
                switch (selectedReport) {
                  case 'sales':
                    if (index === 0) { value = data.totalRevenue; icon = '💰'; color = '#059669'; }
                    else if (index === 1) { value = data.averageTicket; icon = '📈'; color = '#3b82f6'; }
                    else if (index === 2) { value = data.growth; icon = '📊'; color = '#10b981'; }
                    else { value = 'Ver Detalhes'; icon = '🍽️'; color = '#8b5cf6'; }
                    break;
                  case 'inventory':
                    if (index === 0) { value = data.totalProducts; icon = '📦'; color = '#3b82f6'; }
                    else if (index === 1) { value = data.lowStock; icon = '⚠️'; color = '#ef4444'; }
                    else if (index === 2) { value = data.movements; icon = '🔄'; color = '#f59e0b'; }
                    else { value = data.totalValue; icon = '💰'; color = '#059669'; }
                    break;
                  case 'customers':
                    if (index === 0) { value = data.totalCustomers; icon = '👥'; color = '#3b82f6'; }
                    else if (index === 1) { value = data.newCustomers; icon = '🆕'; color = '#10b981'; }
                    else if (index === 2) { value = data.repeatCustomers; icon = '🔄'; color = '#f59e0b'; }
                    else { value = data.satisfaction; icon = '⭐'; color = '#8b5cf6'; }
                    break;
                  case 'performance':
                    if (index === 0) { value = data.avgPrepTime; icon = '⏱️'; color = '#3b82f6'; }
                    else if (index === 1) { value = data.tableOccupancy; icon = '🍽️'; color = '#10b981'; }
                    else if (index === 2) { value = data.efficiency; icon = '📊'; color = '#f59e0b'; }
                    else { value = data.qualityScore; icon = '⭐'; color = '#8b5cf6'; }
                    break;
                }
                
                return (
                  <div key={index} className="metric-card">
                    <div className="metric-icon" style={{ color }}>{icon}</div>
                    <div className="metric-content">
                      <h4>{metric}</h4>
                      <span className="metric-value">{value}</span>
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          {/* Gráficos e Tabelas */}
          <div className="report-details">
            <div className="chart-section">
              <h3>Gráfico de Tendências</h3>
              <div className="chart-placeholder">
                <div className="chart-content">
                  <span className="chart-icon">📈</span>
                  <p>Gráfico interativo será exibido aqui</p>
                  <small>Dados do período selecionado</small>
                </div>
              </div>
            </div>

            <div className="table-section">
              <h3>Dados Detalhados</h3>
              <div className="table-placeholder">
                <div className="table-content">
                  <span className="table-icon">📋</span>
                  <p>Tabela de dados será exibida aqui</p>
                  <small>Informações detalhadas do relatório</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
