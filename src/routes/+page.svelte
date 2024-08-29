<script lang="ts">
  import { getContext } from "svelte";
  import WeatherCard from "$lib/components/weather-card.svelte";
  import type { Writable } from "svelte/store";
  import { getHourFromDate } from "$lib/utils/hour-from-date";

  interface currentDayWeather {
    air_quality: {
      ["us-epa-index"]: number;
    };
    condition: { text: string; icon: string };
    feelslike_c: string;
    temp_c: string;
    humidity: string;
    precip_mm: string;
    uv: string;
    time: string;
  }
  const air_quality = [
    "Good",
    "Moderate",
    "Unhealthy for sensitive group",
    "Unhealthy",
    "Very Unhealthy",
    "Hazardous",
  ];

  let weatherData: Writable<{
    current: currentDayWeather;
    location: { country: string; name: string; region: string };
    forecast: {
      forecastday: [
        {
          hour: currentDayWeather[];
        },
      ];
    };
  }>;

  weatherData = getContext("weatherData");

  const hourlyForecast = (): currentDayWeather[] => {
    return $weatherData.forecast.forecastday[0].hour.filter((i) => {
      return getHourFromDate(i.time) % 4 === 0;
    });
  };
</script>

{#if $weatherData}
  <WeatherCard>
    <span slot="location">
      <h3>
        {$weatherData.location.name}
      </h3>
      <h6>{$weatherData.location.country}, {$weatherData.location.region}</h6>
    </span>
    <span slot="condition" class="condition">
      <img
        src={$weatherData.current.condition.icon}
        alt={$weatherData.current.condition.text}
        width="64"
        height="64"
      />
      <h6>{$weatherData.current.condition.text}</h6>
    </span>
    <span slot="airQuality">
      <p>
        {air_quality[$weatherData.current.air_quality["us-epa-index"] - 1]}
      </p>
    </span>
    <span slot="temp">
      <p>
        {Math.round(+$weatherData.current.temp_c)}
      </p>
    </span>
    <span slot="feels">
      <p>{Math.round(+$weatherData.current.feelslike_c)}</p>
    </span>
    <span slot="forecast" class="day-forecast">
      {#each hourlyForecast() as i}
        <div class="condition">
          <div class="condition__header">
            <img src={i.condition.icon} alt={i.condition.text} width="34" height="34"/>
            <p>{i.condition.text}</p>
          </div>

          <p>{getHourFromDate(i.time)}:00</p>
        </div>
      {/each}
    </span>
  </WeatherCard>
{/if}

<style>
  .condition {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .condition__header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .day-forecast {
    display: flex;
    justify-content: space-between;
  }

  .day-forecast p {
    width: min-content;
  }
</style>
