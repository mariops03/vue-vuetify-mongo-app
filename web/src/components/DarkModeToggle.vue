<template>
  <div class="mode-toggle">
    <input type="checkbox" id="darkmode-toggle" />
    <label class="darkmode-toggle" for="darkmode-toggle">
      <img class="sun" src="data:image/png;base64,..." />
      <img class="moon" src="data:image/png;base64,..." />
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    const toggleSwitch = document.querySelector(
      'input#darkmode-toggle[type="checkbox"]'
    );
    toggleSwitch.addEventListener("change", this.switchTheme, false);
    const currentTheme = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : null;
    currentTheme &&
      document.documentElement.setAttribute("data-theme", currentTheme);
    if (document.documentElement.getAttribute("data-theme") == "dark") {
      toggleSwitch.checked = true;
    }
  },
  methods: {
    switchTheme(e) {
      const toggleSwitch = document.querySelector(
        'input#darkmode-toggle[type="checkbox"]'
      );
      if (e.target.checked) {
        localStorage.setItem("theme", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
        toggleSwitch.checked = true;
      } else {
        localStorage.setItem("theme", "light");
        document.documentElement.setAttribute("data-theme", "light");
        toggleSwitch.checked = false;
      }
    },
  },
};
</script>
