import RoutesIndex from './routes';
import { ThemeProvider } from './theme/index.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <RoutesIndex />
    </ThemeProvider>
  );
}
