const m = 5
export default [
  {
    id: 6,
    title: '',
    start: new Date(2022, m, 23, 9),
    end: new Date(2022, m, 23, 9, 5)
  }, {
    id: 1,
    title: '',
    start: new Date(2022, m, 21, 10),
    end: new Date(2022, m, 21, 10, 5)
  }, {
    id: 2,
    title: '',
    start: new Date(2022, m, 21, 11),
    end: new Date(2022, m, 21, 11, 5)
  }, {
    id: 3,
    title: '',
    start: new Date(2022, m, 24, 12),
    end: new Date(2022, m, 24, 12, 5)
  }, {
    id: 4,
    title: '',
    start: new Date(2022, m, 27, 10),
    end: new Date(2022, m, 27, 10, 5),
    // isSelected: true,
  }, {
    id: 5,
    title: '',
    start: new Date(2022, m, 28, 15),
    end: new Date(2022, m, 28, 15, 5)
  },
]


export const testEvents=[
  {
    allDay: false,
    end: new Date('2022-05-26T20:09:37.377Z'),
    start: new Date('2022-05-26T19:09:37.377Z'),
    title: 'test'
  },
  {
    allDay: false,
    end: new Date('2022-05-26T02:00:00.000Z'),
    start: new Date('2022-05-21T21:00:00.000Z'),
    title: 'test larger'
  },
  {
    allDay: false,
    end: new Date('2022-05-26T15:00:00.000Z'),
    start: new Date('2022-05-26T07:00:00.000Z'),
    title: 'test larger'
  },
  {
    allDay: true,
    end: new Date('2022-05-24T16:00:00.000Z'),
    start: new Date('2022-05-24T16:00:00.000Z'),
    title: 'test all day'
  },
  {
    allDay: true,
    end: new Date('2022-05-27T16:00:00.000Z'),
    start: new Date('2022-05-25T16:00:00.000Z'),
    title: 'test 2 days'
  },
  {
    allDay: false,
    end: new Date('2022-05-29T00:08:37.378Z'),
    start: new Date('2022-05-26T00:08:37.378Z'),
    title: 'test multi-day'
  }
]