import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import FaqsListItem from '../FaqsListItem'
import './index.css'

class About extends Component {
  state = {
    isLoading: true,
    faqData: {},
  }

  componentDidMount() {
    this.getAllAboutData()
  }

  renderLoader = () => (
    <>
      <div className="loader-container" testid="aboutRouteLoader">
        <Loader type="ThreeDots" color="blue" height="50" width="50" />
      </div>
    </>
  )

  getAllAboutData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updateFaqsData = data.faq.map(each => ({
        answer: each.answer,
        category: each.category,
        qno: each.qno,
        question: each.question,
      }))

      this.setState({
        faqData: updateFaqsData,
        isLoading: false,
      })
    } else {
      console.log('data not available')
    }
  }

  renderAllData = () => {
    const {faqData} = this.state
    return (
      <>
        <ul testid="faqsUnorderedList" className="fact-list">
          {faqData.map(each => (
            <FaqsListItem
              key={each.qno}
              answer={each.answer}
              question={each.question}
            />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="about-bg-container">
        <Header />
        <div className="about-main-container">
          {isLoading ? (
            this.renderLoader()
          ) : (
            <div className="about-content-container">
              <h1 className="about-title">About</h1>
              <p className="about-description">
                Last update on December 25th 2021.
              </p>
              <p className="about-vaccine-title">
                COVID-19 vaccines be ready for distribution
              </p>
              <div className="fact-list">{this.renderAllData()}</div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    )
  }
}

export default About
