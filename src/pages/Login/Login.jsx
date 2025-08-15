import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Hash, Eye, EyeOff } from 'lucide-react';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    pin: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (activeTab === 'email') {
      if (!formData.email.trim()) {
        newErrors.email = 'Email é obrigatório';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email inválido';
      }
      
      if (!formData.password.trim()) {
        newErrors.password = 'Senha é obrigatória';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
      }
    } else {
      if (!formData.pin.trim()) {
        newErrors.pin = 'PIN é obrigatório';
      } else if (formData.pin.length < 4) {
        newErrors.pin = 'PIN deve ter pelo menos 4 dígitos';
      }
      
      if (!formData.password.trim()) {
        newErrors.password = 'Senha é obrigatória';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simular delay de login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aqui você pode adicionar sua lógica de autenticação
      // Por enquanto, apenas navega para o dashboard
      navigate('/');
    } catch (error) {
      console.error('Erro no login:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'admin@restaurant.com',
      pin: '',
      password: 'admin123'
    });
    setActiveTab('email');
    setErrors({});
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="logo-container">
          <div className="logo-icon">
            <div className="fork-knife">🍴</div>
          </div>
          <h1>RestaurantPro</h1>
          <p>Sistema de Gerenciamento</p>
        </div>
      </div>

      <div className="login-card">
        <div className="card-header">
          <h2>Fazer Login</h2>
          <p>Acesse sua conta para gerenciar o restaurante</p>
        </div>

        <div className="tab-container">
          <button
            className={`tab-button ${activeTab === 'email' ? 'active' : ''}`}
            onClick={() => setActiveTab('email')}
          >
            <Mail size={18} />
            Email
          </button>
          <button
            className={`tab-button ${activeTab === 'pin' ? 'active' : ''}`}
            onClick={() => setActiveTab('pin')}
          >
            <Hash size={18} />
            PIN
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {activeTab === 'email' ? (
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && (
                  <div className="error-indicator" title={errors.email}>
                    <div className="error-dots"></div>
                  </div>
                )}
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="pin">PIN</label>
              <div className="input-container">
                <input
                  id="pin"
                  type="text"
                  placeholder="Digite seu PIN"
                  value={formData.pin}
                  onChange={(e) => handleInputChange('pin', e.target.value)}
                  className={errors.pin ? 'error' : ''}
                  maxLength="6"
                />
                {errors.pin && (
                  <div className="error-indicator" title={errors.pin}>
                    <div className="error-dots"></div>
                  </div>
                )}
              </div>
              {errors.pin && <span className="error-message">{errors.pin}</span>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <div className="input-container">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && (
                <div className="error-indicator" title={errors.password}>
                  <div className="error-dots"></div>
                </div>
              )}
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="demo-info">
            <span>Demo: admin@restaurant.com / admin123</span>
            <button type="button" className="demo-button" onClick={handleDemoLogin}>
              Usar Demo
            </button>
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
