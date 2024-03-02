import './App.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1>Vite + React</h1>
      <Button>YOYOYO</Button>
      <ModeToggle />
    </ThemeProvider>
  );
}

export default App;
