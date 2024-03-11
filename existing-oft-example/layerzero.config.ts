// eslint-disable-next-line @typescript-eslint/no-var-requires
import { EndpointId } from '@layerzerolabs/lz-definitions'
import TokenMumbai from './deployments/mumbai/ExistingOFT.json'
import TokenEuropa from './deployments/europa/NewOFT.json'
//import TokenCelo from './deployments/celo/MyOFT.json'
//import TokenFantom from './deployments/fantom/MyOFT.json'

const celoContract = {
    eid: EndpointId.CELO_V2_TESTNET,
    contractName: 'NewOFT',
    contractAddress: '',
    existingTokenName: '',
    existingTokenAddress: '',
}

const fantomContract = {
    eid: EndpointId.FANTOM_V2_TESTNET,
    contractName: 'NewOFT',
    contractAddress: '',
    existingTokenName: '',
    existingTokenAddress: '',
}

const mumbaiContract = {
    eid: EndpointId.POLYGON_V2_TESTNET,
    contractName: 'ExistingOFT',
    contractAddress: TokenMumbai.address,
    existingTokenName: 'TheExistingToken',
    existingTokenAddress: '0xFcd2f5cEa3e45A5f0Ed0b177a488AC0c544f5f72',
}

const skaleContract = {
    eid: EndpointId.SKALE_V2_TESTNET,
    contractName: 'NewOFT',
    contractAddress: TokenEuropa.address,
    existingTokenName: '',
    existingTokenAddress: '',
}

export default {
    contracts: {
        celo: celoContract,
        fantom: fantomContract, 
        mumbai: mumbaiContract,
        europa: skaleContract,
    },
    connections: [
        {
            from: fantomContract,
            to: celoContract,
            config: {},
        },
        {
            from: fantomContract,
            to: mumbaiContract,
        },
        {
            from: fantomContract,
            to: skaleContract
        },
        {
            from: celoContract,
            to: fantomContract,
        },
        {
            from: celoContract,
            to: mumbaiContract,
        },
        {
            from: celoContract,
            to: skaleContract
        },
        {
            from: mumbaiContract,
            to: celoContract,
        },
        {
            from: mumbaiContract,
            to: fantomContract,
        },
        {
            from: mumbaiContract,
            to: skaleContract
        },
        {
            from: skaleContract,
            to: fantomContract
        },
        {
            from: skaleContract,
            to: mumbaiContract
        },
        {
            from: skaleContract,
            to: celoContract
        }
    ],
}
