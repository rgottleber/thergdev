<script lang="ts">
	import publicContent from '../content.json';
	publicContent.sort(function (a, b) {
		// Turn your strings into dates, and then subtract them
		// to get a value that is either negative, positive, or zero.
		return Date.parse(b.published) - Date.parse(a.published);
	});
	function color(type: string) {
		switch (type) {
			case 'Blog':
				return 'secondary';
			case 'Video':
				return 'error';
			case 'Short':
				return 'error';
			case 'Webinar':
				return 'info';
			case 'Conference Talk':
				return 'success';
			default:
				return 'secondary';
		}
	}
	//format date
	function formatDate(date: string) {
		const d = new Date(date);
		// add one day to date d
		d.setDate(d.getDate() + 1);
		return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
	}
</script>

<h1 class="text-center text-4xl lg:text-8xl font-monolisabold bg-base-200 pt-4">Around The Web</h1>
<h1 class="uppercase text-center text-md lg:text-2xl font-monolisaregular bg-base-200 pb-4 lg:pb-8">
	what Richard has been up to
</h1>
<div
	class="bg-base-200 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-center justify-items-center pb-12 p-6"
>
	{#each publicContent as content}
		<div
			class="card w-64 sm:w-96 shadow-md bg-base-100 shadow-{color(
				content.type
			)} font-monolisaregular"
		>
			<a href={content.url} target="_blank">
				<div class="card-body">
					<div>
						<div>{content.type}</div>
						<h2 class="card-title pb-8 grad-{color(content.type)} font-monolisabold">
							{content.title}
						</h2>
					</div>

					<div class="card-actions justify-between">
						<div class="badge badge-{color(content.type)} self-baseline">{content.where}</div>
						<div class="badge badge-ghost">{formatDate(content.published)}</div>
					</div>
				</div>
			</a>
		</div>
	{/each}
</div>

<style>
	.grad-secondary {
		background-image: linear-gradient(45deg, #9580ff, #80ffea);
		background-size: 100%;
		-webkit-text-fill-color: transparent;
		-moz-text-fill-color: transparent;
		background-clip: text;
		-webkit-background-clip: text;
		-moz-background-clip: text;
		-webkit-box-decoration-break: clone;
		box-decoration-break: clone;
	}
	.grad-error {
		background-image: linear-gradient(45deg, #ff9580, #ffff80);
		background-size: 100%;
		-webkit-text-fill-color: transparent;
		-moz-text-fill-color: transparent;
		background-clip: text;
		-webkit-background-clip: text;
		-moz-background-clip: text;
		-webkit-box-decoration-break: clone;
		box-decoration-break: clone;
	}
	.grad-info {
		background-image: linear-gradient(45deg, #80deea, #8aff80);
		background-size: 100%;
		-webkit-text-fill-color: transparent;
		-moz-text-fill-color: transparent;
		background-clip: text;
		-webkit-background-clip: text;
		-moz-background-clip: text;
		-webkit-box-decoration-break: clone;
		box-decoration-break: clone;
	}
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
