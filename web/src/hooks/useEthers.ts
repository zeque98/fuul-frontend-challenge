import { useState, useEffect, useCallback } from 'react';
import { ethers, type JsonRpcSigner } from 'ethers';

const SEPOLIA_CHAIN_ID = '0xaa36a7';

const useEthers = () => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [network, setNetwork] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [address, setAddress] = useState('');

  const initializeProvider = useCallback(async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      const providerNet = await browserProvider.getNetwork();

      setNetwork(providerNet.name);

      if (providerNet.name !== 'sepolia') return;

      const browserProviderSigner = await browserProvider.getSigner();

      setProvider(browserProvider);
      setSigner(browserProviderSigner);
    } else {
      setErrorMessage('Please Install MetaMask!!!');
    }
  }, []);

  useEffect(() => {
    initializeProvider();
  }, [initializeProvider, network]);

  const connectWalletHandler = useCallback(() => {
    if (provider && signer) {
      provider.send('eth_requestAccounts', []).then(async () => {
        const signerAddress = await signer.getAddress();
        setAddress(signerAddress);
      });
    } else {
      setErrorMessage('Please Install MetaMask!!!');
    }
  }, [provider, signer]);

  const changeNetwork = useCallback(async () => {
    try {
      if (!window.ethereum) {
        setErrorMessage('Please Install MetaMask!!!');
      }

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });

      setNetwork('network change');
    } catch (error: unknown) {
      const err = error as { code?: number };
      const METAMASK_CHAIN_CHANGE_REJECTED = 4902;

      if (err.code === METAMASK_CHAIN_CHANGE_REJECTED) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: SEPOLIA_CHAIN_ID,
                rpcUrls: ['https://rpc.sepolia.org'],
                chainName: 'Sepolia Testnet',
                nativeCurrency: {
                  name: 'Sepolia ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://sepolia.etherscan.io'],
              },
            ],
          });

          setNetwork('network change');
        } catch (addError) {
          // TODO: Handle error
          // eslint-disable-next-line no-console
          console.error('Error al agregar la red Sepolia:', addError);
        }
      } else {
        // TODO: Handle error
        // eslint-disable-next-line no-console
        console.error('Error al cambiar a la red Sepolia:', error);
      }
    }
  }, []);

  const signTradeNFT = useCallback(async () => {
    if (!provider || !signer) {
      throw new Error('No connected');
    }

    try {
      await signer.signMessage('Get referral link');
      return true;
    } catch (error) {
      return false;
    }
  }, [provider, signer]);

  return {
    changeNetwork,
    connectWalletHandler,
    errorMessage,
    signTradeNFT,
    address,
    network,
  };
};

export { useEthers };
