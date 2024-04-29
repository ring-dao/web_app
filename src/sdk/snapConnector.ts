
import detectEthereumProvider from '@metamask/detect-provider';


const PACKAGE_NAME = '@cypher-laboratory/lsag-snap';

declare global {
  interface Window {
    ethereum?: any; // Use `any` if you don't have a specific type to use
  }
}

export async function installSnap() {
  // This resolves to the value of window.ethereum or null
  const provider: any = await detectEthereumProvider();

  // web3_clientVersion returns the installed MetaMask version as a string
  const isFlask = (
    await provider?.request({ method: 'web3_clientVersion' })
  )?.includes('flask');

  if (provider && isFlask) {

    try {
      // call zer0x-deposit-payload
      const payload = await window.ethereum.request({
        "method": "wallet_requestSnaps",
        "params": {
          [`npm:${PACKAGE_NAME}`]: {},
        }
      });
      console.log('MetaMask Flask & airdrop claimer SNAP successfully detected!');
    } catch (error) {
      console.error(`Error while installing ${PACKAGE_NAME}`);
    }
  } else {
    console.error('Please install MetaMask flask first');
  }
};


export async function detectPrivateClaimSnap(): Promise<boolean> {
  const provider: any = await detectEthereumProvider();
  const snaps = await provider?.request({
    method: 'wallet_getSnaps'
  });

  const isMySnapInstalled = Object.keys(snaps).includes(`npm:${PACKAGE_NAME}`);

  if (isMySnapInstalled) {
    // console.log('privateClaim Snap is installed');
    return true;
  } else {
    // console.log('privateClaim Snap is not installed');
    return false
  }

}

// generate new account: "newAccount"
export async function generateAccount() {
  try {
    const account = await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: `npm:${PACKAGE_NAME}`,
        request: {
          method: "newAccount",
          // params,
        },
      },
    });
    console.log('account:', account);
    // alert('Account generated successfully!');
  } catch (error) {
    console.error('Error while generating account');
  }
}

// import account: "importAccount"
export async function importAccount() {
  try {
    const account = await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: `npm:${PACKAGE_NAME}`,
        request: {
          method: "importAccount",
          // params,
        },
      },
    });
    console.log('account:', account);
    // alert('Account imported successfully!');
  } catch (error) {
    console.error('Error while importing account');
  }
}

// get addresses of all accounts: "getAddresses"
export async function getAddresses(): Promise<string[]> {
  try {
    const addresses = await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: `npm:${PACKAGE_NAME}`,
        request: {
          method: "getAddresses",
          // params,
        },
      },
    });
    console.log('addresses:', JSON.parse(addresses).addresses);
    return JSON.parse(addresses).addresses;
  } catch (error) {
    console.error('Error while getting addresses');
    return [];
  }
}

// lsag sign message: "LSAG_signature"
export async function LSAG_signature(ring: string[], linkabilityFlag: string, message: string, addressToUse: string): Promise<string> {
  try {
    const signature = await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: `npm:${PACKAGE_NAME}`,
        request: {
          method: "LSAG_Signature",
          params: { ring, addressToUse, message, linkabilityFlag }
        },
      },
    });
    console.log('signature:', signature);
    // alert('Message signed successfully!');
    return signature.slice(1, -1);
  } catch (error) {
    console.error('Error while signing message');
    return '';
  }
}

