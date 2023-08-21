---
title: Solidity Contract Optimization
slug: solidity-contract-optimization
date: 2021-10-07
description: Story time about understanding… Or how DYOR helped me learn more.
tags:
  - Solidity
  - Web3
published: true
---

Yesterday I came across a great little YouTube Video by [Smart Contract Programmer](https://www.youtube.com/channel/UCJWh7F3AFyQ_x01VKzr9eyA). In this video, they covered a quick and fairly easy way to reduce the size of your solidity code if you are bumping up against the code size limit. [Simple Trick to Reduce Solidity Code Size](https://www.youtube.com/watch?v=XDqD3X8DCiw).

In an effort to understand what was actually occurring and why the code was smaller, I opened up the [Solidity Website](https://soliditylang.org/). I tried out the example and something just wasn’t adding up.

## YMMV ??

When using the compiler on the website, I saw the code size actually increase?! Using the modifier alone resulted in the size of the byte code being **968** characters.

```js
modifier onlyOwner() {
  _onlyOwner();
  _;
}
```

I changed update the modifier to call an internal function. The size _JUMPED_ to **984** characters?

```js
function _onlyOwner() private view{
  require(msg.sender == owner);
}
modifier onlyOwner() {
  _onlyOwner();
  _;
}
```

What was going on? Had I been deceived?

## Digging Deeper

I reached out to [Smart Contract Programmer](https://twitter.com/ProgrammerSmart) on Twitter. The response was quick, we both started digging into versions of the compiler we used as we tried to figure out what was going on.

### A side note 🤝

Twitter can be super terrible, but the ability to collaborate with others in a new space is seriously a superpower. Shout out to [Smart Contract Programmer](https://twitter.com/ProgrammerSmart) for the quick response and talking through all of this. You are awesome!

## Trying A Few Things

Step one was to fire up [Remix](https://remix.ethereum.org/). This is what the example used, so I did that and on version 0.8.7 I received the same result as was expected based on the video. 🤔 Perhaps this caused the issue?

### Release Notes

I started digging into the [release notes](https://github.com/ethereum/solidity/releases) for solidity, trying to see if there was an optimization that occurred between 0.8.7 and 0.8.9. Nothing stood out. Where was this difference coming from?

### Hardhat

I decided to try things out on my machine. I fired up a new [Hardhat](https://hardhat.org/) project, set the version to 0.8.7 and put in the code. Not only that, but I saw the same results as [Remix](https://remix.ethereum.org/). I changed versions and still the same thing. Was the version of the compiler on the [Solidity Website](https://soliditylang.org/) performing some sort of wizardry?

## 🧙‍♂️

It turns out, the answer is yes, sort of. I need to acknowledge that the purpose of the compiler solidity provides on their site is not a viable solution for doing actual work. There are limited options, and it just spits out the byte code and assembly. While I was looking at [Remix](https://remix.ethereum.org/) again, I noticed something strange. A checkbox titled _Enable optimization_ in the compiler options. 🧐 What was this? I clicked it on and like magic, the byte code matched what I saw on the solidity site!

## Solidity Optimizer

A bit of _Duck Duck Go-ing_ and I found [a post from 2020](https://blog.soliditylang.org/2020/11/04/solidity-ama-1-recap/) which goes into depth on the solidity optimizer. I’ll be digging into this more in the future to understand what is going on, but the bit that stands out.

> The optimizer tries to simplify complicated expressions (which reduces both size and execution cost), but it also specializes or inlines functions. Especially function inlining is an operation that can cause much bigger code, but it is often done because it results in opportunities for more simplifications.

It appears that the optimizer does an even better job than simply inlining modifier functions. While I can understand the trade off that manually inlining the function has, I will need to understand how Yul works to optimize things.

This was a fun adventure into compilers and how things can change if you don’t fully understand what’s going on.
