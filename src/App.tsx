import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';
import CustomUpload from '@/components/custom-upload';
import useIsTop from '@/hooks/useIsTop';
import useSWRMutation from 'swr/mutation';
import { ScrollArea } from '@/components/ui/scroll-area';
import ScrollResult, { ScrollResultType } from '@/components/scroll-result';
import { useRef } from 'react';

function App() {
  console.log('render App');
  const isTop = useIsTop();
  const resultRef = useRef<ScrollResultType>(null);

  const handleUpload = async (file: File) => {
    if (resultRef.current) {
      resultRef.current.triggerUpload(file);
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
            <button
              onClick={async () => {
                // await handleError();
              }}
            >
              get
            </button>
          </nav>
        </header>

        <div className="flex w-full max-w-3xl flex-col items-center justify-center px-16 pb-16 pt-3">
          <h1 className="text-5xl font-extrabold">Vite</h1>
          <CustomUpload onUpload={handleUpload} />
        </div>

        <ScrollResult ref={resultRef} />
      </div>

      <Toaster />
    </ThemeProvider>
  );
}

export default App;
