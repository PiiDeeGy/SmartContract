import { useState, useEffect } from "react";
import { ethers } from "ethers";
import transaction_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethereumWallet, setEthereumWallet] = useState(undefined);
  const [connectedAccount, setConnectedAccount] = useState(undefined);
  const [logTransaction, setLogTransaction] = useState(undefined);
  const [newValue, setNewValue] = useState(undefined);
  const [fetchedValue, setFetchedValue] = useState(undefined);
  const [transactionHistory, setValueHistory] = useState([]);
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const transactionABI = transaction_abi.abi;

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
      setConnectedAccount   (accounts[0]);
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
    getTransaction();
  };

  const getTransaction = () => {
    const provider = new ethers.providers.Web3Provider(ethereumWallet);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, transactionABI, signer);

    setLogTransaction(contract);
  };

  const addTransaction = async () => {
    if (logTransaction) {
      let tx = await logTransaction.addTransactionLog(newValue);
      await tx.wait();
    }
  };

  const fetchTransaction = async () => {
    if (logTransaction) {
      const transactionLog = await logTransaction.fetchTransactionLog();
      setFetchedValue(transactionLog.toNumber());
    }
  };

  const historyTransaction = async () => {
    if (logTransaction) {
      const history = await logTransaction.fetchTransactionHistory();
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
        <style>
          {`
            .container {
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: 0 auto;
              padding: 2rem;
            }
    
            .section {
              margin-bottom: 1.5rem;
              background-color: #f9f9f9;
              padding: 1rem;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            input[type="number"] {
              width: calc(100% - 22px);
              padding: 0.5rem;
              margin-bottom: 1rem;
              border: 1px solid #ccc;
              border-radius: 4px;
            }
    
            button {
              padding: 0.5rem 1rem;
              background-color: #007bff;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            }
    
            button:hover {
              background-color: #0056b3;
            }
    
            .transaction-detail {
              margin-top: 1rem;
              font-style: italic;
            }
          `}
        </style>
    
        <div className="container">
          <div className="section">
            <p>
              <span>Add a transaction in the field:</span>
              <input
                type="number"
                placeholder="Enter value to record"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
              <button onClick={addTransaction}>Add to Transaction Repository</button>
            </p>
          </div>
    
          <div className="section">
            <p>
              <span>Want to see your most recent transaction:</span>
              <button onClick={fetchTransaction}>Show Most Recent Transaction Log</button>
              <p className="transaction-detail">Last Transaction: {fetchedValue}</p>
            </p>
          </div>
    
          <div className="section">
            <p>
              <span>Show All Transaction History for this Account:</span>
              <button onClick={historyTransaction}>Request All Transaction Logs</button>
              <p className="transaction-detail">Value History: {transactionHistory.join(", ")}</p>
            </p>
          </div>
        </div>
      </>
    );
    
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header><h1>Transaction Log</h1></header>
      { initializeUser() }
  
      <style jsx>{`
        .container {0
          display: flex;
          text-align: center;
          font-family: Arial, sans-serif;
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto;
        }
  
        h1 {
          margin-bottom: 1.5rem;
          color: #333;
        }
      `}</style>
    </main>
  );  
}