<script lang="ts">
	export let data;
</script>

<div class="container w-full md:max-w-3xl mx-auto pt-2 font-iawriter">
	{#each data.posts as post}
		<div class="w-full px-4 md:px-6 text-xl leading-normal">
			<!--Title-->
			<div>
				<a href={`/posts/${post.slug}`}>
					<h1
						class="font-bold font-iawriter break-normal text-success hover:text-accent pt-6 pb-2 text-3xl md:text-5xl"
					>
						{post.title}
					</h1>
				</a>
				<p class="text-sm md:text-base font-normal text-secondary">
					{new Date(post.date).toDateString()}
				</p>
			</div>
			{post.description}
			<a href={`/posts/${post.slug}`}>
				<div class="text-right text-secondary hover:text-accent">Read More →</div>
			</a>

			<!--Tags -->
			<div class="text-base md:text-sm py-6">
				Tags:
				{#each post.tags as tag}
					<a href="#" class="text-base md:text-sm text-success no-underline hover:underline"
						>{tag}
					</a>
				{/each}
			</div>
		</div>
	{/each}
</div>
