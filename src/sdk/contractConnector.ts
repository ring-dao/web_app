import { Point } from '@cypher-laboratory/alicesring-lsag';
import { ethers } from 'ethers';
// WORKS WITH ETHERS 5.7.2


/////////////////////////////////////////////////// NFT
const nftContract = new ethers.Contract(
  '0x6e9a1082205896d75ebb3c72b1bbb593f31d781f',
  [
    'function mint() public',
    'function balanceOf(address owner) public view virtual returns (uint256)'
  ],
  new ethers.providers.JsonRpcProvider()
);

export const mint = async () => {
  // use metamask as provider
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = nftContract.connect(signer);
  const tx = await contract.mint();
  await tx.wait();
  console.log("mint tx: ", tx.hash);
};


/////////////////////////////////////////////////// Vote
const votingContract = new ethers.Contract( 
  '0x7CB11634359C8c6c5e1126097Ae0E2d4643335Fd',
  [
    'function newProposal(string memory _description) public',
    'function anonProposal(string memory _description,uint256[] memory ring,uint256[] memory responses,uint256 c,uint256[2] memory keyImage,string memory linkabilityFlag,uint256[] memory witnesses) public',
    'function voteTrue(uint256 _proposalId,uint256[] memory ring,uint256[] memory responses,uint256 c,uint256[2] memory keyImage,string memory linkabilityFlag,uint256[] memory witnesses) public',
    'function voteFalse(uint256 _proposalId,uint256[] memory ring,uint256[] memory responses,uint256 c,uint256[2] memory keyImage,string memory linkabilityFlag,uint256[] memory witnesses) public',
    'function voteTrue(uint256 _proposalId,uint256[] memory ring,uint256[] memory responses,uint256 c,uint256[2] memory keyImage,string memory linkabilityFlag,uint256[] memory witnesses) public'
  ],
  new ethers.providers.JsonRpcProvider()
);

export const proposal = async  (description: string) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = votingContract.connect(signer);
  const tx = await contract.newProposal(description);
  await tx.wait();
  console.log("proposal tx: ", tx.hash);
}

export const voteTrue = async  (proposalId: number, ring: string[], responses: bigint[], c: bigint, keyImage: Point, linkabilityFlag: string, witnesses: bigint[]) => {
  const arrKeyImage = [keyImage.x, keyImage.y];
  const _ring = ring.map((x) => [Point.deserialize(x).x, Point.deserialize(x).y]).flat();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = votingContract.connect(signer);
  const tx = await contract.voteTrue(proposalId, _ring, responses, c, arrKeyImage, linkabilityFlag, witnesses);
  await tx.wait();
  console.log("voteTrue tx: ", tx.hash);
}

export const voteFalse = async  (proposalId: number, ring: string[], responses: bigint[], c: bigint, keyImage: Point, linkabilityFlag: string, witnesses: bigint[]) => {
  const arrKeyImage = [keyImage.x, keyImage.y];

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = votingContract.connect(signer);
  const tx = await contract.voteFalse(proposalId, ring, responses, c, arrKeyImage, linkabilityFlag, witnesses);
  await tx.wait();
  console.log("voteFalse tx: ", tx.hash);
}
