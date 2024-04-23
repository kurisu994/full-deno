(function changeThem() {
  const colorScheme =
    globalThis.matchMedia("(prefers-color-scheme:dark)").matches
      ? "dark"
      : "light";
  if (colorScheme === "dark") {
    document.documentElement.classList.add("dark");
  }
})();
