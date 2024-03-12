import assert from 'assert'
import { type DeployFunction } from 'hardhat-deploy/types'

const newContractName = 'NewOFT'
const existingContractName = 'ExistingOFT'

// existing tokens lives in mumbai testnet on this example
const existingContractAddress = '0xFcd2f5cEa3e45A5f0Ed0b177a488AC0c544f5f72'


const deploy: DeployFunction = async (hre) => {
    const { getNamedAccounts, deployments } = hre

    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    assert(deployer, 'Missing named deployer account')

    let contractName

    console.log(`Network: ${hre.network.name}`)
    console.log(`Deployer: ${deployer}`)

    if (hre.network.name !== 'mumbai') {
        contractName = newContractName
        const endpointV2Deployment = await hre.deployments.get('EndpointV2')

        const { address } = await deploy(contractName, {
            from: deployer,
            args: [
                'NewOFT', // name
                'NOFT', // symbol
                endpointV2Deployment.address, // LayerZero's EndpointV2 address
                deployer, // owner
            ],
            log: true,
            skipIfAlreadyDeployed: false,
            gasLimit: 3000000,
        })
    
        console.log(`Deployed contract: ${contractName}, network: ${hre.network.name}, address: ${address}`)

    }
    else {
        contractName = existingContractName

        const endpointV2Deployment = await hre.deployments.get('EndpointV2')

        const { address } = await deploy(contractName, {
            from: deployer,
            args: [
                existingContractAddress, // existing contract address
                endpointV2Deployment.address, // LayerZero's EndpointV2 address
                deployer, // owner
            ],
            log: true,
            skipIfAlreadyDeployed: false,
            gasLimit: 3_000_000
        })
        console.log(`Deployed contract: ${contractName}, network: ${hre.network.name}, address: ${address}`)
    }
}

deploy.tags = [newContractName, existingContractName]

export default deploy
