import { useState } from 'react';
import { createPresignedUrl, uploadToS3 } from '../_api/imageURL_api';
import useImageCompressor from './useImageCompressor';

export const useCreateImgUrl = () => {
  const { compressFile, reset: resetCompressor } = useImageCompressor();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const createImgUrl = async (file: File): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // 파일 압축
      const compressed = await compressFile(file);
      console.log('발급전', compressed);
      // Presigned URL 발급
      const presignedUrl = await createPresignedUrl(compressed.name);
      console.log('발급후', compressed);
      console.log(presignedUrl);

      // S3에 업로드
      await uploadToS3(presignedUrl, compressed);

      //쿼리마라미터 떼버리기
      const cleanUrl = presignedUrl.split('?')[0];
      console.log('안뗸거', presignedUrl);
      console.log('뗀거', cleanUrl);

      // 업로드된 URL 저장
      setUploadedUrl(cleanUrl);

      return cleanUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 에러');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
      resetCompressor(); // 상태 초기화
    }
  };

  return {
    isLoading,
    error,
    uploadedUrl,
    createImgUrl,
  };
};
