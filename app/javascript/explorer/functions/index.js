// File for pulling function definitions out of components when they
// don't need to be there

// takes a viewport hash and returns whether or not the screen is vertical
export const screenVertical = (viewport) => {
  const { height, width } = viewport
  return (height > width)
}

// takes a bounds hash and adjusts it to add margin
export const addMarginToMap = (bounds) => {
  const shiftVert = (bounds[0][1] - bounds[0][0]) * 0.05
  const shiftHor = (bounds[1][1] - bounds[1][0]) * 0.15
  bounds[0][0] += shiftVert;
  bounds[1][0] -= shiftVert;
  bounds[0][1] += shiftHor;
  bounds[1][1] -= shiftHor;
  return bounds
}

export const radiansToDegrees = (radians) => {
  const pi = Math.PI;
  return radians * (180/pi);
}

export const getSlope = (coords) => {
  return (coords.y2 - coords.y1) / (coords.x2 - coords.x1)
}

// gets the angle difference between two different lines
// takes a hash of two slops
export const getAngle = (slopes) => {
  const { m1, m2 } = slopes
  const radians = Math.atan(Math.abs((m2 - m1) / (1 + m1*m2)))
  const degrees = radiansToDegrees(radians)
  return -degrees
}

// a function for determining what to put when we set
// the url when clicking links
export const getLangBase = () => {
  return (I18n.locale === 'en' ? '/jp' : '')
} 

// a function for the carousel
export const getOrder = ({ index, pos, numItems }) => {
  return index - pos < 0 ? numItems - Math.abs(index - pos) : index - pos;
};

export const subBounds = (features) => {
  let lats = features.map((feature) => {
    return feature.geometry.coordinates[0]
  }).sort()

  let lngs = features.map((feature) => {
    return feature.geometry.coordinates[1]
  }).sort()

  return [[lats[lats.length-1], lngs[0]], [lats[0], lngs[lngs.length -1]]]
}

export const subFeatures = (features, regionId) => {
  return features.filter((feature) => {
    return feature.properties.region_id === regionId
  })
}

export const subGeojson = (features, regionId) => {
  const newFeatures = subFeatures(features, regionId)
  const newBounds = subBounds(newFeatures)
  return {
    geojson: {
      features: newFeatures,
      type: 'Feature Collection',
      bounds: newBounds
    }
  }
}