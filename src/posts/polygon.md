---
title: Polygon
slug: polygon
date: 2021-10-31
description: What is Polygon?
tags:
  - Web3
  - Polygon
published: true
---

I am still learning about L2 chains for Ethereum.

## Death of a test net

Recently, the [Rinkeby](https://faucet.rinkeby.io/) faucet has dried up. RIP 💀 Well, it’s just straight broken, not so much dry. This caused a bit of a rETH drought. Given the state of the faucet, I ran out of ETH to test deploys within a short time. Enter [Görli](https://goerli.net/), I this test net is up and running and fully functional. I managed to deploy my contract there. It was expensive, though.

## Main Net Gas Fees

I checked the price to deploy the contract to [Görli,](https://goerli.net/) I realized it would cost around $80 to deploy the contract. While that’s not terrible, for a fun little side project that’s a bit much!

## Polygon?

I’ve heard that [polygon](https://polygon.technology/) is a great place to save fees for transactions. I set out to give it a try. This is where I ran into a few issues.

## Hardhat Config

I headed to the developer docs for [Mumbai](https://docs.polygon.technology/docs/develop/network-details/network). This is the name of the polygon testnet. After setting up hardhat, the contract wouldn’t deploy. This was a roadblock that stumped me for a while, and then I remember good old [Alchemy](https://www.alchemy.com/). After setting up my config with the following:

```js
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`0x${process.env.RINKEBY_PRIVATE_KEY}`],
    },
},
```

I was good to go!

The fees and speed of the Polygon network seem to be great. I’ve yet to go to the Mainnet. I am excited for it, though!
