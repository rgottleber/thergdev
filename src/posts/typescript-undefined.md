---
title: TypeScript Undefined
slug: typescript-undefined
description: Dealing with the undefined possibilities in TypeScript
date: 2021-05-11
tags:
  - TypeScript
---
Types are great unless they don’t know what they are.

Have you ever seen an issue like this?
```ts
TS2532: Object is possibly 'undefined'.
```

There are several ways to deal with this issue.

Lets set up an example

```ts
function returnString (str: string) {
	return string
}

const val = 'qwerty' as string | undefined;
```

Here you have a function that is expecting a string and a value that is a string or undefined. While you know it’s a string, typescript knows it _could_ be undefined as well.

If you try this

```ts
returnString(val)
```

It will throw the error

```ts
TS2532: Object is possibly 'undefined'.
```

How do you deal with this?

## 1. Check with an IF
The first method to ensure that a value is not undefined is via an `if`

```ts
if (val) {
	returnString(val)
}
```

This will only log if value is defined as something. It is the simplest check. This can still have issues though. What if val is a `number`? 

```ts
if (typeof val === 'string') {
	returnString(val)
}
```

This is a safer check, now you know that you not only have a defined value but it is also a `string`.

## 2. Set a default
TypeScript is smart enough to know when a value won’t fit the type required. In that case you can set a default.

```ts
returnString(val || 'asdf')
```

In this case you will get the string in `val` or the default of `asdf` if `val` is not a string.

Another way to accomplish the same thing is to check for _falsy_ values. `false, undefined, null, 0, NaN` 

```ts
returnString(val ?? 'asdf')
```

If the value is _falsy_ then the default will be used. 

## 3. Tell TypeScript you know best
There are two methods of letting the compiler know that you are _certain_ the value of a variable will be what you expect. 

Say it with **!**
```ts
returnString(val!)
```

The `!` is known as the non-null assertion operator. It lets the compiler know there is _no way_ the value will be undefined or null. 

The second way is to tell it the type as you use the value.

```ts
returnString(val as string)
```

Again, this is telling the compiler you know best and there is _no way_ this is anything but a string.

**Use these with caution**.

