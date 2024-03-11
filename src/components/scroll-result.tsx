import { ScrollArea } from '@/components/ui/scroll-area';
import { forwardRef, useImperativeHandle } from 'react';
import useSWRMutation from 'swr/mutation';
import { toast } from 'sonner';

export type ScrollResultType = {
  triggerUpload: (file: File) => void;
};
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
  const { file } = arg;
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

const ScrollResult = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    async triggerUpload(file: File) {
      console.warn('triggerUpload');
      try {
        await trigger({ file });
        toast.success('影片處理完成');
      } catch (error) {
        toast.error('上傳失敗');
      }
    },
  }));

  const { data, error, trigger, isMutating } = useSWRMutation<
    Response,
    { detail: string },
    string,
    { file: File }
  >(`${API_URL}/uploadfile`, uploadFile);

  if (isMutating) {
    return <div>loading</div>;
  }
  if (error) {
    return <div className="text-red-500">ERROR</div>;
  }
  return (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </ScrollArea>
  );
});
export default ScrollResult;
