import { HardhatUserConfig } from "hardhat/config";
import { HttpNetworkUserConfig } from "hardhat/types";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy"


const infuraNetwork = (
	accounts: any, 
	network: string,
	chainId?: number,
	gas?: number
): HttpNetworkUserConfig => {
	return {
		url: `https://${network}.infura.io/v3/${process.env.PROJECT_ID}`,
		chainId,
		gas,
		accounts,
		gasPrice: 200000000000,
	}
}

const config: HardhatUserConfig = {
  solidity: {
		compilers: [
			{
				version: "0.8.9",
				settings: {
					optimizer: {
						enabled: true
					},
				},
			}
		],
	},
  networks: {
		mainnet: infuraNetwork(
			process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [], 
			"mainnet", 
			1, 
			6283185,
		),
		// goerli: infuraNetwork(
		// 	process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [], 
		// 	"goerli", 
		// 	5, 
		// 	6283185
		// )
		goerli: {
            url: "https://rpc.ankr.com/eth_goerli",
            chainId: 5,
            gas: 6283185,
			accounts: process.env.PRIVATE_KEY !== undefined ? [`0x${process.env.PRIVATE_KEY}`] : []
        }
	},
  paths: {
    artifacts: "artifacts",
    deploy: "deploy",
    deployments: "deployments",
  },
  typechain: {
    outDir: "src/types",
    target: "ethers-v5",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
  },
  etherscan: {
	  apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
