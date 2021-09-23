import {Component} from 'react'

import Loader from 'react-loader-spinner'

import RepositoryItem from '../RepositoryItem'

import LanguageFilterItem from '../LanguageFilterItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here

const url = 'https://apis.ccbp.in/popular-repos?language='
class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    activeLanguageId: languageFiltersData[0].id,
    reposData: [],
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    const {activeLanguageId} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const response = await fetch(`${url}${activeLanguageId}`)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachRepo => ({
        id: eachRepo.id,
        imageUrl: eachRepo.avatar_url,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
        forksCount: eachRepo.forks_count,
        issuesCount: eachRepo.issues_count,
      }))
      this.setState({
        reposData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 502) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderReposList = () => {
    const {reposData} = this.state

    return (
      <ul className="ul-repo">
        {reposData.map(eachRepo => (
          <RepositoryItem repoDetails={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  ClickLanguageFilter = newFilterId => {
    this.setState({activeLanguageId: newFilterId}, this.getRepos)
  }

  rendorSelectedLanguages = () => {
    const {activeLanguageId} = this.state
    return (
      <ul className="ul-lang">
        {languageFiltersData.map(eachLang => (
          <LanguageFilterItem
            ClickLanguageFilter={this.ClickLanguageFilter}
            LanguageDetails={eachLang}
            isActive={eachLang.id === activeLanguageId}
            key={eachLang.id}
          />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFaliView = () => (
    <div className="fail-con">
      <img
        className="fail-img"
        alt="failure-view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
      <h1 className="heading-fail">Something Went Wrong</h1>
    </div>
  )

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderReposList()
      case apiStatusConstants.failure:
        return this.renderFaliView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="main-heading">Popular</h1>
        {this.rendorSelectedLanguages()}
        {this.renderApiStatusView()}
      </div>
    )
  }
}

export default GithubPopularRepos
