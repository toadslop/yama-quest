export function setLocale() {
  const newLocale = (I18n.locale === 'en' ? 'jp' : 'en')
  return {
    type: 'SET_LOCALE',
    payload: newLocale
  }
}

export function toggleSidebar(sidebarVisible) {
  return {
    type: 'TOGGLE_SIDEBAR',
    payload: {visible: sidebarVisible}
  }
}