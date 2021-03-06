const baseUrl = "/api/v1"

export const actionTypes = {
  setLocale: 'SET_LOCALE',
  toggleSidebar: 'TOGGLE_SIDEBAR',
  fetchSidebarContent: 'FETCH_SIDEBAR_CONTENT',
  fetchGeojson: 'FETCH_GEOJSON',
  fetchMapBounds: 'FETCH_MAP_BOUNDS',
  setViewport: 'SET_VIEWPORT',
  setSubGeojson: 'SET_SUB_GEOJSON',
  resetData: 'RESET_DATA'
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
    type: actionTypes.toggleSidebar,
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

export function setSubGeojson(geojson) {
  return {
    type: actionTypes.setSubGeojson,
    payload: geojson
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
  return {
    type: actionTypes.setViewport,
    payload: viewport
  }
}

export function resetData(masterData) {
  return {
    type: actionTypes.resetData,
    payload: masterData
  }
}