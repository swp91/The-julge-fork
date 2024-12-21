import { useState } from 'react';
import { createPresignedUrl, uploadToS3 } from '../_api/imageURL_api';
import useImageCompressor from './useImageCompressor';

export const useCreateImgUrl = () => {
  const {
    compressFile,
    compressedFile,
    reset: resetCompressor,
  } = useImageCompressor();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const createImgUrl = async (file: File): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    //우선 이미지 압축작업 먼저합니다.
    try {
      await compressFile(file);
      if (!compressedFile) {
        throw new Error('파일이 없어요');
      }

      //Presigned URL 발급받습니다.
      const presignedUrl = await createPresignedUrl(compressedFile.name);

      //발급받은 URL에 이미지 업로드 작업
      await uploadToS3(presignedUrl, compressedFile);

      //업로드된 URL 저장
      setUploadedUrl(presignedUrl);
      return presignedUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : '알수없는 에러');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
      resetCompressor(); // 압축 상태 초기화시킴
    }
  };

  return {
    isLoading, // 작업진행하는 동안 사용할 로딩상태
    error,
    uploadedUrl,
    createImgUrl, // 이미지 URL 생성 함수
  };
};
