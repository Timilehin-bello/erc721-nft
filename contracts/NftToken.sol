import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NftToken is ERC721URIStorage, Ownable {
    constructor() ERC721("TiBell", "TIB") Ownable(msg.sender) {}

    uint256 public _tokenId;

    function mint(
        address _to,
        string calldata _tokenUri
    ) external onlyOwner {

        _mint(_to, _tokenId);
        _setTokenURI(_tokenId, _tokenUri);

        _tokenId += 1;
    }
}