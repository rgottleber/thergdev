<script lang="ts">
	import type { GetShareImageOptions } from '$lib/types';
	export let data;
	export let title: string = data.meta.title;
	export let date: string = data.meta.date;
	export let description: string = data.meta.description;
	export let content = data.content;
	import getShareImage from '@jlengstorf/get-share-image';
	const options: GetShareImageOptions = {
		title: title,
		tagline: description,
		cloudName: 'richardg',
		imagePublicID: 'v1657493138/SocialCard',
		titleFont: 'MonoLisa-Bold.ttf',
		taglineFont: 'MonoLisa-Regular.ttf',
		titleExtraConfig: '_black',
		textColor: 'F8F8F2',
		titleBottomOffset: 310,
		taglineTopOffset: 394,
		titleColor: '',
		taglineColor: ''
	};
	const socialImage = getShareImage(options);
</script>

<svelte:head>
	<meta property="og:title" content={title} />
	<meta property="og:type" content="article" />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={socialImage} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container w-full md:max-w-3xl mx-auto pt-2 font-iawriter pb-10 px-4 md:px-6">
	<h1 class="font-monolisabold break-normal text-success pt-6 pb-2 text-4xl md:text-6xl">
		{title}
	</h1>
	<p class="text-sm md:text-base font-normal text-secondary">
		Published: {new Date(date).toDateString()}
	</p>

	<div
		class="pt-4 prose lg:prose-xl prose-headings:text-accent prose-a:text-success prose-a:visited:text-success prose-a:no-underline prose-em:text-info prose-strong:text-warning prose-code:text-secondary"
	>
		<svelte:component this={content} />
	</div>
</div>
