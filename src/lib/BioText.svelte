<script>
	$: length = 2;
	let bioTxt = [
		' is a Developer Advocate.',
		' is a teacher masquerading as a Developer Advocate.',
		' is a teacher masquerading as a Developer Advocate. <br/><br/>He began his career behind a support desk and worked on the entire technical stack from system administration to front-end development, with a pit-stop as a 5th-grade math and science teacher.',
		' is a teacher masquerading as a Developer Advocate. <br/><br/>He began his career behind a support desk and worked on the entire technical stack from system administration to front-end development, with a pit-stop as a 5th-grade math and science teacher. He breaks down complex topics and shares terrible dad jokes.',
		' is a teacher masquerading as a Developer Advocate. <br/><br/>He began his career behind a support desk and worked on the entire technical stack from system administration to front-end development, with a pit-stop as a 5th-grade math and science teacher. He breaks down complex topics and shares terrible dad jokes.<br/><br/>When he isn’t helping developers, you can find him cooking pizza or trying not to crash his FPV drone.'
	];
</script>

<div class="font-monolisaregular">Adjust Bio Length:</div>
<div class="flex justify-evenly w-full md:w-96 pt-3 pb-1">
	<input bind:group={length} type="radio" name="biolen" value={0} class="radio radio-secondary" />
	<input bind:group={length} type="radio" name="biolen" value={1} class="radio radio-secondary" />
	<input bind:group={length} type="radio" name="biolen" value={2} class="radio radio-secondary" />
	<input bind:group={length} type="radio" name="biolen" value={3} class="radio radio-secondary" />
	<input bind:group={length} type="radio" name="biolen" value={4} class="radio radio-secondary" />
</div>
<div class="font-monolisaregular flex justify-between text-xs w-full md:w-96">
	<div>shortest</div>
	<div>longest</div>
</div>
<div>
	<p class="font-monolisaregular pt-3">
		<span class="font-monolisabold font-black">Richard Gottleber</span>{@html bioTxt[length]}
	</p>
</div>
