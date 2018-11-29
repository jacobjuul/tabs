import React, { Component, Fragment } from 'react'
import cx from 'classnames'
import data from './data'

const TABS_LEXINO = 'LEXINO'
const TABS_KOMMENTAR = 'KOMMENTARER'
const TABS_OUTSIDE = 'OUTSIDE'

export default class Tabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdownActive: false,
      activeSectionId: props.selectedSection,
      activeTab: props.initialTab || TABS_KOMMENTAR,
      normalizeBySections: data
    }

    this.handleLexinoClicked = this.handleTabClick.bind(this, TABS_LEXINO)
    this.handleKommentarerClicked = this.handleTabClick.bind(
      this,
      TABS_KOMMENTAR
    )
    this.handleTabOusideClicked = this.handleTabClick.bind(this, TABS_OUTSIDE)
    this.buttonRef = React.createRef()
    this.tabRefs = {
      [TABS_LEXINO]: React.createRef(),
      [TABS_KOMMENTAR]: React.createRef(),
      [TABS_OUTSIDE]: React.createRef()
    }
    this.buttonsDims = undefined
  }
  componentDidMount() {
    this.buttonsDims = this.buttonRef.current.getBoundingClientRect()
    console.log(this.buttonsDims.left)
  }
  renderContent = () => {
    const { normalizeBySections, activeSectionId } = this.state
    switch (normalizeBySections[activeSectionId][this.state.activeTab].name) {
      case TABS_LEXINO: {
        return <div>Lexino</div>
      }

      case TABS_KOMMENTAR: {
        return <div>KOMMENTARER</div>
      }

      case TABS_OUTSIDE: {
        return <div>show me</div>
      }

      default:
        return <div>Loading...</div>
    }
  }

  renderTabs = () => {
    const { activeTab } = this.state
    return (
      <Fragment>
        <div
          ref={this.tabRefs[TABS_KOMMENTAR]}
          onClick={this.handleKommentarerClicked}
          className={cx('c-tabs__tab-button', {
            'c-tabs__tab-button--active': activeTab === TABS_KOMMENTAR
          })}
        >
          Lag kommentarer
        </div>
        <div
          ref={this.tabRefs[TABS_LEXINO]}
          onClick={this.handleLexinoClicked}
          className={cx('c-tabs__tab-button', {
            'c-tabs__tab-button--active': activeTab === TABS_LEXINO
          })}
        >
          Lexino
        </div>
        <div onClick={() => {}} className={cx('c-tabs__tab-button', {})}>
          disabled
        </div>
        <div onClick={() => {}} className={cx('c-tabs__tab-button', {})}>
          disabled
        </div>
        <div onClick={() => {}} className={cx('c-tabs__tab-button', {})}>
          disabled
        </div>
        <div onClick={() => {}} className={cx('c-tabs__tab-button', {})}>
          disabled
        </div>
        <div
          ref={this.tabRefs[TABS_OUTSIDE]}
          onClick={this.handleTabOusideClicked}
          className={cx('c-tabs__tab-button', 'test', {
            'c-tabs__tab-button--active': activeTab === TABS_OUTSIDE
          })}
        >
          I am hidden by the dropdown
        </div>
      </Fragment>
    )
  }

  renderDropdown = () => {
    const { activeTab } = this.state
    return (
      <Fragment>
        <div
          className="c-tabs__tab-dropdown-toggle"
          onClick={this.toggleDropdown}
        >
          V
        </div>

        <div
          className={cx('c-tabs__tab-dropdown-box', {
            'c-tabs__tab-dropdown-box--hidden': !this.state.dropdownActive
          })}
        >
          <div
            className={cx('c-tabs__tab-dropdown-item', {
              'c-tabs__tab-dropdown-item--active': activeTab === TABS_LEXINO
            })}
            onClick={this.handleLexinoClicked}
          >
            Lexino
          </div>
          <div
            className={cx('c-tabs__tab-dropdown-item', {
              'c-tabs__tab-dropdown-item--active': activeTab === TABS_KOMMENTAR
            })}
            onClick={this.handleKommentarerClicked}
          >
            Lag Kommentarer
          </div>
          <div
            className={cx('c-tabs__tab-dropdown-item', {
              'c-tabs__tab-dropdown-item--active': activeTab === TABS_OUTSIDE
            })}
            onClick={this.handleTabOusideClicked}
          >
            Outside
          </div>
        </div>
      </Fragment>
    )
  }
  checkTabIsInsideBox = selectedTab => {
    const tabDims = selectedTab.getBoundingClientRect()
    const tabOverlapsLeft = tabDims.left < this.buttonsDims.left
    const tabOverlapsRight = tabDims.right > this.buttonsDims.right

    if (tabOverlapsLeft) {
      this.buttonRef.current.scrollLeft -= this.buttonsDims.left - tabDims.left
    }

    if (tabOverlapsRight) {
      this.buttonRef.current.scrollLeft +=
        this.buttonsDims.right + tabDims.right
    }
  }

  handleTabClick = tabName => {
    this.checkTabIsInsideBox(this.tabRefs[tabName].current)
    this.setState({ activeTab: tabName })
  }

  toggleDropdown = () => {
    this.setState({ dropdownActive: !this.state.dropdownActive })
  }

  closeDropdown = () => {
    if (this.state.dropdownActive) {
      this.setState({ dropdownActive: false })
    }
  }

  render() {
    return (
      <div className="c-tabs" onClick={this.closeDropdown}>
        <div className="c-tabs__header">
          <div className="c-tabs__tab-buttons" ref={this.buttonRef}>
            {this.renderTabs()}
          </div>
          <div className="c-tabs__tab-dropdown">{this.renderDropdown()}</div>
        </div>
        <div className="c-tabs__tab-content">{this.renderContent()}</div>
      </div>
    )
  }
}
