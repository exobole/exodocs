import theme from "@nuxt/content-theme-docs";

export default theme({
  docs: {
    primaryColor: "#0FA3B1",
  },
  loading: { color: "#00CD81" },
  i18n: {
    locales: () => [
      {
        code: "fr",
        iso: "fr-FR",
        file: "fr-FR.js",
        name: "Français",
      },
      {
        code: "en",
        iso: "en-US",
        file: "en-US.js",
        name: "English",
      },
    ],
    defaultLocale: "fr",
  },
});
