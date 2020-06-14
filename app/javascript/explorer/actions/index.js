const baseUrl = "/api/v1"

export const actionTypes = {
  setLocale: 'SET_LOCALE',
  toggleSidebar: 'TOGGLE_SIDEBAR',
  fetchSidebarContent: 'FETCH_SIDEBAR_CONTENT',
  fetchGeojson: 'FETCH_GEOJSON',
  fetchMapBounds: 'FETCH_MAP_BOUNDS',
  setViewport: 'SET_VIEWPORT'
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

export function fetchGeojson(geographicCategory, geographicName) {
  const promise = fetch(`${baseUrl}/${geographicCategory}/${geographicName}/geojson`).
    then(response => response.json());
  return {
    type: actionTypes.fetchGeojson,
    payload: promise
  }
}

export function fetchSubGeojson(listName, regionId) {
  const promise = fetch(`${baseUrl}/${listName}/regions/${regionId}`).
    then(response => response.json());
  return {
    type: actionTypes.fetchGeojson,
    payload: promise
  }
}

export function fetchMapBounds(listName) {
  const promise = fetch(`${baseUrl}/lists/${listName}/bounds`).
    then(response => response.json());
  return {
    type: actionTypes.fetchMapBounds,
    payload: promise
  }
}

export function setViewport(viewport) {
  console.log("set viewport", viewport)
  return {
    type: actionTypes.setViewport,
    payload: viewport
  }
}