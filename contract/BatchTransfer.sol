// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

interface ERC721Partial {
    function transferFrom(address from, address to, uint256 tokenId) external;
}

contract BatchTransfer {
    /// @notice Tokens on the given ERC-721 contract are transferred from you to a recipient.
    ///         Don't forget to execute setApprovalForAll first to authorize this contract.
    /// @param  tokenContract An ERC-721 contract
    /// @param  recipient     Who gets the tokens?
    /// @param  tokenIds      Which token IDs are transferred?
    function batchTransfer(ERC721Partial tokenContract, address recipient, uint256[] calldata tokenIds) external {
        for (uint256 index; index < tokenIds.length; index++) {
            tokenContract.transferFrom(msg.sender, recipient, tokenIds[index]);
        }
    }


    // for multiple ERC-721 contracts
    function batchTransfer(ERC721Partial[] tokenContract, address recipient, uint256[] calldata tokenIds) external {
        require(tokenContract.length == tokenIds.length, "tokenContract and tokenIds length must be equal");
        for (uint256 index; index < tokenIds.length; index++) {
            tokenContract[index].transferFrom(msg.sender, recipient, tokenIds[index]);
        }
    }
    
}

