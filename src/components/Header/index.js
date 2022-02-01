import './index.css'

export default function Header() {
  return (
    <div className="header-navbar">
      <h1 className="header-heading">
        COVID19<span className="india-name">INDIA</span>
      </h1>
      <div className="redirect-names">
        <p className="link-item">Home</p>
        <p>About</p>
      </div>
    </div>
  )
}
