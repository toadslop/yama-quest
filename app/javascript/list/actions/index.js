export function setLocale(newLocale) {
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