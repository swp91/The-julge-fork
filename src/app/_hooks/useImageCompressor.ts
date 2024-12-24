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
        maxSizeMB: 0.5, // 최대 파일 크기 (MB)
        maxWidthOrHeight: 1024, // 최대 가로/세로 길이 (픽셀)
        useWebWorker: true, // Web Worker 사용
      };

      console.log(file);

      // 이미지 압축
      const compressed = await imageCompression(file, options);

      // 디버깅용 로그
      console.log('압축된 파일:', compressed);

      // 상태 업데이트
      setCompressedFile(compressed);
      setCompressedImage(URL.createObjectURL(compressed));

      return compressed; // 압축된 파일 반환
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
