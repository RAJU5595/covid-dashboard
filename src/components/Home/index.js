import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import Header from '../Header'
import TableDataItem from '../TableDataItem'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    totalConfirmedCases: 0,
    totalActiveCases: 0,
    totalRecoveredCases: 0,
    totalDeceasedCases: 0,
    statesListData: [],
  }

  componentDidMount() {
    this.getStateWiseData()
  }

  getStateWiseData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
    const resultList = []
    const keyNames = Object.keys(data)
    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total} = data[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0
        resultList.push({
          stateCode: keyName,
          name: statesList.find(state => state.state_code === keyName),
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    console.log(resultList)
    let totalConfirmedCases = 0
    let totalActiveCases = 0
    let totalRecoveredCases = 0
    let totalDeceasedCases = 0
    function getTheStatistics(item) {
      totalConfirmedCases += item.confirmed
      totalActiveCases += item.active
      totalRecoveredCases += item.recovered
      totalDeceasedCases += item.deceased
    }
    resultList.forEach(getTheStatistics)
    this.setState({
      totalConfirmedCases,
      totalActiveCases,
      totalDeceasedCases,
      totalRecoveredCases,
      statesListData: resultList,
    })
  }

  renderAllStatesData = () => {
    const {
      totalConfirmedCases,
      totalActiveCases,
      totalDeceasedCases,
      totalRecoveredCases,
    } = this.state
    return (
      <div className="statistics-container">
        <div className="confirmed-container">
          <p>Confirmed</p>
          <img
            src="https://res.cloudinary.com/amst/image/upload/v1639929248/conf_cof3e9.jpg"
            alt="country wide confirmed cases pic"
            className="stats-icon"
          />
          <p>{totalConfirmedCases}</p>
        </div>
        <div className="active-container">
          <p>Active</p>
          <img
            src="https://res.cloudinary.com/amst/image/upload/v1639929248/act_kq7nfx.jpg"
            className="stats-icon"
            alt="country wide active cases pic"
          />
          <p>{totalActiveCases}</p>
        </div>
        <div className="recovered-container">
          <p>Recovered</p>
          <img
            src="https://res.cloudinary.com/amst/image/upload/v1639929248/uyf_ndpqov.jpg"
            className="stats-icon"
            alt="country wide recovered cases pic"
          />
          <p>{totalRecoveredCases}</p>
        </div>
        <div className="deceased-container">
          <p>Deceased</p>
          <img
            src="https://res.cloudinary.com/amst/image/upload/v1639929248/dese_tgak4e.jpg"
            className="stats-icon"
            alt="country wide deceased cases pic"
          />
          <p>{totalDeceasedCases}</p>
        </div>
      </div>
    )
  }

  renderTableData = () => {
    const {statesListData} = this.state
    return (
      <table className="table-container">
        <th className="table-header-row">
          <tr className="table-row-data">
            <td>
              States/UT
              <button type="button" className="icon-btn">
                <FcGenericSortingAsc />
              </button>
              <button type="button" className="icon-btn">
                <FcGenericSortingDesc />
              </button>
            </td>
            <td>Confirmed</td>
            <td>Active</td>
            <td>Recovered</td>
            <td>Deceased</td>
            <td>Population</td>
          </tr>
        </th>
        <tbody>
          {statesListData.map(eachItem => (
            <TableDataItem key={eachItem.stateCode} details={eachItem} />
          ))}
        </tbody>
      </table>
    )
  }

  render() {
    return (
      <div className="home-bg-container">
        <Header />
        <div className="home-search-field">
          <AiOutlineSearch className="search-icon" />
          <input
            type="search"
            placeholder="Enter the state"
            className="search-field"
          />
        </div>
        {this.renderAllStatesData()}
        {this.renderTableData()}
      </div>
    )
  }
}

export default Home
