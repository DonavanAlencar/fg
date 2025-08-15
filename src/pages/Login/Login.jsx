import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Hash, Eye, EyeOff, HelpCircle } from 'lucide-react';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pin');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    pin: ['', '', '', ''],
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    if (field === 'pin') {
      setFormData(prev => ({ ...prev, pin: value }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePinDigit = (digit) => {
    const currentPin = [...formData.pin];
    const emptyIndex = currentPin.findIndex(pin => pin === '');
    
    if (emptyIndex !== -1) {
      currentPin[emptyIndex] = digit;
      setFormData(prev => ({ ...prev, pin: currentPin }));
      
      // Auto-focus next field
      if (emptyIndex < 3) {
        const nextInput = document.getElementById(`pin-${emptyIndex + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handlePinBackspace = () => {
    const currentPin = [...formData.pin];
    const lastFilledIndex = currentPin.map((pin, index) => pin !== '' ? index : -1).filter(index => index !== -1).pop();
    
    if (lastFilledIndex !== undefined) {
      currentPin[lastFilledIndex] = '';
      setFormData(prev => ({ ...prev, pin: currentPin }));
      
      // Focus the cleared field
      const input = document.getElementById(`pin-${lastFilledIndex}`);
      if (input) input.focus();
    }
  };

  const clearPin = () => {
    setFormData(prev => ({ ...prev, pin: ['', '', '', ''] }));
    // Focus first PIN field
    const firstInput = document.getElementById('pin-0');
    if (firstInput) firstInput.focus();
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
      const pinString = formData.pin.join('');
      if (pinString.length !== 4) {
        newErrors.pin = 'PIN deve ter 4 dígitos';
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
    if (activeTab === 'email') {
      setFormData({
        email: 'admin@restaurant.com',
        pin: ['', '', '', ''],
        password: 'admin123'
      });
    } else {
      setFormData({
        email: '',
        pin: ['1', '2', '3', '4'],
        password: 'admin123'
      });
    }
    setErrors({});
  };

  const handlePinInputChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...formData.pin];
      newPin[index] = value;
      setFormData(prev => ({ ...prev, pin: newPin }));
      
      // Auto-focus next field if digit entered
      if (value && index < 3) {
        const nextInput = document.getElementById(`pin-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
      
      // Clear error
      if (errors.pin) {
        setErrors(prev => ({ ...prev, pin: '' }));
      }
    }
  };

  const handlePinKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !formData.pin[index] && index > 0) {
      // Move to previous field on backspace if current is empty
      const prevInput = document.getElementById(`pin-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
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
              <label htmlFor="pin">PIN de Acesso</label>
              <div className="pin-container">
                {formData.pin.map((digit, index) => (
                  <input
                    key={index}
                    id={`pin-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handlePinInputChange(index, e.target.value)}
                    onKeyDown={(e) => handlePinKeyDown(index, e)}
                    className={errors.pin ? 'error' : ''}
                    placeholder=""
                  />
                ))}
              </div>
              {errors.pin && <span className="error-message">{errors.pin}</span>}
              
              <div className="keypad">
                <div className="keypad-row">
                  <button type="button" className="keypad-btn" onClick={() => handlePinDigit('1')}>1</button>
                  <button type="button" className="keypad-btn" onClick={() => handlePinDigit('2')}>2</button>
                  <button type="button" className="keypad-btn" onClick={() => handlePinDigit('3')}>3</button>
                </div>
                <div className="keypad-row">
                  <button type="button" className="keypad-btn" onClick={() => handlePinDigit('4')}>4</button>
                  <button type="button" className="keypad-btn" onClick={() => handlePinDigit('5')}>5</button>
                  <button type="button" className="keypad-btn" onClick={() => handlePinDigit('6')}>6</button>
                </div>
                <div className="keypad-row">
                  <button type="button" className="keypad-btn" onClick={() => handlePinDigit('7')}>7</button>
                  <button type="button" className="keypad-btn" onClick={() => handlePinDigit('8')}>8</button>
                  <button type="button" className="keypad-btn" onClick={() => handlePinDigit('9')}>9</button>
                </div>
                <div className="keypad-row">
                  <button type="button" className="keypad-btn clear-btn" onClick={clearPin}>Limpar</button>
                  <button type="button" className="keypad-btn" onClick={() => handlePinDigit('0')}>0</button>
                  <button type="button" className="keypad-btn visibility-btn" onClick={() => setShowPassword(!showPassword)}>
                    <Eye size={18} />
                  </button>
                </div>
              </div>
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
            <span>
              {activeTab === 'email' 
                ? 'Demo: admin@restaurant.com / admin123'
                : 'Demo: PIN 1234'
              }
            </span>
            <button type="button" className="demo-button" onClick={handleDemoLogin}>
              Usar Demo
            </button>
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Entrando...' : activeTab === 'pin' ? 'Entrar com PIN' : 'Entrar'}
          </button>
        </form>
      </div>

      <button className="help-button" title="Ajuda">
        <HelpCircle size={20} />
      </button>
    </div>
  );
}
