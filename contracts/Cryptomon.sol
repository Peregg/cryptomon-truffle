pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

import './CryptomonHelpers.sol';

contract CryptomonContract {
    struct Attack {
       string name;
       uint power;
       string _type;
       uint energy;
    }

    struct Cryptomon {
        uint _id;
        string name;
        string _type;
        address tamer;
        bytes32 dna;
        uint level;
        uint health;
        uint attack;
        uint defense;
        uint speed;
    }

    struct BattleGround {
        address playerOne;
        address playerTwo;
        Cryptomon playerOneCmon;
        Cryptomon playerTwoCmon;
        bool isFinished;
        string comment;
    }

    event myCryptomons (
        Cryptomon[] cryptomonArray
    );

    event updateCryptomonEvent (
        Cryptomon updatedCryptomon
    );

    event allBattles(
        BattleGround[] battles
    );

    mapping(address => Cryptomon[]) cryptos;
    mapping(string => Attack[]) attacks;
    mapping(uint => BattleGround) battlegrounds;
    Cryptomon[] public allCryptomons;
    uint256 public cryptomonInWorld;
    uint256 public battlegroundsCount;

    function random() private view returns (uint8 number) {
        number = uint8(uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp)))%256);
    }

    function initAttacks() private {
        attacks['Salamèche'].push(Attack('Flamèche', 25, 'fire', 55));
        attacks['Carapuce'].push(Attack("Bulles d'O", 15, 'fire', 35));
        attacks['Bulbizarre'].push(Attack("Tranch'herbe", 20, 'fire', 40));
    }

    function generateRandomCryptomon(uint8 randomNumber) private view returns (Cryptomon memory) {
        if (randomNumber > 0 && randomNumber < 99) {
            return Cryptomon({
                _id: cryptomonInWorld + 1,
               name: "Carapuce",
               _type: "water",
               tamer: msg.sender,
               dna: keccak256(abi.encodePacked(blockhash(block.number), block.difficulty)),
               level: 1,
               health: 50,
               attack: 30 + random() % 15,
               defense: 65 + random() % 15,
               speed: 35 + random() % 15
            });
        } else if (randomNumber > 100 && randomNumber < 199) {
            return Cryptomon({
                _id: cryptomonInWorld + 1,
               name: "Bulbizarre",
               _type: "grass",
               tamer: msg.sender,
               dna: keccak256(abi.encodePacked(blockhash(block.number), block.difficulty)),
               level: 1,
               health: 55,
               attack: 40 + random() % 15,
               defense: 35 + random() % 15,
               speed: 40 + random() % 15
            });
        } else {
            return Cryptomon({
                _id: cryptomonInWorld + 1,
               name: "Salamèche",
               _type: "fire",
               tamer: msg.sender,
               dna: keccak256(abi.encodePacked(blockhash(block.number), block.difficulty)),
               level: 1,
               health: 50,
               attack: 65 + random() % 15,
               defense: 30 + random() % 15,
               speed: 55 + random() % 15
            });
        }
    }

    function catchCryptomon(
        string memory name,
        string memory _type,
        bytes32 dna,
        uint health,
        uint attack,
        uint defense,
        uint speed
    ) public {
        Cryptomon memory _cmon = Cryptomon(
            cryptomonInWorld + 1,
            name,
            _type,
            msg.sender,
            dna,
            1,
            health + random() % 15,
            attack + random() % 15,
            defense + random() % 15,
            speed + random() % 15
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

    function updateCryptomon(address tamer, uint _index, uint damages) public {
        Cryptomon memory selectedCryptomon = cryptos[tamer][uint(_index)];
        selectedCryptomon.health -= damages;
        cryptos[tamer][uint(_index)] = selectedCryptomon;
        emit updateCryptomonEvent(selectedCryptomon);
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

    function findCryptomon(uint searchedCmonId, address cryptomonOwner) internal view returns (Cryptomon memory foundCryptomon) {
        for(uint i = 0; i < cryptos[cryptomonOwner].length; i++) {
            if (cryptos[cryptomonOwner][i]._id == searchedCmonId) {
                foundCryptomon = cryptos[cryptomonOwner][i];
            }
        }
    }

    function whoAttackFirst(Cryptomon memory a, Cryptomon memory b) private pure returns (Cryptomon memory attackant, Cryptomon memory defender) {
        if (a.speed > b.speed) {
            return (a, b);
        } else {
            return (b, a);
        }
    }

    function engageBattle(address playerA, address playerB, uint playerACmonId, uint playerBCmonId) public {
        string memory errorMessage = string(abi.encodePacked(cryptos[playerA].length > 0 ? playerA : playerB, ' has no cryptomon that can battle !'));

        require(cryptos[playerA].length > 0 && cryptos[playerB].length > 0, errorMessage);

        (Cryptomon memory attackantCmon, Cryptomon memory defenderCmon) = whoAttackFirst(findCryptomon(playerACmonId, playerA), findCryptomon(playerBCmonId, playerB));
        address attackant = attackantCmon._id == playerACmonId ? playerA : playerB;
        address defender = attackant == playerA ? playerB : playerA;

        battlegrounds[battlegroundsCount] = BattleGround(attackant, defender, attackantCmon, defenderCmon, false, "");
        battlegroundsCount += 1;
    }

    function seeAllFights() public {
        uint battleLength = uint(battlegroundsCount);
        BattleGround[] memory battles = new BattleGround[](battleLength);

        for(uint i = 0; i < battleLength; i++) {
            battles[uint(i)] = battlegrounds[uint(i)];
        }

        emit allBattles(battles);
    }

    function playTurn(uint fightId, uint playerOneAction, uint playerTwoAction) public returns(uint) {
        require(battlegrounds[fightId].isFinished == false, "This battle is finished");

        uint playerOneAttack;
        uint playerTwoAttack;
        string memory deals = ' inflige ';
        string memory damagesTo = ' points de dommages à ';

        playerOneAttack = attacks[battlegrounds[fightId].playerOneCmon.name][playerOneAction].power;
        playerTwoAttack = attacks[battlegrounds[fightId].playerTwoCmon.name][playerTwoAction].power;

        if (playerOneAttack > battlegrounds[fightId].playerTwoCmon.health || (battlegrounds[fightId].playerTwoCmon.health - playerOneAttack) > battlegrounds[fightId].playerTwoCmon.health) {
            battlegrounds[fightId].isFinished = true;
            battlegrounds[fightId].comment = string(abi.encodePacked(battlegrounds[fightId].playerTwoCmon.name, ' est K.O !', battlegrounds[fightId].playerOne, ' remporte la victoire !!!'));
            return 1;
        }

        battlegrounds[fightId].playerTwoCmon.health = battlegrounds[fightId].playerTwoCmon.health - playerOneAttack;
        battlegrounds[fightId].comment = string(abi.encodePacked(battlegrounds[fightId].playerOneCmon.name, deals, CryptomonHelpers.uintToString(playerOneAttack), damagesTo, battlegrounds[fightId].playerTwoCmon.name));

        if (battlegrounds[fightId].playerTwoCmon.health == 0) {
            battlegrounds[fightId].isFinished = true;
            battlegrounds[fightId].comment = string(abi.encodePacked(battlegrounds[fightId].playerTwoCmon.name, ' est K.O !', battlegrounds[fightId].playerOne, ' remporte la victoire !!!'));
            return 1;
        }

        if (playerTwoAttack > battlegrounds[fightId].playerOneCmon.health || (battlegrounds[fightId].playerOneCmon.health - playerTwoAttack) > battlegrounds[fightId].playerOneCmon.health) {
            battlegrounds[fightId].isFinished = true;
            battlegrounds[fightId].comment = string(abi.encodePacked(battlegrounds[fightId].playerOneCmon.name, ' est K.O !', battlegrounds[fightId].playerTwo, ' remporte la victoire !!!'));
            return 2;
        }

        battlegrounds[fightId].playerOneCmon.health = battlegrounds[fightId].playerOneCmon.health - playerTwoAttack;
        battlegrounds[fightId].comment = string(abi.encodePacked(battlegrounds[fightId].comment, ', ', battlegrounds[fightId].playerTwoCmon.name, deals, CryptomonHelpers.uintToString(playerTwoAttack), damagesTo, battlegrounds[fightId].playerOneCmon.name));

        if (battlegrounds[fightId].playerOneCmon.health == 0) {
            battlegrounds[fightId].isFinished = true;
            battlegrounds[fightId].comment = string(abi.encodePacked(battlegrounds[fightId].playerOneCmon.name, ' est K.O !', battlegrounds[fightId].playerTwo, ' remporte la victoire !!!'));
            return 2;
        }
    }
}
