
export function getDistance (p1, p2) {
  const dLat = radianFrom(p2.lat - p1.lat);
  var dLng = radianFrom(p2.lng - p1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(radianFrom(p1.lat)) * Math.cos(radianFrom(p2.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
}


export const twoPointsToTest = {
  points: [{
      lat: 53.32055555555556,
      lng: -1.7297222222222221
    }, {
      lat: 53.31861111111111,
      lng: -1.6997222222222223
    }],
  outputInMeter: 2004.3678382716137
}


export const toMile = (meter) => meter * 0.000621371;
export const toKilo = (meter) => meter * 0.001;


/* REFER VALUES */

const R = 6371137; // Earth’s mean radius in meter

function radianFrom (angle) {
  return angle * Math.PI / 180;
}


