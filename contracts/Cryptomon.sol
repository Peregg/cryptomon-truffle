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

    mapping(address => uint[]) cryptos;
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

        cryptos[msg.sender].push(_cmon._id);
        allCryptomons.push(_cmon);
        cryptomonInWorld += 1;
    }

    function getMyCryptomons() public view returns(Cryptomon[] memory) {
        uint myCryptoLength = uint(cryptos[msg.sender].length);
        Cryptomon[] memory cryptomonArray = new Cryptomon[](myCryptoLength);

        for(uint i = 0; i < myCryptoLength; i++) {
            cryptomonArray[uint(i)] = allCryptomons[cryptos[msg.sender][i] - 1];
        }

        return cryptomonArray;
    }

    function tradeCryptomon(uint _id, address to) public {
        require(msg.sender != to, 'You cannot send $-^plk;lpo Cryptomon to yourself');
        require(allCryptomons[_id - 1].tamer == msg.sender, 'You do not own this cryptomon !');

        uint[] memory updatedCmons = new uint[](0);

        for(uint i = 0; i < cryptos[msg.sender].length; i++) {
            if (cryptos[msg.sender][i] != _id) {
                updatedCmons[updatedCmons.length + 1] = cryptos[msg.sender][i];
            }
        }

        cryptos[to].push(_id);
        allCryptomons[_id - 1].tamer = to;
        cryptos[msg.sender] = updatedCmons;
    }

    function claimXP(uint cryptomonId, uint xp) public {
        allCryptomons[cryptomonId - 1].xp += xp;
    }

    function levelUp(uint cryptomonId, uint newLevel, uint xp, uint[] memory stats) public {
        allCryptomons[cryptomonId - 1].level = newLevel;
        allCryptomons[cryptomonId - 1].xp += xp;
        allCryptomons[cryptomonId - 1].stats = stats;
    }
}
