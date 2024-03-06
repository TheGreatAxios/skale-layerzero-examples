import hre, { ethers } from 'hardhat';
import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { Contract, ContractFactory, utils } from 'ethers'
import { Options } from '@layerzerolabs/lz-v2-utilities'
import { EndpointId } from '@layerzerolabs/lz-definitions'
import TokenMumbai from '../deployments/mumbai/MyOFT.json'
import TokenEuropa from '../deployments/europa/MyOFT.json'

const Europa = {
    token_address: TokenEuropa.address,
    contract_name: 'MyOFT',
    destinationChainId: EndpointId.POLYGON_V2_TESTNET,
}

const Mumbai = {
    token_address: TokenMumbai.address,
    contract_name: 'MyOFT',
    destinationChainId: EndpointId.SKALE_V2_TESTNET,
}


async function BridgeToken(amount:string) {

    let target_chain

    if(hre.network.name == 'mumbai'){
        target_chain = Mumbai
    }
    else if(hre.network.name == 'europa'){
        target_chain = Europa
    }

    //Origin Chain Contract
    const TokenAddress = target_chain.token_address
    const TokenFactory = await hre.ethers.getContractFactory(target_chain.contract_name)
    const TokenContract = TokenFactory.attach(TokenAddress)

    const [owner] = await ethers.getSigners()

   const tokensToSend = utils.parseEther(amount)
   const destinationChainId = target_chain.destinationChainId
   const destinationAddress = owner.address 

   console.log('destinationAddress ' + destinationAddress)

   const options = Options.newOptions().addExecutorLzReceiveOption(3000000, 0).toHex().toString()

   const sendParam = [
       destinationChainId,
       utils.zeroPad(destinationAddress, 32),
       tokensToSend,
       tokensToSend,
       options,
       '0x',
       '0x',
   ]

   const [nativeFee] = await TokenContract.quoteSend(sendParam, false)
   console.log(`Sending ${tokensToSend.toString()} tokens from Contract A to Contract B`)
   console.log('nativeFee ' + nativeFee)

   await TokenContract.send(sendParam, [nativeFee, 0], owner.address, { value: nativeFee })

   console.log('Transfer successful!')
   
}

BridgeToken('10')
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
    });
