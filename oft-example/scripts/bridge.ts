import { utils } from 'ethers'
import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { Options } from '@layerzerolabs/lz-v2-utilities'


export async function BridgeToken(originContract: any, destinationContract: any, amount: string) {

    const originAddress = originContract.contractAddress
    const originTokenFactory = await hre.ethers.getContractFactory(originContract.contractName)
    const OriginContract = originTokenFactory.attach(originAddress)

    const [owner] = await ethers.getSigners()

   const tokensToSend = utils.parseEther(amount)
   const destinationChainId = destinationContract.eid
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

   const [nativeFee] = await OriginContract.quoteSend(sendParam, false)
   console.log(`Sending ${amount} tokens from Contract A to Contract B`)

   let tx = await OriginContract.send(sendParam, [nativeFee, 0], owner.address, { value: nativeFee })
   console.log('Transfer successful!')

}
