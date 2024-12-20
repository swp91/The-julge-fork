import { useState } from 'react';
import imageCompression from 'browser-image-compression';

type UseImageCompressorReturn = {
  compressedImage: string | null;
  compressFile: (file: File) => Promise<void>;
  compressedFile: File | null;
  reset: () => void;
};

const useImageCompressor = (): UseImageCompressorReturn => {
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);

  const compressFile = async (file: File): Promise<void> => {
    try {
      const options = {
        maxSizeMB: 0.5, // 압축할 사이즈 용량이에요.
        maxWidthOrHeight: 1024, // 이건 크기 정하는거에요.
        useWebWorker: true, // Web Worker를 사용하여 성능 향상한다고 합니다.
      };

      // 파일 압축작업입니다.
      const compressed = await imageCompression(file, options);
      setCompressedFile(compressed);

      // 압축된 파일로 미리보기 URL 생성
      const previewUrl = URL.createObjectURL(compressed);
      setCompressedImage(previewUrl);
    } catch (error) {
      console.error('이미지 압축 중 에러 발생:', error);
    }
  };

  const reset = () => {
    setCompressedImage(null);
    setCompressedFile(null);
  };

  return { compressedImage, compressFile, compressedFile, reset };
};

export default useImageCompressor;
