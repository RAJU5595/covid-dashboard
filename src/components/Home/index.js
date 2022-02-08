import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import TableDataItem from '../TableDataItem'
import Footer from '../Footer'
import SearchResultItem from '../SearchResultItem'
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
    searchInput: '',
    filteredSearchList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getStateWiseData()
  }

  AscendingSortButtonClicked = () => {
    const {statesListData} = this.state
    const sortedList = statesListData.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x > y ? 1 : -1
    })
    this.setState({statesListData: sortedList})
  }

  DescendingSortButtonClicked = () => {
    const {statesListData} = this.state
    const sortedList = statesListData.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x < y ? 1 : -1
    })
    this.setState({statesListData: sortedList})
  }

  getStateWiseData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(apiUrl)
    const data = await response.json()
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
    const newResultList = resultList.map(eachItem => ({
      stateCode: eachItem.stateCode,
      stateName: eachItem.name !== undefined ? eachItem.name.state_name : '',
      confirmed: eachItem.confirmed,
      deceased: eachItem.deceased,
      recovered: eachItem.recovered,
      tested: eachItem.tested,
      population: eachItem.population,
      active: eachItem.active,
    }))
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
    newResultList.forEach(getTheStatistics)
    this.setState({
      totalConfirmedCases,
      totalActiveCases,
      totalDeceasedCases,
      totalRecoveredCases,
      statesListData: newResultList,
      isLoading: false,
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
      <div className="all-states-table" testid="stateWiseCovidDataTable">
        <div className="table-header">
          <div className="state-name-heading">
            <button
              className="order"
              type="button"
              testid="ascendingSort"
              onClick={this.AscendingSortButtonClicked}
            >
              <FcGenericSortingAsc className="order-icon" />
            </button>
            <p className="table-header-title">States/UT</p>
            <button
              className="order"
              type="button"
              testid="descendingSort"
              onClick={this.DescendingSortButtonClicked}
            >
              <FcGenericSortingDesc className="order-icon" />
            </button>
          </div>
          <div className="table-header-container">
            <p className="table-header-title">Confirmed</p>
          </div>
          <div className="table-header-container">
            <p className="table-header-title">Active</p>
          </div>
          <div className="table-header-container">
            <p className="table-header-title">Recovered</p>
          </div>
          <div className="table-header-container">
            <p className="table-header-title">Deceased</p>
          </div>
          <div className="table-header-container">
            <p className="table-header-title">Population</p>
          </div>
        </div>
        <div className="state-wise-data-list-container">
          <ul className="other-tables">
            {statesListData.map(eachItem => (
              <TableDataItem key={eachItem.stateCode} details={eachItem} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  onChangeSearchInput = event => {
    const searchInputValue = event.target.value
    const searchResultsList = statesList.filter(data =>
      data.state_name.toLowerCase().includes(searchInputValue.toLowerCase()),
    )
    return this.setState({
      searchInput: searchInputValue,
      filteredSearchList: searchResultsList,
    })
  }

  showSearchList = () => {
    const {filteredSearchList} = this.state

    return (
      <ul
        className="search-result-container"
        testid="searchResultsUnorderedList"
      >
        {filteredSearchList.map(each => (
          <SearchResultItem
            key={each.state_code}
            statename={each.state_name}
            statecode={each.state_code}
            id={each.state_code}
          />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div
      className="products-details-loader-container loader-container"
      testid="homeRouteLoader"
    >
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {searchInput, filteredSearchList, isLoading} = this.state
    const showSearchList =
      filteredSearchList.length === 0 ? '' : this.showSearchList()
    return (
      <div className="home-bg-container">
        <Header />
        <div className="home-search-field">
          <AiOutlineSearch className="search-icon" />
          <input
            type="search"
            placeholder="Enter the state"
            className="search-field"
            onChange={this.onChangeSearchInput}
            value={searchInput}
          />
        </div>
        {searchInput.length > 0 ? showSearchList : ''}
        {isLoading ? (
          this.renderLoadingView()
        ) : (
          <>
            {this.renderAllStatesData()}
            {this.renderTableData()}
          </>
        )}
        <Footer />
      </div>
    )
  }
}

export default Home
