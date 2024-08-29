import { browser } from "$app/environment";

export const detectCurrentUserTheme = (): boolean => {
  if (browser) {
    const darkThemeMq = window?.matchMedia?.("(prefers-color-scheme: dark)");
    return darkThemeMq.matches;
  } else {
    return true;
  }
};
