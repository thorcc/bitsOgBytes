<script>
	let antBit = 1;
	let desimal = 0;
	let bits;
	let ascii;
	$: ascii =
		desimal > 30 && desimal < 128 ? String.fromCharCode(desimal) : "N/A";
	$: bits = desimalTilBinaer(desimal).split("");

	$: {
		if (bits.length < antBit) {
			bits.unshift("0");
		} else if (bits.length > antBit) {
			bits.shift();
		}
		bits = [...bits];
	}
	$: {
		if(visFaktorer)
			visLys = false;
	}

	let visLys = true;
	let visBits = true;
	let visDesimal = false;
	let visBytes = false;
	let visAscii = false;
	let visFaktorer = false;

	const bytt = (i) => {
		bits[i] = bits[i] === "1" ? "0" : "1";
		desimal = binaerTilDesimal(bits);
	};

	const binaerTilDesimal = (tall) => {
		let sum = 0;
		for (let i = 0; i < tall.length; i += 1) {
			if (tall[i] === "1") {
				sum += 2 ** (tall.length - i - 1);
			}
		}
		return sum;
	};
	const desimalTilBinaer = (tall) => {
		let sum = "";
		while (tall > 2 ** antBit - 1) {
			antBit += 1;
		}
		for (let i = antBit - 1; i >= 0; i -= 1) {
			sum += String(Math.floor(tall / 2 ** i));
			tall = tall % 2 ** i;
		}
		return sum;
	};
</script>

<style>
	h1 {
		text-align: center;
	}
	.antBits {
		display: flex;
		justify-content: center;
	}
	.bits {
		display: flex;
		align-items: center;
		gap: 10px;
		justify-content: center;
		flex-wrap: wrap;
		width: 100%;
	}
	.bits h2 {
		text-align: center;
	}
	.usynlig {
		opacity: 0;
	}
	.info {
		border: solid rgba(0, 0, 0, 0.4) 0.2px;
		padding: 5px;
		margin: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.bit {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		gap: 10px;
	}
	.bitOptions {
		display: flex;
		flex-direction: column;
	}
	.bitOptions img {
		cursor: pointer;
	}
	.bitOptions img:hover {
		transform: scale(0.9);
	}
	.info p,
	.info h3,
	.info h4 {
		margin: 0;
	}
	.inforamme {
		width: 132px;
		margin: auto;
	}
	.bitramme {
		cursor: pointer;
	}
	.bilderamme {
		width: 100px;
		overflow: hidden;
		position: relative;
	}
	.tekst {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	img {
		width: 200px;
	}
	.icon {
		width: 24px;
	}
	.paa {
		margin-left: 0;
	}
	.av {
		margin-left: -100px;
	}
	.lysPaa {
		margin-left: -107.85px;
	}
	.lysAv {
		margin-left: 0;
	}
	.lysRamme {
		width: 107.85px;
		overflow: hidden;
	}
	input[type="number"] {
		width: 100px;
		margin: 0px;
	}
	.valgramme {
		position: relative;
	}
	.options {
		position: absolute;
		top: 0;
		left: 10px;
		width: max-content;
		border: solid 0.1px rgba(0, 0, 0, 0.4);
		padding: 5px;
	}
	@media(max-width: 700px){
		.options{
			position: relative;
		}
	}
</style>

<main>
	<h1>Bits og bytes</h1>
	<div class="inforamme">
		<div class="info antBits bit {visBits ? '' : 'usynlig'}">
			<div>
				<p>{antBit === 1 ? 'Bit' : 'Bits'}</p>
				<h3>{antBit}</h3>
			</div>
			<div class="bitOptions">
				<img
					on:click={() => (antBit += 1)}
					class="icon"
					src="add.png"
					alt="" />
				<img
					on:click={() => (antBit -= 1)}
					class="icon"
					src="minus.png"
					alt="" />
			</div>
		</div>
		<div class="info antBits {visBytes ? '' : 'usynlig'}">
			<p>Bytes</p>
			<h3>{Math.floor(antBit / 8)}</h3>
		</div>
	</div>

	<div class="bits">
		{#each bits as bit, i}
			<div class="bitramme" on:click={() => bytt(i)}>
				<div class="bilderamme">
					<div class="tekst">{bit === '1' ? 'På' : 'Av'}</div>
					<img
						class={bit === '1' ? 'paa' : 'av'}
						src="bryter.svg"
						alt="bryter" />
				</div>
				{#if visFaktorer}
					<h2>{bit} * {2 ** (antBit - i - 1)}</h2>
				{:else if visLys}
					<div class="lysRamme">
						<img
							class={bit === '1' ? 'lysPaa' : 'lysAv'}
							src="lys.svg"
							alt={bit} />
					</div>
				{:else}
					<h2>{bit}</h2>
				{/if}
			</div>
		{/each}
	</div>
	<div class="valgramme">
		<div class="inforamme">
			<div class="info {visDesimal ? '' : 'usynlig'}">
				<p>Desimaltall</p>
				<h3><input type="number" bind:value={desimal} min="0" /></h3>
			</div>
			<div class="info {visAscii ? '' : 'usynlig'}">
				<p>ASCII</p>
				<h4>{ascii}</h4>
			</div>
		</div>
		<div class="options">
			<h3>Valg</h3>
			<div class="valg">
				<label>
					<input type="radio" bind:group={visLys} value={true} />
					<span>Lys</span>
					<input type="radio" bind:group={visLys} value={false} />
					<span>Tall</span>
				</label>
				<label>
					<input type="checkbox" bind:checked={visBits} />
					<span>bits</span>
				</label>
				<label>
					<input type="checkbox" bind:checked={visBytes} />
					<span>bytes (1 byte = 8 bits)</span>
				</label>
				<label>
					<input type="checkbox" bind:checked={visDesimal} />
					<span>desimal</span>
				</label>
				<label>
					<input type="checkbox" bind:checked={visFaktorer} />
					<span>faktorer</span>
				</label>
				<label>
					<input type="checkbox" bind:checked={visAscii} />
					<span>ASCII</span>
				</label>
			</div>
		</div>
	</div>
</main>
