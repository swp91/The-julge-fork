import axios from 'axios';
import instance from './instance';

// PresignedUrl(이미지URL로 사용할주소) 를 발급받는 api 입니다.
export const createPresignedUrl = async (imageName: string) => {
  const response = await instance.post<{ item: { url: string } }>(
    '/images',
    { name: imageName },
    { headers: { requiresToken: true } },
  );

  const { item } = response;
  return item.url;
};

// 발급받은 url로 이미지 파일을 보내면 해당 url이 이미지 url이 됩니다.
export const uploadToS3 = async (presignedUrl: string, file: File) => {
  try {
    const response = await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });

    console.log('File uploaded successfully:', response.status);
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw error;
  }
};

//위의 작업들을 묶어서 useCreateImgUrl 훅으로 만들어 두었습니다.
