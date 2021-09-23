// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {LanguageDetails, ClickLanguageFilter, isActive} = props
  const {id, language} = LanguageDetails

  const cls = isActive ? 'button-active' : 'button'

  const onClickButton = () => {
    ClickLanguageFilter(id)
  }

  return (
    <li className="list-button">
      <button onClick={onClickButton} className={`${cls}`} type="button">
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
