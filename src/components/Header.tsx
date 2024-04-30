import * as React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { installSnap } from '../sdk/snapConnector'; // Make sure the paths and imports are correct

const logo = require('../assets/logo.png');
const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return ( 
<AppBar position="static" sx={{ backgroundColor: '#d6d6d6', elevation: 0 }}>
      <Toolbar sx={{
          justifyContent: 'space-between',
          padding: '10px 0', // Adds padding on top and bottom
          minHeight: '100px', // Increases the height of the Toolbar
          alignItems: 'center', // Centers items vertically
        }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}> {/* Wrapping the logo with Link */}
          <img src={logo} alt="App Logo" style={{ 
            height: '70px', // Increased logo height
            borderRadius: '50%', 
          }} />
        </Link>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            boxShadow: 2,
            borderRadius: '20px',
            padding: '10px 20px', // Adds padding inside the button for a larger appearance
          }}
          onClick={installSnap} // Connect wallet functionality
        >
          {isMobile ? 'Connect' : 'Connect Wallet'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;