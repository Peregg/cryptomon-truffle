const Cryptomon = artifacts.require("CryptomonContract");
const CryptomonHelpers = artifacts.require("CryptomonHelpers");

module.exports = function(deployer) {
  // deployer.deploy(CryptomonHelpers);
  // deployer.link(CryptomonHelpers, Cryptomon);
  deployer.deploy(Cryptomon);
};
