import { Web3Storage } from 'web3.storage';

if (!import.meta.env.VITE_WEB3_STORAGE_TOKEN) {
  throw new Error('Missing Web3.Storage token');
}

export const web3Storage = new Web3Storage({ token: import.meta.env.VITE_WEB3_STORAGE_TOKEN });

export async function storeContent(file: File) {
  try {
    const cid = await web3Storage.put([file]);
    return `https://${cid}.ipfs.w3s.link/${file.name}`;
  } catch (error) {
    console.error('Error storing content:', error);
    throw error;
  }
}