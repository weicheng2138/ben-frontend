import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';
import CustomUpload from '@/components/custom-upload';
import useIsTop from '@/hooks/useIsTop';
import { toast } from 'sonner';
import useSWRMutation from 'swr/mutation';

const API_URL = import.meta.env.VITE_API_URL;

type Response = {
  hello: string;
};
async function uploadFile(
  url: string,
  {
    arg,
  }: {
    arg: {
      file: File;
    };
  },
) {
  console.log(arg);
  const { file } = arg;
  // return Promise.resolve({ hello: 'world' });
  // throw { detail: 'error' };
  // return Promise.reject({ detail: 'error' });
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return res.json();
}

function App() {
  console.log('render App');
  const isTop = useIsTop();

  const {
    data: dataApi,
    error,
    trigger,
    isMutating,
  } = useSWRMutation<Response, { detail: string }, string, { file: File }>(
    `${API_URL}/uploadfile`,
    uploadFile,
  );

  const handleUpload = async (file: File) => {
    try {
      await trigger({ file });
      toast.success('上傳成功');
    } catch (error) {
      toast.error('上傳失敗');
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
                // try {
                //   const res = await trigger('YOYO');
                //   console.log(res);
                // } catch (error) {
                //   console.log(error);
                // }
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
        {dataApi && <pre>{JSON.stringify(dataApi, null, 2)}</pre>}
        {error && (
          <pre className="text-red-400">{JSON.stringify(error, null, 2)}</pre>
        )}
        {isMutating ? <div>loading...</div> : null}
      </div>

      <Toaster />
    </ThemeProvider>
  );
}

export default App;
