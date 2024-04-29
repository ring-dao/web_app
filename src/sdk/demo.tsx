import React from 'react';
import { generateAccount, getAddresses, importAccount, installSnap, LSAG_signature } from './snapConnector';
import { mint, proposal, voteTrue } from './contractConnector';
import { RingSignature } from '@cypher-laboratory/alicesring-lsag';

function Demo_sdk() {

  const [addresses, setAddresses] = React.useState<string[]>([]);
  const [sig, setSig] = React.useState('');

  const handleNewAccount = async () => {
    await generateAccount();
  }

  const handleImportAccount = async () => {
    await importAccount();
  }

  const handleGetAddresses = async () => {
    const addresses = await getAddresses();
    console.log('addresses:', addresses);
    setAddresses(addresses);
  }

  const handleLSAG_signature = async () => {
    setSig(await LSAG_signature(
      [
        '030066ba293cc22d0eadbe494e9bd4d6d05c3e09d74dff0e991075de74b2359678', // Point.serialize()
        '0316d7da70ba247a6a40bb310187e8789b80c45fa6dc0061abb8ced49cbe7f887f',
        '0221869ca3ae33be3a7327e9a0272203afa72c52a5460ceb9f4a50930531bd926a'
      ],
      'hello world',
      'messaggggeeee',
      (await getAddresses())[0],
    ));
  }

  const handleMint = async () => { // suppose mm connecté au site web
    await mint();
  }

  const handleProposal = async () => {
    await proposal('hello world');
  }

  const handleVoteTrue = async () => { // same principe pour voteFalse
    const signat = await LSAG_signature( // on suppose que l'utilisateur a deja le snap et a ajouté son compte qui detiens le nft
      [
        '030066ba293cc22d0eadbe494e9bd4d6d05c3e09d74dff0e991075de74b2359678', // Point.serialize()
        '0316d7da70ba247a6a40bb310187e8789b80c45fa6dc0061abb8ced49cbe7f887f',
        '0221869ca3ae33be3a7327e9a0272203afa72c52a5460ceb9f4a50930531bd926a'
      ],
      'hello world',
      '0',
      '0xDfbe1cBe0827c09d41C661b114bfB068373AF947'
    );
    const sign = RingSignature.fromBase64(signat);
    console.log("sign:", signat);


    const proposalId = 0; 

    await voteTrue( // ATTENTION LE VOTE EST FAIT PAR UN ADRESSE QUI NE POSSEDE PAS LE NFT POUR GARANTIR LA CONFIDENTIALITÉ
      proposalId,
      sign.getRing().map(r => r.serialize()),
      sign.getResponses(),
      sign.getChallenge(),
      sign.getKeyImage(),
      sign.getLinkabilityFlag(),
      sign.verify(true).evmWitnesses as bigint[]
    );
  }


  return (
    <div className="App">
      <button onClick={installSnap}>Install Snap</button>
      <button onClick={handleNewAccount}>New Account</button>
      <button onClick={handleImportAccount}>Import Account</button>
      <button onClick={handleGetAddresses}>Get Addresses</button>
      <p>Addresses: {addresses.join(', ')}</p>
      <button onClick={handleLSAG_signature}>LSAG_signature</button>
      <p>Sig: {sig}</p>
      <p>Contact</p>
      <button onClick={handleMint}>Mint</button>
      <button onClick={handleProposal}>Proposal</button>
      <button onClick={handleVoteTrue}>Vote True</button>

    </div>
  );
}

export default Demo_sdk;
