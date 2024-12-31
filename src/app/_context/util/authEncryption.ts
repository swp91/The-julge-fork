const AES_KEY = process.env.NEXT_PUBLIC_AES_KEY;
if (!AES_KEY) {
  throw new Error('키가 없어요');
}

const convertHexToUint8Array = (hex: string): Uint8Array => {
  const byteArray = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    byteArray[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return byteArray;
};

const ENCRYPTION_KEY = convertHexToUint8Array(AES_KEY);

export async function encryptData(data: object): Promise<string> {
  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await crypto.subtle.importKey(
    'raw',
    ENCRYPTION_KEY,
    { name: 'AES-GCM' },
    false,
    ['encrypt'],
  );

  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(JSON.stringify(data)),
  );

  return JSON.stringify({
    iv: Array.from(iv),
    data: Buffer.from(encrypted).toString('base64'),
  });
}

export async function decryptData(encryptedData: string): Promise<object> {
  const { iv, data } = JSON.parse(encryptedData);
  const key = await crypto.subtle.importKey(
    'raw',
    ENCRYPTION_KEY,
    { name: 'AES-GCM' },
    false,
    ['decrypt'],
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(iv) },
    key,
    Buffer.from(data, 'base64'),
  );

  return JSON.parse(new TextDecoder().decode(decrypted));
}
