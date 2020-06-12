const baseUrl = "/api/v1"

export const actionTypes = {
  setLocale: 'SET_LOCALE',
  toggleSidebar: 'TOGGLE_SIDEBAR',
  fetchSidebarContent: 'FETCH_SIDEBAR_CONTENT'
}

export function setLocale() {
  const newLocale = (I18n.locale === 'en' ? 'jp' : 'en')
  return {
    type: actionTypes.setLocale,
    payload: newLocale
  }
}

export function toggleSidebar(sidebarVisible) {
  return {
    type: actionTypes.setLocale,
    payload: {visible: sidebarVisible}
  }
}

export function fetchSidebarContent(listName) {
  const promise = fetch(`${baseUrl}/lists/${listName}/regions`).
    then(response => response.json());
  return {
    type: actionTypes.fetchSidebarContent,
    payload: promise
  }
}

export function fetchGeojson(geographic_area) {
  const promise = fetch(`${baseUrl}/lists/${listName}/regions`).
    then(response => response.json());
  return {
    type: actionTypes.fetchSidebarContent,
    payload: promise
  }
}