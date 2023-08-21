---
title: Create your own C function
slug: atoI-algorithm
description: Convert a string into a 32-bit signed integer with TypeScript
date: 2021-05-18
tags:
- Algorithms
- TypeScript
- deno
---

Whiteboard interviews. Love them or hate them, they are part of the hiring process these days. There is a sense of change in the air as the practice is starting to fall more out of favor. [Poteto][1] has an ever-growing list of companies that don’t use this practice. Many of these companies use take home projects which, in their own right, are problematic.

_Interviewing is hard, from both sides._

 Back to whiteboards. Defining novel functions may be a part of coding, doing so under pressure and with strange constraints isn’t normal. 

One of the best ways to keep this skill ready is to practice regularly. I’m working on that part.

Past me was averse to spending too much time on algorithm and data structure practice. I’ve realized it’s a great way to start learning a new language.

## Enter TypeScript

In my quest to become more fluent in TypeScript I’ve decided to pick it up via [leetcode][2]

## The Good Stuff

[8. String to Integer (atoi)][3]

> The algorithm for myAtoi(string s) is as follows:
> 1. Read in and ignore any leading whitespace.
> 2. Check if the next character (if not already at the end of the string) is '-' or '+'. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
> 3. Read in next the characters until the next non-digit charcter or the end of the input is reached. The rest of the string is ignored.
> 4. Convert these digits into an integer (i.e. "123" -\> 123, "0032" -\> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).
> 5. If the integer is out of the 32-bit signed integer range `[-231, 231 - 1]`, then clamp the integer so that it remains in the range. Specifically, integers less than -231 should be clamped to -231, and integers greater than 231 - 1 should be clamped to 231 - 1.
> 6. Return the integer as the final result.

Here is my go at this. 
```ts
function myAtoi(s: string): number {
  let result = 0;
  let isNegative = 1;
  let i = 0;
  let oneSign = false;

  // check for whitespace and ignore
  while (i < s.length) {
    if (s[i] === " ") {
      i++;
      continue;
    }
    break;
  }
  // check for negative
  if (s[i] === "-") {
    isNegative = -1;
    oneSign = true;
    i++;
  }
  // check for positive
  if (s[i] === "+") {
    if (oneSign) return result;
    i++;
  }
  //loop through rest
  for (; i < s.length; i++) {
    // check if number
    // if non number ignore the rest using unicode
    if (s[i].charCodeAt(0) < 48 || s[i].charCodeAt(0) > 57) break;
    // increment place value
    result *= 10;
    // nifty trick to subtract unicode value
    result += s[i].charCodeAt(0) - 48;
  }
  result *= isNegative;
  return (result > 2147483647)
    ? 2147483647
    : (result < -2147483648)
    ? -2147483648
    : result;
}
```

The part I found most interesting was a nifty trick to use unicode characters to determine the value.

```ts
for (; i < s.length; i++) {
    // check if number
    // if non number ignore the rest using unicode
    if (s[i].charCodeAt(0) < 48 || s[i].charCodeAt(0) > 57) break;
    // increment place value
    result *= 10;
    // nifty trick to subtract unicode value
    result += s[i].charCodeAt(0) - 48;
  }

```

This brings up an interesting point. In a whiteboard session would this be expected? Knowing the unicode values of characters off hand?🤔

[1]:	https://github.com/poteto/hiring-without-whiteboards
[2]:	https://leetcode.com
[3]:	https://leetcode.com/problems/string-to-integer-atoi/