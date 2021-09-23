// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {id, imageUrl, forksCount, starsCount, name, issuesCount} = repoDetails

  return (
    <li className="li-repo">
      <img className="img1" alt={name} src={imageUrl} />
      <h1 className="repo-heading">{name}</h1>
      <div className="li-repo-flex">
        <img
          className="img2"
          alt="stars"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
        />
        <p className="para">{starsCount} stars</p>
      </div>
      <div className="li-repo-flex">
        <img
          className="img2"
          alt="forks"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
        />
        <p className="para">{forksCount} forks</p>
      </div>
      <div className="li-repo-flex">
        <img
          className="img2"
          alt="open-issues"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
        />
        <p className="para">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
