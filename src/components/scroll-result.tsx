import { ScrollArea } from '@/components/ui/scroll-area';
import { Fragment, forwardRef, useImperativeHandle } from 'react';
import useSWRMutation from 'swr/mutation';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type ScrollResultType = {
  triggerUpload: (file: File) => Promise<void>;
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

  // if (res.body) {
  //   const reader = res.body.getReader();
  //   const chunk = [];
  //   while (true) {
  //     const { done, value } = await reader.read();
  //     if (done) break;
  //     chunk.push(value);
  //     console.log(chunk);
  //   }
  // }

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return res.json();
}

const ScrollResult = forwardRef(
  (
    props: {
      className?: string;
    },
    ref,
  ) => {
    const { className } = props;
    useImperativeHandle(ref, () => ({
      async triggerUpload(file: File) {
        try {
          await trigger({ file });
          toast.success('影片處理完成', {
            position: 'top-left',
          });
          return Promise.resolve();
        } catch (error) {
          toast.error('上傳失敗', {
            position: 'top-left',
          });
          return Promise.reject();
        }
      },
    }));

    const handleDownload = (url: string) => {
      fetch(url)
        .then((resp) => resp.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.setAttribute('download', '');
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          link.remove();
        })
        .catch(() => toast.error('下載失敗'));
    };

    const { data, error, trigger, isMutating } = useSWRMutation<
      Response,
      { detail: string },
      string,
      { file: File }
    >(`${API_URL}/uploadfile`, uploadFile);

    if (isMutating) {
      return (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-md" />
              <div className="grow space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
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
      <ScrollArea className={cn('flex w-full justify-center pr-4', className)}>
        {data && data.length > 0 ? (
          data.map((item, i) => (
            <Fragment key={`${item.video}-${i}`}>
              <div className="flex w-full items-center justify-between gap-4">
                {/* <video */}
                {/*   className="h-32 w-48 rounded-md bg-white" */}
                {/*   src={`${API_URL}/resources/${item.video}`} */}
                {/*   controls */}
                {/* /> */}
                <div className="flex items-center gap-2 py-2">
                  <a
                    href={`${API_URL}/resources/${item.image}`}
                    target="_blank"
                  >
                    <img
                      className="h-16 w-16 rounded-md object-cover"
                      src={`${API_URL}/resources/${item.image}`}
                      alt="影片截圖"
                    />
                  </a>
                  <section className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold">
                      紅燈右轉
                      {i % 2 === 0 ? (
                        <Badge variant="secondary" className="ml-2">
                          可檢舉
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="ml-2">
                          不可檢舉
                        </Badge>
                      )}
                    </h3>
                    <span className="text-xs">00:03:45 - 00:04:17</span>
                    <span className="text-xs">50 MB</span>
                  </section>
                </div>
                {/* <Badge variant="outline">可檢舉</Badge> */}
                <Button
                  variant="outline"
                  className=""
                  onClick={() =>
                    handleDownload(`${API_URL}/resources/${item.video}`)
                  }
                >
                  下載
                </Button>
              </div>
              <Separator className="pr-4" />
            </Fragment>
          ))
        ) : (
          <div className="flex justify-center py-4">
            <p className="text-xl font-semibold text-gray-500">尚未上傳影片</p>
          </div>
        )}
      </ScrollArea>
    );
  },
);
export default ScrollResult;
