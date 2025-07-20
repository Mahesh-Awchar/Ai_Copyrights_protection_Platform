import { ethers } from 'ethers';

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    return { provider, signer, address };
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
}

export async function registerContent(contentHash: string, metadata: any) {
  const { signer } = await connectWallet();
  
  // This would be replaced with your actual smart contract interaction
  console.log('Registering content:', { contentHash, metadata, signer });
  
  // Simulate blockchain confirmation
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    transactionHash: '0x' + Math.random().toString(16).slice(2),
    timestamp: new Date().toISOString()
  };
}