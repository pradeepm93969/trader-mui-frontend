import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: [
    "ar",
    "zh",
    "cs",
    "en",
    "et",
    "fr",
    "de",
    "ja",
    "ko",
    "pt",
    "ro",
    "ru",
    "es",
    "tr",
  ],
  defaultLocale: "en",
});

export type Locale = (typeof routing)["locales"][number];
