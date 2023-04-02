import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { BigNumber } from "ethers"

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    console.log("deployer:", deployer)


    await deploy("Lock", {
        from: deployer,
        log: true,
        skipIfAlreadyDeployed: true,
        args: [
            1000
        ]
    })
}

export default func
export const tags = ["Lock"]
