import Button from '../../components/UI/Button';
import { TextField, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    navigate('/');
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f5f5f5' }}>
      <Paper style={{ padding: 32, maxWidth: 360 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TextField label="Email" required />
          <TextField label="Senha" type="password" required />
          <Button type="submit">Entrar</Button>
        </form>
      </Paper>
    </div>
  );
}
