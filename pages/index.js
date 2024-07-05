import { useState, useEffect } from "react";
import { ethers } from "ethers";
import storage_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethereumWallet, setEthereumWallet] = useState(undefined);
  const [connectedAccount, setConnectedAccount] = useState(undefined);
  const [storageContract, setStorageContract] = useState(undefined);

  const [newValue, setNewValue] = useState(undefined);
  const [fetchedValue, setFetchedValue] = useState(undefined);
  const [valueHistory, setValueHistory] = useState([]);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const storageABI = storage_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthereumWallet(window.ethereum);
    }

    if (ethereumWallet) {
      const accounts = await ethereumWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setConnectedAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethereumWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethereumWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // Once wallet is set we can get a reference to our deployed contract
    getStorageContract();
  };

  const getStorageContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereumWallet);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, storageABI, signer);

    setStorageContract(contract);
  };

  const setStoredValueFn = async () => {
    if (storageContract) {
      let tx = await storageContract.setStoredValue(newValue);
      await tx.wait();
    }
  };

  const getStoredValueFn = async () => {
    if (storageContract) {
      const storedValue = await storageContract.getStoredValue();
      setFetchedValue(storedValue.toNumber());
    }
  };

  const getStoreHistoryFn = async () => {
    if (storageContract) {
      const history = await storageContract.getStoreHistory();
      const historyArray = history.map((value) => value.toNumber());
      setValueHistory(historyArray);
    }
  };

  const initializeUser = () => {
    // Check if user has Metamask
    if (!ethereumWallet) {
      return <p>Please install Metamask in order to use this application.</p>;
    }

    // Check if user is connected. If not, connect to their account
    if (!connectedAccount) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet.</button>;
    }

    return (
      <>
        <p>
          <span> Enter a value to record: </span>
          <input
            type="number"
            placeholder="Enter value to record"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <button onClick={setStoredValueFn}>Add to Transaction Repository</button>
        </p>
        <p>
          <span>Want to see your most recent transaction: </span>
          <button onClick={getStoredValueFn}>Show Most Recent Transaction Log</button>
          <p>Last Transaction: {fetchedValue}</p>
        </p>
        <p>
          <span>Show All Transaction History for this Account: </span>
          <button onClick={getStoreHistoryFn}>Request All Transaction Logs:</button>
          <p>Value History: {valueHistory.join(", ")}</p>
        </p>
      </>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
      <font style ="Verdana" size = "12">Transaction Record Keeper!</font>
      </header>
      {initializeUser()}

      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </main>
  );
}
