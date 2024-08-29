<script lang="ts">
  export let propValue, currentValue: boolean;

  let val = !currentValue;
</script>

<fieldset style="display: flex; justify-content: end;">
  <label>
    <input
      type="checkbox"
      name="theme"
      role="switch"
      on:change={() => propValue(val)}
      bind:checked={val}
      class={val ? "" : "dark"}
    />
  </label>
</fieldset>

<style>
  [type="checkbox"][role="switch"] {
    width: 3.3em;
    height: 1.75em;
  }

  [type="checkbox"][role="switch"]:checked {
    --pico-background-color: rgb(234, 234, 234);
    --pico-border-color: rgb(229, 229, 229);
  }
  [type="checkbox"][role="switch"]:checked:focus {
    --pico-background-color: rgb(234, 234, 234);
    --pico-border-color: rgb(229, 229, 229);
  }
  [type="checkbox"][role="switch"]:checked::before {
    margin-inline-start: calc(2.25em - 0.7em);
    content: "😎";
    background-color: rgba(255, 255, 255, 0);
  }
  [type="checkbox"][role="switch"]:focus {
    --pico-box-shadow: rgba(255, 255, 255, 0);
  }
  .dark::before {
    content: "🌙";
    background-color: rgba(255, 255, 255, 0);
  }
</style>
