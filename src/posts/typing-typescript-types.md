---
title: Typing Typescript Types
slug: typing-typescript-types
description: Types are tricky, if you don't know them.
date: 2021-04-09
tags:
  - Typescript
  - JS
---

Types are tricky, if you don’t know them. Here is a quick breakdown of the most common types.

`string` - sting values ex: `“Hello World!”`
`boolean` - `true` or `false`.
`number` - any numerical value ex: `12` or `12.3` JavaScript doesn’t have the concept of `int` or `float` natively. When you need these, things get more complicated.
`array` - use `_type_[]` ex `string[]` for `[“a”, “b”, “c”]`
`any` - This is a _special_ type that will match any value. It’s useful when you don’t want type checking. If you are sure you know better than the type checker, use this. It’s often used as a catch-all.

## Type Inference

When assigning a variable, TypeScript can infer what type it is normally.
`const s = "Hello World"`
Declares `s` as a `string`. TypeScript can figure that out and the implicit type for `s` is `string`. When giving variables a value at declaration, this usually works.

> However, the possibility of TypeScript not knowing the type exists. When that happens, the implicit type becomes `any`. If you don’t want this behavior, it is possible to turn it off with `noImplicitAny`

## Functions

Functions need typed parameters as well as return types.

```js
function hello(planet: string): string {
  return "Hello, " + planet.toUpperCase() + "!";
}
```

```js
var hello = (planet: string): string => {
  return "Hello, " + planet.toUpperCase() + "!";
};
```

## Objects

Any JavaScript value with properties

```js
const coords = { x: number; y: number}
```

## Optional properties

Adding a `?` to a property makes it optional.

```js
let name = { first: string; last?: string}
// Both of these are OK
name = { first: "John" }
name = { first: "John", last: "Smith" }
```

## Type Aliases

Creating an alias for an object type

```js
type Name = {
  first: string;
  last: string;
}

function printName(n: Name) {
  console.log("The name's " + n.last +", " + n.first + " " + n.last + ".");
}

printName({first: "James", last: "Bond");
```

## Interface

Same as type alias with the exception that you can add to an interface.

```js
interface Name = {
  first: string;
  last: string;
}

function printName(n: Name) {
  console.log("The name's " + n.last +", " + n.first + " " + n.last + ".");
}

interface Name {
  idNumber: string // has to be string to have 007 :(
}
printName({first: "James", last: "Bond");
```
