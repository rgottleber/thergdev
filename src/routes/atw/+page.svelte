<script>
	import NavBar from '$lib/NavBar.svelte';
	import Content from '$lib/Content.svelte';
</script>

<svelte:head>
	<meta property="og:type" content="article" />
	<meta property="og:title" content="Richard Gottleber" />
	<meta property="og:description" content="See what Richard is up to" />
	<meta property="og:url" content="https://therg.dev/atw" />
	<meta property="og:image" content="https://therg.dev/SocialCard.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="https://therg.dev/atw" />
	<meta name="twitter:title" content="Richard Gottleber" />
	<meta name="twitter:description" content="See what Richard is up to" />
	<meta name="twitter:image" content="https://therg.dev/SocialCard.png" />
</svelte:head>
<NavBar />
<Content />
