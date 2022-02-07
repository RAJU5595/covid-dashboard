import {Link} from 'react-router-dom'
import './index.css'

const TableDataItem = props => {
  const {details} = props
  const {
    active,
    confirmed,
    deceased,
    population,
    recovered,
    name,
    stateCode,
  } = details
  let stateName = ''
  if (name !== undefined) {
    stateName = name.state_name
  }
  return (
    <>
      <li className="list-all-cases ">
        <div className="states-container-home">
          <Link to={`/state/${stateCode}`} className="link-home">
            <p className="states-names-home">{stateName}</p>
          </Link>
        </div>
        <div className="home-columns">
          <p className="confirmed-home">{confirmed}</p>
        </div>
        <div className="home-columns">
          <p className="active-home">{active}</p>
        </div>
        <div className="home-columns">
          <p className="recovered-home">{recovered}</p>
        </div>
        <div className="home-columns">
          <p className="deceased-home">{deceased}</p>
        </div>
        <div className="home-columns">
          <p className="population-home">{population}</p>
        </div>
      </li>
    </>
  )
}

export default TableDataItem
