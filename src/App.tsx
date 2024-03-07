import { ThemeProvider } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

function App() {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log('drag over');
  };
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div
        className="flex h-dvh items-center justify-center"
        onDragOver={handleDragOver}
      >
        <h1>Vite + React</h1>
        <Button>YOYOYO</Button>
        <ModeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;
