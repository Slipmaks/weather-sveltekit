<article class="weather-card">
  <div class="header">
    <div>
      <slot name="location" />
    </div>
    <div>
      <slot name="condition" />
    </div>
  </div>
  <div class="body">
    <div class="body-item">
      <h6>Air quality:</h6>
      <slot name="airQuality"></slot>
    </div>
    <div class="body-item">
      <h6>Temperature:</h6>
      <slot name="temp"></slot>
    </div>
    <div class="body-item">
      <h6>Feels like:</h6>
      <slot name="feels"></slot>
    </div>
  </div>
  <footer>
    <slot name="forecast" />
  </footer>
</article>

<style>
  .weather-card {
    width: 540px;
    height: 540px;
    background-color: var(--my-background);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* box-shadow: var(--pico-box-shadow); */
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .body {
    height: 100%;
    display: flex;
    flex-direction: column;
    /* align-items: ; */
    justify-content: center;
  }
  .body-item {
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
  }
</style>
