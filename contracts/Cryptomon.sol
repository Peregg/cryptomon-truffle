pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract CryptomonContract {
    struct Cryptomon {
        uint _id;
        string name;
        string _type;
        address tamer;
        bytes32 dna;
        uint[] stats;
        uint level;
        uint xp;
    }

    mapping(address => Cryptomon[]) cryptos;
    Cryptomon[] public allCryptomons;
    uint256 public cryptomonInWorld;

    function spawnCryptomon(
        string memory name,
        string memory _type,
        bytes32 dna,
        uint[] memory stats
    ) public {
        Cryptomon memory _cmon = Cryptomon(
            cryptomonInWorld + 1,
            name,
            _type,
            msg.sender,
            dna,
            stats,
            1,
            0
        );

        cryptos[msg.sender].push(_cmon);
        allCryptomons.push(_cmon);
        cryptomonInWorld += 1;
    }

    function getMyCryptomons() public view returns(Cryptomon[] memory) {
        uint myCryptoLength = uint(cryptos[msg.sender].length);
        Cryptomon[] memory cryptomonArray = new Cryptomon[](myCryptoLength);

        for(uint i = 0; i < myCryptoLength; i++) {
            cryptomonArray[uint(i)] = cryptos[msg.sender][uint(i)];
        }

        return cryptomonArray;
    }

    function tradeCryptomon(uint _id, address to) public {
        require(msg.sender != to, 'You cannot send a Cryptomon to yourself');

        Cryptomon memory cryptomonToTrade;
        uint indexToRemove;
        for(uint i = 0; i < cryptos[msg.sender].length; i++) {
            if (cryptos[msg.sender][i]._id == _id) {
                cryptomonToTrade = cryptos[msg.sender][i];
                indexToRemove = i;
            }
        }

        require(cryptomonToTrade.tamer == msg.sender, 'The cryptomon you trying to send is not your property');

        cryptos[to].push(cryptomonToTrade);
        delete cryptos[msg.sender][indexToRemove];
        // @TODO : Effacer de l'array de cryptomon le cryptomon envoyé
    }

    function findCryptomonIndex(uint searchedCmonId, address cryptomonOwner) internal view returns (uint index) {
        for(uint i = 0; i < cryptos[cryptomonOwner].length; i++) {
            if (cryptos[cryptomonOwner][i]._id == searchedCmonId) {
                index = i;
            }
        }
    }

    function claimXP(uint cryptomonId, uint xp) public {
        cryptos[msg.sender][findCryptomonIndex(cryptomonId, msg.sender)].xp += xp;
        allCryptomons[findCryptomonIndex(cryptomonId, msg.sender)].xp += xp;
    }

    function levelUp(uint cryptomonId, uint newLevel, uint xp, uint[] memory stats) public {
        cryptos[msg.sender][findCryptomonIndex(cryptomonId, msg.sender)].level = newLevel;
        cryptos[msg.sender][findCryptomonIndex(cryptomonId, msg.sender)].xp += xp;
        cryptos[msg.sender][findCryptomonIndex(cryptomonId, msg.sender)].stats = stats;

        allCryptomons[findCryptomonIndex(cryptomonId, msg.sender)].level = newLevel;
        allCryptomons[findCryptomonIndex(cryptomonId, msg.sender)].xp += xp;
        allCryptomons[findCryptomonIndex(cryptomonId, msg.sender)].stats = stats;
    }
}
