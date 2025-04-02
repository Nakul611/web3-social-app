import React, { useState } from "react";
import { ethers } from "ethers";

const WalletConnect = ({ setIsConnected }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [network, setNetwork] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const { name } = await provider.getNetwork();

        setWalletAddress(address);
        setNetwork(name);
        setIsConnected(true);
      } catch (error) {
        console.error("Connection failed:", error);
      }
    } else {
      // 📌 Redirect mobile users to MetaMask app
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href =
          "https://metamask.app.link/dapp/" + window.location.hostname;
      } else {
        alert("Please install MetaMask!");
      }
    }
  };

  return (
    <div className="flex items-center gap-4">
      {walletAddress ? (
        <div className="text-sm bg-gray-200 dark:bg-gray-700 p-2 rounded-md">
          <p>{network ? `Network: ${network}` : "Unknown Network"}</p>
          <p>
            Wallet:{" "}
            {walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4)}
          </p>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
