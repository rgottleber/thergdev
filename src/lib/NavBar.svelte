<script>
	import { onMount } from 'svelte';

	onMount(() => {
		const encEmail = 'aGV5QHRoZXJnLmRldg==';
		const form = document.getElementById('contact');
		if (form) {
			form.setAttribute('href', 'mailto:'.concat(atob(encEmail)));
		}
	});
</script>

<div class="navbar bg-base-100 font-monolisaregular sticky top-0 z-50">
	<div class="navbar-start">
		<details class="dropdown">
			<summary class="m-1 btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</summary>
			<ul class="menu menu-sm dropdown-content mt-3 p-2 shadow rounded-box w-52 bg-base-100">
				<li><a class="text-2xl" href="/posts">Posts</a></li>
				<li><a class="text-2xl" href="/atw">Around The Web</a></li>
				<li><a class="text-2xl" href="https://twitter.com/thergdev" target="_blank">𝕏</a></li>
			</ul>
		</details>
		<a class="btn btn-ghost text-xl lg:text-4xl grad-success font-monolisabold" href="/">THΞ RG</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1 text-2xl">
			<li class="px-4"><a href="/posts">Posts</a></li>
			<li class="px-4"><a href="/atw">Around The Web</a></li>
			<li class="px-4"><a href="https://twitter.com/thergdev" target="_blank">𝕏</a></li>
		</ul>
	</div>
	<div class="navbar-end pr-4">
		<a id="contact" class="btn btn-accent" href="."
			><img src="/email.svg" width="30" height="30" />Say Hey!</a
		>
	</div>
</div>

<style>
	.grad-success {
		background-image: linear-gradient(45deg, #8aff80, #9580ff);
		background-size: 100%;
		-webkit-text-fill-color: transparent;
		-moz-text-fill-color: transparent;
		background-clip: text;
		-webkit-background-clip: text;
		-moz-background-clip: text;
		-webkit-box-decoration-break: clone;
		box-decoration-break: clone;
	}
</style>
