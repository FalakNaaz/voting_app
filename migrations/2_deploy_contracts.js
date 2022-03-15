const Ballot = artifacts.require('Ballot')
const ether =  require('ethers')
module.exports = async function(deployer, network, accounts) {
  const bytes = []
  bytes[0] = ether.utils.formatBytes32String('Democrats')
  bytes[1] = ether.utils.formatBytes32String('Republicans')
  await deployer.deploy(Ballot, bytes)
  //const ballot = await Ballot.deployed()

}
