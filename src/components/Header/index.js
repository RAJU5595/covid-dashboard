import {Link} from 'react-router-dom'
import './index.css'

export default function Header() {
  return (
    <div className="header-navbar">
      <Link to="/" className="link-header-heading">
        <h1 className="header-heading">
          COVID19<span className="india-name">INDIA</span>
        </h1>
      </Link>
      <div className="redirect-names">
        <Link to="/" className="link-item">
          <p>Home</p>
        </Link>
        <Link to="/about" className="link-item">
          <p>About</p>
        </Link>
      </div>
    </div>
  )
}
