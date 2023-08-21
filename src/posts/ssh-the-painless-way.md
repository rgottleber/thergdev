---
title: SSH the painless and more secure way in OS X
slug: ssh-the-painless-way
description: SSH on a new mac is annoying. I want security and laziness! What do I do?
date: 2021-02-09
tags:
  - ssh
  - OS X
---

I spent some time searching around for this solution because I thought that I remembered it. I recently did a fresh install on my laptop to clean things up a bit. In doing so I ended up blowing away my SSH key _DOH_ that was unfortunate. I needed to set things up again. I’m always torn between better security practices and ease of use. I wanted to avoid an empty passphrase on my SSH key. While pushing files to my git repo tonight I got really tired of typing my passphrase over and over. I knew I had done something in the past that enabled the system’s keychain to store my passphrase. For anyone out there that wants to do something similar here is the solution.

In your `~/.ssh/config` include the following
Host \*
UseKeychain yes
Yes it really is that simple! From here on OS X will hold the keys for you so your fingers can rest a bit each time you push to git or log in to a server.
