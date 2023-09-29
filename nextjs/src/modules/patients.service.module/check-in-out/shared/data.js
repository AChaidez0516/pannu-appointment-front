
export const SCREENS = {
  HOME: 'HOME',
  BEGIN_ACTIVITY: 'BEGIN_ACTIVITY',
  SUMMARY: 'SUMMARY',
  RATINGS: 'RATINGS',
}

/** [show: true] can be multiple, [current: true] can be only one 
 * if desktop, check [show]
 * if mobile, check [current]
*/
export const SHOW_SECTIONS = {
  [SCREENS.HOME]: {
    id: 1,
    show: true,
    current: true,
  },
  [SCREENS.BEGIN_ACTIVITY]: {
    id: 2,
    show: false,
    current: false,
  },
  [SCREENS.SUMMARY]: {
    id: 3,
    show: false,
    current: false,
  },
  [SCREENS.RATINGS]: {
    id: 4,
    show: false,
    current: false,
  },
}
