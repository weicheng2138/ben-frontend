import { ChangeEvent, useCallback, useState, type ElementRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Button } from '@/components//ui/button';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

type CustomUploadProps = {
  onUpload: (file: File) => void;
  className?: string;
};
const CustomUpload = ({ onUpload, className }: CustomUploadProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(
    null,
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        toast.error('檔案格式不符!', {
          description: '目前支援 MP4 格式的影片檔案',
        });
        return;
      }
      if (acceptedFiles.length > 0) {
        console.log(acceptedFiles);
        const selectedImage = acceptedFiles[0];
        onUpload(selectedImage);
      }
    },
    [onUpload],
  );

  const handleImageChange = (event: ChangeEvent<ElementRef<'input'>>) => {
    console.log(event.target.files);
    if (event.target.files?.length) {
      // dispatch(setSelectedImage(event.target.files[0]));
      const selectedImage = event.target.files[0];
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
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
        className={cn('flex w-full items-center justify-center', className)}
      >
        <label
          htmlFor="dropzone-file"
          className={cn(
            'flex h-[40vh] w-full cursor-pointer flex-col items-center justify-center gap-2',
            'rounded-lg border-2 border-dashed border-gray-500',
            'bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800',
            isDragActive ? 'bg-slate-100 dark:bg-slate-800' : '',
          )}
        >
          <h4 className="text-xl">拖放影片或瀏覽</h4>
          <span className="text-xs text-gray-400 dark:text-slate-500">
            影片格式：MP4
          </span>
          <Button className="mt-2 flex gap-4">
            <Upload className="h-5 w-5" />
            瀏覽檔案
          </Button>
        </label>
        <Input
          {...getInputProps()}
          id="dropzone-file"
          type="file"
          className="hidden"
          // disabled={loading || uploadedImagePath !== null}
          disabled={loading}
          onChange={handleImageChange}
        />
      </div>
    </>
  );
};
export default CustomUpload;
