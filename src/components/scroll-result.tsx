import { ScrollArea } from '@/components/ui/scroll-area';
import { forwardRef, useImperativeHandle } from 'react';
import useSWRMutation from 'swr/mutation';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export type ScrollResultType = {
  triggerUpload: (file: File) => void;
};
const API_URL = import.meta.env.VITE_API_URL;
type Response = {
  video: string;
  image: string;
}[];
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
    return (
      <div className="flex flex-col items-center gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (error) {
    return <div className="text-red-500">ERROR</div>;
  }
  return (
    <ScrollArea className="h-[400px] w-full rounded-md p-4">
      {data && data.length > 0 ? (
        data.map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <video
              className="h-32 w-48 rounded-md bg-white"
              src={`${API_URL}/resources/${item.video}`}
              controls
            />
            <div className="space-y-2">
              <img
                className="h-32 w-32 rounded-md"
                src={`${API_URL}/resources/${item.image}`}
                alt="影片截圖"
              />
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-500">尚未上傳影片</div>
      )}
    </ScrollArea>
  );
});
export default ScrollResult;
