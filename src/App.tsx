import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';
import CustomUpload from '@/components/custom-upload';
import useIsTop from '@/hooks/useIsTop';
import ScrollResult, { ScrollResultType } from '@/components/scroll-result';
import { useRef, useState } from 'react';

function App() {
  console.log('render App');
  const isTop = useIsTop();
  const resultRef = useRef<ScrollResultType>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file: File) => {
    if (resultRef.current) {
      setIsUploading(true);
      try {
        await resultRef.current.triggerUpload(file);
        setIsUploading(false);
      } catch (error) {
        setIsUploading(false);
      }
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex w-full flex-col items-center">
        <header
          className={cn(
            'sticky top-0 flex h-16 w-full items-center justify-center backdrop-blur',
            !isTop && 'border-b border-zinc-200 dark:border-zinc-800',
          )}
        >
          <nav className="flex w-full max-w-3xl justify-end px-4">
            <ModeToggle />
          </nav>
        </header>

        <main className="flex w-full max-w-3xl flex-col gap-4 px-6 py-4">
          <div className="flex w-full max-w-3xl flex-col items-center justify-center">
            <h1 className="mb-4 text-5xl font-extrabold">Vite</h1>
            <CustomUpload isUploading={isUploading} onUpload={handleUpload} />
          </div>

          <ScrollResult ref={resultRef} />
        </main>
      </div>

      <Toaster />
    </ThemeProvider>
  );
}

export default App;
