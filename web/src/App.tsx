import { useEffect } from 'react';
// TODO: types are created in the fuul-sdk package but not installed locally
import { Fuul } from 'fuul-sdk';

import { useEthers } from './hooks';

const App = () => {
  useEffect(() => {
    // The error: "Project info is still loading. Try again later" only happens in development mode
    const apiKey = 'project1';
    Fuul.init(apiKey);
  }, []);

  const {
    network,
    errorMessage,
    address,
    connectWalletHandler,
    signTradeNFT,
    changeNetwork,
  } = useEthers();

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  const handleTradeNft = async () => {
    const isSigned = await signTradeNFT();
    if (isSigned) {
      Fuul.showReferralModal();
    }
  };

  return (
    <div>
      <h1>Fuul challenge</h1>
      {network && <h2>{`Connected to network: ${network}`}</h2>}
      {address && <h2>{`User address: ${address}`}</h2>}

      {network === 'sepolia' && !address && (
        <button onClick={connectWalletHandler} type="button">
          Connect Wallet
        </button>
      )}
      {network === 'sepolia' && address && (
        <button onClick={handleTradeNft} type="button">
          Trade
        </button>
      )}
      {network !== 'sepolia' && (
        <button onClick={changeNetwork} type="button">
          Change netwok to Sepolia
        </button>
      )}
    </div>
  );
};

export default App;
