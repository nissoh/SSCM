import theme from "./common/theme"


const THEME_PALLETE_SELECTED_KEY = `!!THEME_PALLETE_SELECTED_KEY`
const selectedTheme = localStorage.getItem(THEME_PALLETE_SELECTED_KEY)

if (selectedTheme === null) {
  const darkModePreferance = !self?.matchMedia('(prefers-color-scheme: dark)').matches
  const preferance = darkModePreferance ? 0 : 1
  const themePair = [theme.dark, theme.light]
  const defaultTheme = themePair[preferance]

  localStorage.setItem(THEME_PALLETE_SELECTED_KEY, JSON.stringify(defaultTheme))
}


