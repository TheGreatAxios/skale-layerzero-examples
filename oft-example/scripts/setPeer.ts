import hre, { ethers } from 'hardhat'
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
    peerChain_target: EndpointId.POLYGON_V2_TESTNET,
    peerAddress: TokenMumbai.address
}

const Mumbai = {
    token_address: TokenMumbai.address,
    contract_name: 'MyOFT',
    peerChain_target: EndpointId.SKALE_V2_TESTNET,
    peerAddress: TokenEuropa.address
}

async function SetPeer() {

    let target_chain

    if(hre.network.name == 'mumbai'){
        target_chain = Mumbai
    }
    else if(hre.network.name == 'europa'){
        target_chain = Europa
    }

    const target = target_chain.token_address
    const peer = target_chain.peerAddress

    const TestTokenFactory = await hre.ethers.getContractFactory(target_chain.contract_name)

    const TokenContract = TestTokenFactory.attach(target)

    const peerAddress = utils.zeroPad(peer, 32)

    const peerChainId = target_chain.peerChain_target

    console.log(`Setting peer on ${peerChainId} to ${peerAddress}`)
    await TokenContract.setPeer(peerChainId, peerAddress)

    console.log('Peer set!')
}

SetPeer()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
    });