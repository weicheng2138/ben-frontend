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
      <div className="h-svhh flex w-full flex-col items-center">
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

        <main className="mt-1 flex w-full max-w-3xl flex-col gap-4 px-6">
          <h1 className="mb-2 text-center text-xl font-extrabold md:mb-4 md:text-5xl">
            Vite
          </h1>
          <section className="flex w-full items-center justify-start gap-2">
            <h2 className="text-nowrap text-sm font-black">步驟一</h2>
            <p className="text-sm font-light">
              請將影片檔案拖曳至虛線方框內，或是點選「上傳影片檔案」。
            </p>
          </section>
          <CustomUpload
            isUploading={isUploading}
            onUpload={handleUpload}
            className="h-[30svh]"
          />
          <section className="mt-4 flex w-full items-center justify-start gap-2">
            <h2 className="text-nowrap text-sm font-black">步驟二</h2>
            <p className="text-sm font-light">下載影片。</p>
          </section>
          <ScrollResult className="h-[30svh]" ref={resultRef} />
        </main>
      </div>

      <Toaster />
    </ThemeProvider>
  );
}

export default App;
