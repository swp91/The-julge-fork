import { useState } from "react";
import { createPresignedUrl, uploadToS3 } from "../_api/imageURL_api";
import useImageCompressor from "./useImageCompressor";

export const useCreateImgUrl = () => {
  const { compressFile, reset: resetCompressor } = useImageCompressor();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const createImgUrl = async (file: File): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const compressed = await compressFile(file);
      const presignedUrl = await createPresignedUrl(compressed.name);

      await uploadToS3(presignedUrl, compressed);

      const cleanUrl = presignedUrl.split("?")[0];

      setUploadedUrl(cleanUrl);

      return cleanUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 에러");
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
