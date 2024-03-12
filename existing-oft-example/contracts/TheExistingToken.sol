pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract TheExistingToken is ERC20, ERC20Permit {
    constructor()
        ERC20("TheExistingToken", "TKN")
        ERC20Permit("TheExistingToken")
    {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
