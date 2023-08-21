<script>
	import NavBar from '$lib/NavBar.svelte';
	import Bio from '$lib/Bio.svelte';
	import Content from '$lib/Content.svelte';
	// import Sites from '$lib/Sites.svelte';
	import Welcome from '$lib/Welcome.svelte';
</script>

<svelte:head>
	<meta property="og:type" content="article" />
	<meta property="og:title" content="Richard Gottleber" />
	<meta property="og:description" content="See what Richard is up to" />
	<meta property="og:url" content="https://therg.dev" />
	<meta property="og:image" content="https://therg.dev/SocialCard.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="https://therg.dev" />
	<meta name="twitter:title" content="Richard Gottleber" />
	<meta name="twitter:description" content="See what Richard is up to" />
	<meta name="twitter:image" content="https://therg.dev/SocialCard.png" />
</svelte:head>
<NavBar />
<Welcome />
<Bio />
