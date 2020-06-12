const baseUrl = "/api/v1/"
const explorer = "explorer"

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

export function fetchSidebarContent(listName) {
  const promise = fetch(`${baseUrl}/${explorer}/${listName}`).
    then(response => response.json());
  return {
    type: 'FETCH_SIDEBAR_LIST',
    payload: promise
  }
}
