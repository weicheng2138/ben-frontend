import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';
import CustomUpload from '@/components/custom-upload';
import useIsTop from '@/hooks/useIsTop';
import { toast } from 'sonner';

function App() {
  const isTop = useIsTop();

  const handleUpload = (url: string) => {
    console.log(url);
    toast.success('上傳成功');
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <header
          className={cn(
            'sticky top-0 flex h-16 items-center justify-center backdrop-blur',
            !isTop && 'border-b border-zinc-200 dark:border-zinc-800',
          )}
        >
          <nav className="flex w-full max-w-3xl justify-end px-4">
            <ModeToggle />
          </nav>
        </header>
        <div className="flex flex-col items-center justify-center px-16 pb-16 pt-3">
          <h1 className="text-5xl font-extrabold">Vite</h1>
          <CustomUpload onUpload={handleUpload} />
        </div>
      </div>

      <Toaster />
    </ThemeProvider>
  );
}

export default App;
