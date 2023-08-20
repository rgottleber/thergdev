<script lang="ts">
	import BioText from '$lib/BioText.svelte';
</script>

<div
	class="justify-center grid grid-cols-1 lg:flex lg:flex-row-reverse lg:content-between lg:grid-cols-2 text-base-100 grad py-8 lg:py-16 w-full lg:text-xl"
>
	<div>
		<div class="flex justify-center mask mask-hexagon mt-4 mb-4 w-full lg:mb-16 content center">
			<div class="px-20 justify-center">
				<img src="Covatar.png" alt="Me" class=" max-h-[20rem] lg:max-h-[48rem]" />
			</div>
		</div>
	</div>
	<div class="flex content px-10 w-full">
		<div class="mt-16 md:mt-20 xl:mt-24"><BioText /></div>
	</div>
</div>

<style>
	.grad {
		background: linear-gradient(45deg, #8aff80, #80ffea);
	}
</style>
