import moment from "moment"

export const periodItems = [
  {
    id: 'w', text: 'Week',
  },
  {
    id: 'm', text: 'Month',
  },
  {
    id: 'd', text: 'Day',
  },
]

export const periodOptions = {
  size: { width: 70, height: 43 },
  color: '#000000',
  fontSize: 12,
  labelFontSize: 12,
  borderColor: '#000000',
  borderWidth: 1,
  borderRadius: 5
}

export const numberItems = (key, year, month) => {
  switch (key) {
    case 'w':
      return Array.from(Array(52).keys()).map((i) => ({ id: i + 1, text: i + 1 }))
    case 'm':
      return Array.from(Array(12).keys()).map((i) => ({ id: i + 1, text: i + 1 }))
    case 'd':
      const lastDay = moment().endOf('month').toDate().getDate()
      return Array.from(Array(lastDay).keys()).map((i) => ({ id: i + 1, text: i + 1 }))
    default:
      break;
  }
}

export const numberOptions = {
  size: { width: 50, height: 43 },
  color: '#000000',
  fontSize: 12,
  labelFontSize: 12,
  borderColor: '#000000',
  borderWidth: 1,
  borderRadius: 5
}

export const virtualVisitItems = [
  {
    id: 'phone', text: 'Phone',
  },
  {
    id: 'camera', text: 'Camera',
  },
]

export const virtualVisitOptions = {
  size: { width: 90, height: 43 },
  color: '#000000',
  fontSize: 12,
  labelFontSize: 12,
  borderColor: '#000000',
  borderWidth: 1,
  borderRadius: 5
}


export const priorityItems = [
  {
    id: 'first', text: 'First',
  },
]

export const priorityOptions = {
  size: { width: 65, height: 43 },
  color: '#000000',
  fontSize: 12,
  labelFontSize: 12,
  borderColor: '#000000',
  borderWidth: 1,
  borderRadius: 5
}