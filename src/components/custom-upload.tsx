import { ChangeEvent, useCallback, useState, type ElementRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Button } from '@/components//ui/button';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

type CustomUploadProps = {
  onUpload: (file: File) => void;
  isUploading: boolean;
  className?: string;
};
const CustomUpload = ({
  onUpload,
  isUploading,
  className,
}: CustomUploadProps) => {
  const [progress, setProgress] = useState(0);
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(
    null,
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        toast.error('檔案格式不符!', {
          closeButton: true,
          description: `目前支援 MP4 與 MOV 格式的影片檔案`,
          position: 'top-left',
        });
        return;
      }
      if (acceptedFiles.length > 0) {
        if (
          acceptedFiles[0].type !== 'video/mp4' &&
          acceptedFiles[0].type !== 'video/quicktime'
        ) {
          toast.warning('檔案格式為：', {
            closeButton: true,
            description: `這是 ${acceptedFiles[0].type}，目前支援 MP4 格式的影片檔案`,
            position: 'top-left',
          });
          return;
        }
        // console.log(acceptedFiles);
        const selectedImage = acceptedFiles[0];
        onUpload(selectedImage);
      }
    },
    [onUpload],
  );

  // const handleChange = (event: ChangeEvent<ElementRef<'input'>>) => {
  //   console.log('handleChange');
  //   console.log(event.target.files);
  //   if (event.target.files?.length) {
  //     const selectedImage = event.target.files[0];
  //   }
  // };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: isUploading,
    accept: {
      // 'video/mp4': ['.mp4'],
      // 'video/quicktime': ['.mov'],
      // 'video/x-matroska': ['.mkv'],
      // 'video/x-ms-wmv': ['.wmv'],
      // 'video/x-msvideo': ['.avi'],
    },
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={cn('flex w-full items-center justify-center')}
      >
        <label
          htmlFor="dropzone-file"
          className={cn(
            'flex w-full cursor-pointer flex-col items-center justify-center gap-2 py-4',
            'rounded-lg border-2 border-dashed border-gray-500',
            'bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800',
            isDragActive ? 'bg-slate-100 dark:bg-slate-800' : '',
            isUploading ? 'cursor-not-allowed' : '',
            className,
          )}
        >
          {isUploading ? (
            <>
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin text-slate-500 dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </>
          ) : (
            <>
              <h4 className="text-xl">拖放影片或瀏覽</h4>
              <span className="text-xs text-gray-400 dark:text-slate-500">
                影片格式：MP4
              </span>
              <Button className="mt-2 flex gap-4">
                <Upload className="h-5 w-5" />
                瀏覽檔案
              </Button>
            </>
          )}
        </label>
        <Input {...getInputProps()} />
      </div>
    </>
  );
};
export default CustomUpload;
