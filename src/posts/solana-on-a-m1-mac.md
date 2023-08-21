---
title: Solana On An M1 Mac
slug: solana-on-a-m1-mac
date: 2021-11-10
description: How do you run Solana on a M1 Mac? I'm going through the buildspace solana project and need to get my M1 Mac to run anchor. Here's how I did it.
tags:
  - Web3
  - Solana
  - M1
published: true
---

I started the [buildspace](https://buildspace.so/) Solana project this week. I planned to be done with it but ran into some bumps along the way. This was going to be a MUCH longer post but thanks to the collective effort of the TAs and community at large. Once again, this community amazes me with the willingness to help others!

Enough story time. As of today, the best/easiest way to get Solana development running on an M1 Mac.

## Installing Solana

To use the arm version of Solana, we are going to build it from scratch

Hit up [The Solana Docs](https://docs.solana.com/cli/install-solana-cli-tools#build-from-source) and follow the build from source first step.

**DO NOT** run `solana-install init` we are going to do something different.

**DO** put the unzipped file in a reasonable location, you are going to need to keep that directory around for a while.

Once we have the build completed, we need to go into the `sdk` directory

```bash
cd sdk/cargo-build-bpf
cargo install --path .
```

This will install the `cargo-build-bpf` program to `~/.cargo/bin`

Next we need to create a link to the SDK folder for cargo as well. `$PROJECT_ROOT` should be the location of the current Solana directory.

```bash
ln -s $PROJECT_ROOT/bin/sdk ~/.cargo/bin/sdk
```

Once we have Solana ready to go, we should doublecheck

```bash
solana --version
```

If you don’t have [homebrew](https://brew.sh/) installed, take a moment to do that. Also install coreutils (This will solve the `greadlink: command not found` issue if you run into that)

```bash
brew install coreutils
```

Setup Solana for running locally

```bash
solana config set --url localhost
```

At this point, we should be able to run

```bash
solana-test-validator --no-bpf-jit
```

And see something like

```bash
❯ ~ solana-test-validator --no-bpf-jit

Ledger location: test-ledger
Log: test-ledger/validator.log
Identity: 6cfpMfGtsAqunxFkw2uS6ksxbc3Wu2HkTnYuZaouTVZk
Genesis Hash: SkHaD52opQhEhB2E34LgZBCLn54uE7a4WwFfXGNGMtf
Version: 1.8.2
Shred Version: 2336
Gossip Address: 127.0.0.1:1024
TPU Address: 127.0.0.1:1027
JSON RPC URL: http://127.0.0.1:8899
⠐ 00:00:05 | Processed Slot: 9 | Confirmed Slot: 9 | Finalized Slot: 0 | Snapsho
❯ ~
```

## Node and Mocha

If you don’t have node installed, you can do

```bash
brew install node
```

Which will get it up and running, and then we need to install the Mocha test framework

```bash
npm install -g mocha
```

## Anchor, the Hardhat of Solana

Next we need to install Anchor, we are _almost_ there!

```bash
cargo install --git https://github.com/project-serum/anchor anchor-cli --locked
```

At this point, we should be able to run

```bash
anchor --version
```

Anchor needs a few npm packages

```bash
npm install @project-serum/anchor @solana/web3.js
```

If yarn isn’t installed, you will need it too

```bash
brew install yarn
```

## Setup A Project

Anchor can create a scaffold for a project for you

```bash
anchor init myproject --javascript
cd myproject
```

The current issue with Anchor on M1 is that the test validator it runs won’t work. You might see this error when you run `anchor test`

```bash
FetchError: request to http://localhost:8899/ failed
```

To side step this, you need to run the following command in a separate window.

```bash
solana-test-validator --no-bpf-jit
```

Additionally, we need to get the address from Solana. If you haven’t, generate a new key pair.

```bash
solana-keygen new -o target/deploy/myproject-keypair.json
```

Then get the key address and store it in `Anchor.toml` in the project root

```bash
solana address -k target/deploy/myproject-keypair.json
```

At this point, we should be good to run

```bash
anchor test --skip-local-validator
```

You should see 1 passing test!

HUZZAH, we’ve jumped through all the hoops and can develop locally on our spiffy M1 Mac!
