import React from 'react';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { mint } from '../sdk/contractConnector'; // Make sure the paths and imports are correct
import { installSnap, getAddresses } from '../sdk/snapConnector'; // Make sure the paths and imports are correct

const JoinDAO = () => {
    const [addresses, setAddresses] = React.useState<string[]>([]);

    const handleOpenLink = () => {
        // Opens the URL in a new browser tab
        window.open('https://docs.metamask.io/snaps/get-started/install-flask/', '_blank');
      };

    const handleMint = async () => {
        try {
            await mint();
            console.log('Minting successful!');
        } catch (error) {
            console.error('Minting failed:', error);
        }
    };

    const handleInstallSnap = async () => {
        try {
            await installSnap();
            console.log('Snap installation successful!');
            alert('Snap installation successful!');
        } catch (error) {
            console.error('Snap installation failed:', error);
            alert('Snap installation failed, please try again.');
        }
    };

    return (
        <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
            <Container maxWidth="lg">
                <Toolbar style={{ justifyContent: 'center' }}>
                    <Button 
                        variant="outlined" 
                        color="primary"  // More visible color
                        onClick={handleInstallSnap}
                        style={{ margin: '0 10px' }}
                    >
                        Install Snap
                    </Button>
                    <Button 
                        variant="contained" 
                        color="secondary"  // Use secondary color for variety
                        onClick={handleMint}
                        style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', margin: '0 10px' }}
                    >
                        Join the DAO
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="primary"  // Consistent visible color
                        onClick={handleOpenLink}
                        style={{ margin: '0 10px' }}
                    >
                        Install MM Flask
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default JoinDAO;
