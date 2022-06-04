//SPDX-License-Identifier: UNLICENSEd

pragma solidity ^0.8.0;

/// @title LERC20
/// @author Ace
/// @notice Limited transfer ERC20 contract
/// @dev Allow only whitelisted address to either send or receive tokens (to or from address needs whitelising)

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LimitedERC20 is ERC20,Ownable{

    mapping(address=>bool) public isWhitelisted;

    constructor() ERC20("Token Name","SMBL"){
        isWhitelisted[owner()] = true;
    }

    function whitelistAddress(address _address,bool _whitelist) external onlyOwner{
        isWhitelisted[_address] = _whitelist;
    }

    function mint(uint _amount,address _to) external onlyOwner{
        _mint(_to,_amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override{
        require(isWhitelisted[from] || isWhitelisted[to],"Neither from or to is whitelisted");
    }

}