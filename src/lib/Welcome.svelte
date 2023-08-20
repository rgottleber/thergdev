<script>
	let subtitles = [
		'Developer Advocate',
		'Speaker',
		'Web Developer',
		'Teacher',
		'Pretend Barista',
		'Life Long Learner',
		'Writer',
		'Corgi Connoisseur',
		'Web3 Enthusiast',
		'Svelte Devotee',
		'Dad Joker',
		'Photographer'
	];
	let subNum = 0;
	$: subtitle = 'Developer Advocate';
	let spinning = false;
	function changeSubtitle() {
		spinning = true;
		// wait .5 seconds before changing subtitle
		// let oldSubNum = subNum;
		// subNum = (subNum + 1) % subtitles.length;
		// subNum = Math.floor(Math.random() * subtitles.length);
		// if (subNum === oldSubNum) {
		// 	changeSubtitle();
		// 	return;
		// }
		subNum === subtitles.length - 1 ? (subNum = 0) : subNum++;
		setTimeout(() => {
			subtitle = subtitles[subNum];
			spinning = false;
		}, 499);
	}
</script>

<div class="hero min-h-16 lg:pb-3">
	<div class="hero-content">
		<div class="grid content-center">
			<h1
				class="font-monolisabold text-center text-5xl text-[48px] lg:text-[171px] font-extrabold text-secondary"
			>
				Richard
			</h1>
			<h1 class="font-monolisabold text-center text-4xl lg:text-9xl font-extrabold">
				<span class="inverted-colors">Gottleber</span>
			</h1>
			<h2 class="font-monolisabold text-xl lg:text-5xl text-secondary text-center pt-6">
				<span class="text-success">{subtitle}</span>
			</h2>
			<div class="mt-2 grid justify-center">
				<img
					src="refresh.svg"
					alt="refresh subtitle"
					on:click={changeSubtitle}
					class="w-10 lg:w-12 {spinning ? 'spinner' : 'slowspin'}"
				/>
			</div>
			<div class="grid justify-center -mb-10">
				<div class="clickme">
					<img
						src="pointer.svg"
						alt="click refresh"
						on:click={changeSubtitle}
						class="w-6 lg:w-10 clickme"
					/>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.inverted-colors {
		color: #22212c;
		background-color: #9580ff;
	}
	/* spin one time */
	.spinner {
		animation: spin2 0.5s linear reverse;
	}
	.slowspin {
		animation: spin 10s linear 0s infinite reverse;
	}
	.clickme {
		animation: clickme 5s linear infinite;
	}
	/* spin animation */
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes spin2 {
		33% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes clickme {
		/* flash */

		0% {
			opacity: 0;
			transform: translateY(0px);
		}
		20% {
			opacity: 0;
		}
		35% {
			/* shift up */
			transform: translateY(-10px);
		}
		50% {
			opacity: 1;
			/* shift down */
			transform: translateY(0px);
		}
		65% {
			/* shift up */
			transform: translateY(-10px);
		}
		80% {
			opacity: 0;
			transform: translateY(0px);
		}
		100% {
			opacity: 0;
		}
	}
</style>
