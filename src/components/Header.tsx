import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ethers } from 'ethers';

const logo = require('../assets/logo.png');

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkWalletConnected();
  }, []);

  const checkWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setIsConnected(true);
        }
      } catch (error) {
        console.error("Failed to check wallet connection:", error);
      }
    }
  };

  const connectWallet = async () => {
    if (!isConnected) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        console.log('Account:', await signer.getAddress());
        setIsConnected(true);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      // Optionally add a disconnect function or leave as is
      console.log("Already connected.");
    }
  };

  const disconnectWallet = async () => {
    // Logic to disconnect the wallet could vary based on the wallet provider
    console.log("Disconnecting wallet (not supported by all wallets).");
    setIsConnected(false);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#d6d6d6', elevation: 0 }}>
      <Toolbar sx={{
          justifyContent: 'space-between',
          padding: '10px 0',
          minHeight: '100px',
          alignItems: 'center',
        }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="App Logo" style={{ 
            height: '70px',
            borderRadius: '50%', 
          }} />
        </Link>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            boxShadow: 2,
            borderRadius: '20px',
            padding: '10px 20px',
          }}
          onClick={isConnected ? disconnectWallet : connectWallet}
        >
          {isMobile ? (isConnected ? 'Disconnect' : 'Connect') : (isConnected ? 'Disconnect Wallet' : 'Connect Wallet')}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
