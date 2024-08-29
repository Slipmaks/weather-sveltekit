<script lang="ts">
  import "@picocss/pico";
  import NavigationBar from "$lib/components/navigation-bar.svelte";
  import { onMount, setContext } from "svelte";
  import { detectCurrentUserTheme } from "$lib/utils/detect-theme";
  import { writable } from "svelte/store";
  import type { Writable } from "svelte/store";
  import {
    PUBLIC_DOMAIN_API,
    PUBLIC_WEATHER_API_KEY,
  } from "$env/static/public";

  const weatherStore: Writable<any | never> = writable();

  $: {
    setContext("weatherData", weatherStore);
  }

  const propAreChanged = (value: boolean) => {
    document
      .querySelector("html")
      ?.setAttribute("data-theme", value ? "dark" : "light");
  };

  onMount(() => {
    propAreChanged(detectCurrentUserTheme());
    navigator?.geolocation?.getCurrentPosition(
      async (pos) => {
        let lat = pos.coords.latitude,
          long = pos.coords.longitude;

        try {
          const response = await fetch(
            `${PUBLIC_DOMAIN_API}key=${PUBLIC_WEATHER_API_KEY}&q=${lat},${long}&days=1&aqi=yes&alerts=no`
          );
          const dataJson = await response.json();

          weatherStore.set(dataJson);
        } catch (e) {
          return e;
        }
      },
      null,
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  });
</script>

<main class="wrapper">
  <NavigationBar
    propValue={propAreChanged}
    currentValue={detectCurrentUserTheme()}
  />

  <div class="card-wrapper">
    <slot />
  </div>
  <footer class="footer">
    <h6>WeatherCard with SvelteKit, Svelte 4, PicoCSS, WeatherApi</h6>
  </footer>
</main>

<svelte:head>
  <title>Current weather</title>
</svelte:head>

<style>
  :root[data-theme="dark"] {
    --my-background: var(--pico-switch-background-color);
  }
  .wrapper {
    margin: 2rem;
    height: calc(100dvh - 4rem);
  }
  .card-wrapper {
    display: flex;
    justify-content: center;
    height: calc(100% - 4rem);
  }
</style>
