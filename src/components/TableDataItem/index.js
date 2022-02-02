import './index.css'

const TableDataItem = props => {
  const {details} = props
  const {active, confirmed, deceased, population, recovered, name} = details
  let stateName = ''
  if (name !== undefined) {
    stateName = name.state_name
  }
  return (
    <tr className="table-row-item-container">
      <td>{stateName}</td>
      <td>{confirmed}</td>
      <td>{active}</td>
      <td>{recovered}</td>
      <td>{deceased}</td>
      <td>{population}</td>
    </tr>
  )
}

export default TableDataItem
