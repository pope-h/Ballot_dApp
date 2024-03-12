import { ethers } from "hardhat";

async function main() {
  const Adekunle = "0x4164656b756e6c65000000000000000000000000000000000000000000000000";
  const Jeff = "0x4a65666600000000000000000000000000000000000000000000000000000000";
  const Daniel = "0x44616e69656c0000000000000000000000000000000000000000000000000000";
  const Ajidoku = "0x416a69646f6b7500000000000000000000000000000000000000000000000000";

  const proposals = [Adekunle, Jeff, Daniel, Ajidoku];

  const ballot = await ethers.deployContract("Ballot", [proposals]);

  await ballot.waitForDeployment();

  console.log(
    `Ballot contract deployed to ${ballot.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
