import { useState } from 'react';
import imageCompression from 'browser-image-compression';

type UseImageCompressorReturn = {
  compressedImage: string | null;
  compressFile: (file: File) => Promise<File>;
  compressedFile: File | null;
  reset: () => void;
};

const useImageCompressor = (): UseImageCompressorReturn => {
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);

  const compressFile = async (file: File): Promise<File> => {
    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      console.log(file);

      const compressed = await imageCompression(file, options);

      setCompressedFile(compressed);
      setCompressedImage(URL.createObjectURL(compressed));

      return compressed;
    } catch (error) {
      console.error('이미지 압축 중 에러 발생:', error);
      throw new Error('이미지 압축 실패');
    }
  };

  const reset = () => {
    setCompressedImage(null);
    setCompressedFile(null);
  };

  return { compressedImage, compressFile, compressedFile, reset };
};

export default useImageCompressor;
