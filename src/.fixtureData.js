const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
]

// replace the below data with the GET state wise data API response:
const data = {
  AN: {
    total: {
      confirmed: 7646,
      deceased: 129,
      recovered: 7510,
      tested: 584772,
      vaccinated1: 292802,
      vaccinated2: 183786,
    },
    meta: {
      date: '2021-10-22',
      last_updated: '2021-10-23T04:19:10+05:30',
      population: 397000,
      tested: {
        date: '2021-10-22',
      },
    },
  },
  AP: {
    total: {
      confirmed: 2062781,
      deceased: 14333,
      recovered: 2043050,
      tested: 29142162,
      vaccinated1: 31255396,
      vaccinated2: 17768254,
    },
    meta: {
      date: '2021-10-22',
      last_updated: '2021-10-23T04:19:10+05:30',
      population: 397000,
      tested: {
        date: '2021-10-22',
      },
    },
  },
}

export {data, statesList}
