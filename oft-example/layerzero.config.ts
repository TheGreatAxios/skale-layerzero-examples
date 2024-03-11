// eslint-disable-next-line @typescript-eslint/no-var-requires
import { EndpointId } from '@layerzerolabs/lz-definitions'
import TokenMumbai from './deployments/mumbai/MyOFT.json'
import TokenEuropa from './deployments/europa/MyOFT.json'
import TokenCelo from './deployments/celo/MyOFT.json'
import TokenFantom from './deployments/fantom/MyOFT.json'

const celoContract = {
    eid: EndpointId.CELO_V2_TESTNET,
    contractName: 'MyOFT',
    contractAddress: TokenCelo.address,
}

const fantomContract = {
    eid: EndpointId.FANTOM_V2_TESTNET,
    contractName: 'MyOFT',
    contractAddress: TokenFantom.address,

}

const mumbaiContract = {
    eid: EndpointId.POLYGON_V2_TESTNET,
    contractName: 'MyOFT',
    contractAddress: TokenMumbai.address,
}

const skaleContract = {
    eid: EndpointId.SKALE_V2_TESTNET,
    contractName: 'MyOFT',
    contractAddress: TokenEuropa.address,
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
