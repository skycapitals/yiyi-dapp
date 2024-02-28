import React, { useState } from 'react';
import Web3 from 'web3';
import CoinFlipContract from './abis/CoinFlip.json';

function App() {
  const [web3] = useState(new Web3(Web3.givenProvider || "http://localhost:7545"));
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [flipResult, setFlipResult] = useState("");

  const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

  const loadBlockchainData = async () => {
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = CoinFlipContract.networks[networkId];

    if (networkData) {
      const newContract = new web3.eth.Contract(CoinFlipContract.abi, networkData.address);
      setContract(newContract);
    } else {
      window.alert('Contract not deployed to detected network.');
    }
  };

  const flipCoin = async (guess) => {
    const flip = await contract.methods.flip(guess).send({ from: account });
    setFlipResult(flip.events.CoinFlipped.returnValues.win ? "You won!" : "You lost!");
  };

  return (
    <div>
      <h1>Coin Flip Game</h1>
      <button onClick={() => loadBlockchainData()}>Connect Wallet</button>
      <p>Account: {account}</p>
      <div>
        <button onClick={() => flipCoin(true)}>Guess Heads</button>
        <button onClick={() => flipCoin(false)}>Guess Tails</button>
      </div>
      <p>Flip result: {flipResult}</p>
    </div>
  );
}

export default App;