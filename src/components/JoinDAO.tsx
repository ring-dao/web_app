import React from 'react';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { mint } from '../sdk/contractConnector'; // Make sure the paths and imports are correct
import { installSnap, getAddresses } from '../sdk/snapConnector'; // Make sure the paths and imports are correct
const JoinDAO = () => {
    const [addresses, setAddresses] = React.useState<string[]>([]);

    const handleMint = async () => {
        try {
            await mint();
            console.log('Minting successful!');
            alert('Minting successful! You are now part of the DAO');
        } catch (error) {
            console.error('Minting failed:', error);
            alert('Minting failed, please try again.');
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

    const handleGetAddresses = async () => {
        try {
            const retrievedAddresses = await getAddresses();
            setAddresses(retrievedAddresses);
            console.log('Addresses retrieved:', retrievedAddresses);
            alert('Addresses retrieved successfully!');
        } catch (error) {
            console.error('Failed to retrieve addresses:', error);
            alert('Failed to retrieve addresses, please try again.');
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
                        onClick={handleGetAddresses}
                        style={{ margin: '0 10px' }}
                    >
                        Get Addresses
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default JoinDAO;
