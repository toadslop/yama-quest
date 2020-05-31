// File for pulling function definitions out of components when they
// don't need to be there

// takes a viewport hash and returns whether or not the screen is vertical
export const screenVertical = (viewport) => {
  const { height, width } = viewport
  return (height > width)
}

// takes a bounds hash and adjusts it to add margin
export const addMarginToMap = (bounds) => {
  const { northeast, southwest } = bounds
  const shiftVert = (northeast[0] - southwest[0]) * 0.05
  const shiftHor = (northeast[1] - southwest[1]) * 0.15
  northeast[0] += shiftVert;
  southwest[0] -= shiftVert;
  northeast[1] += shiftHor;
  southwest[1] -= shiftHor;
  return { northeast, southwest }
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
