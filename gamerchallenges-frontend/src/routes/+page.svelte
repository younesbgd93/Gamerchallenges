<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcomeFallback from '$lib/images/svelte-welcome.png';
   import "bootstrap/dist/css/bootstrap.min.css";

</script>


<div class="hero-section">
  <h1>🎮 GamerChallenges</h1>
  <p>LA PLATEFORME ULTIME POUR LES DÉFIS GAMING !</p>
</div>
<style>
   :global(.navbar-nav) {
    margin-left: 0 !important;
    padding-left: 0 !important;
}

:global(.container-fluid) {
    padding-left: 0 !important;
    margin-left: 0 !important;
	    margin-left: 0 !important;
    margin-right: 0 !important;
}


    :global(.navbar) {
        margin-bottom: 20px;
        background-color: transparent !important;
        width: 100%;
		padding-left: 0 !important;
    padding-right: 0 !important

		
    }

    :global(.nav-link) {
        color: white !important;
		font-weight:bold;
    }

    :global(.nav-link:hover) {
        color: white !important;
		font-weight:bold;
    }

    :global(.navbar-nav .nav-item) {
        margin-right: 15px;
        color: white !important;
		font-weight:bold;

    }

    :global(.nav-link.active) {
        font-weight: bold;
        color: white !important;
    }
	:global(body) {
		background-image: url('imagessitejeux.jpeg');
	}
	:global(.hero-section) {
		text-align: center;
		color: white;
		margin-top: 50px;
		font-weight:bold;

	}
	:global(.hero-section h1) {
		font-size: 3em;
		margin-bottom: 10px;
	}
	:global(.hero-section p) {
		font-size: 1.5em;
		font-weight:bold;
	}
</style>
