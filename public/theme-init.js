(() => {
  try {
    const storedTheme = localStorage.getItem('theme')
    const isDark = storedTheme
      ? storedTheme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches

    document.documentElement.classList.toggle('dark', isDark)
  }
  catch {
    document.documentElement.classList.toggle(
      'dark',
      matchMedia('(prefers-color-scheme: dark)').matches,
    )
  }
})()
