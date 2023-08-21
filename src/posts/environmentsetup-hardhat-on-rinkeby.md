---
title: Environment Setup - Hardhat on Rinkeby
slug: environmentsetup-hardhat-on-rinkeby
date: 2021-09-29
description: Setting up my web3 development environment
tags:
  - Web3
  - Hardhat
published: true
---

Create a project directory

```bash
mkdir my_solidity_project
cd my_solidity_project
```

Initialize the directory with npm

```bash
npm init -y
```

Install hardhat

```bash
npm install --save-dev hardhat
```

Initialize the project

```bash
npx hardhat
```

It will probably look something like this

```bash
❯ npx hardhat
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.6.4 👷‍

? What do you want to do? …
❯ Create a basic sample project
  Create an advanced sample project
  Create an empty hardhat.config.js
  Quit
```

If you choose sample project, it will create the basic directory structure that we need. I picked that option.

Install dotenv to keep keys secure

```bash
npm install dotenv
```

This will enable us to store our keys locally, but they won’t be included in our git repository. Double check that you have `.env` listed in the `.gitignore` which hardhat created.

Create a `.env` file

```bash
RINKEBY_PRIVATE_KEY = "YOUR_KEY_HERE"
ALCHEMY_API_KEY = "YOUR_API_KEY_HERE"
```

## Getting these keys

### `ALCHEMY_API_KEY`

[https://www.alchemy.com/](https://www.alchemy.com/)
Sign up for an account and create a project
Select view key, your `ALCHEMY_API_KEY` will be the value after `https://eth-rinkeby.alchemyapi.io/v2/`

### `RINKEBY_PRIVATE_KEY`

To export your private key from Metamask, open Metamask and go to Account Details \> Export Private Key
**Be aware of NEVER putting real Ether into testing accounts**

Setup `hardhat.config.js` for Rinkeby deploy

```js
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config();
require('@nomiclabs/hardhat-waffle');
module.exports = {
	solidity: '0.8.4',
	networks: {
		rinkeby: {
			url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
			accounts: [`0x${process.env.RINKEBY_PRIVATE_KEY}`]
		}
	}
};
```

## A quick contract to ensure deploy works

This contract, which hardhat supplies, is a sample project. You should remove this file when you get going.

```js
// contracts/Greeter.sol
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
}
```

## Deployment script

This script comes from the sample project as well. I would personally rename it to deploy.js as that’s its real function.

```js
// scripts/sample-script.js
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat');

async function main() {
	// Hardhat always runs the compile task when running scripts with its command
	// line interface.
	//
	// If this script is run directly using `node` you may want to call compile
	// manually to make sure everything is compiled
	// await hre.run('compile');

	// We get the contract to deploy
	const Greeter = await hre.ethers.getContractFactory('Greeter');
	const greeter = await Greeter.deploy('Hello, Hardhat!');

	await greeter.deployed();

	console.log('Greeter deployed to:', greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
```

## Deploy!

This will deploy the greeter contract to the Rinkeby test network.

```bash
npx hardhat run scripts/sample-script.js --network rinkeby
```
