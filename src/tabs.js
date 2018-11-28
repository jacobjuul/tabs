import React, { Component, Fragment } from 'react'
import cx from 'classnames'
import data from './data'

const TABS_LEXINO = 'LEXINO'
const TABS_KOMMENTAR = 'KOMMENTARER'

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
  }

  renderContent = () => {
    const { normalizeBySections, activeSectionId } = this.state
    switch (normalizeBySections[activeSectionId][this.state.activeTab].name) {
      case TABS_LEXINO:
        return <div>Lexino</div>

      default:
        return <div>Loading...</div>
    }
  }

  renderTabs = () => {
    const { activeTab } = this.state
    return (
      <Fragment>
        <div
          onClick={this.handleKommentarerClicked}
          className={cx('c-tabs__tab-button', {
            'c-tabs__tab-button--active': activeTab === TABS_KOMMENTAR
          })}
        >
          Lag kommentarer
        </div>
        <div
          onClick={this.handleLexinoClicked}
          className={cx('c-tabs__tab-button', {
            'c-tabs__tab-button--active': activeTab === TABS_LEXINO
          })}
        >
          Lexino
        </div>
        <div
          onClick={this.handleLexinoClicked}
          className={cx('c-tabs__tab-button', {})}
        >
          Lexino
        </div>
        <div
          onClick={this.handleLexinoClicked}
          className={cx('c-tabs__tab-button', {})}
        >
          Lexino
        </div>
        <div
          onClick={this.handleLexinoClicked}
          className={cx('c-tabs__tab-button', {})}
        >
          Lexino
        </div>
        <div
          onClick={this.handleLexinoClicked}
          className={cx('c-tabs__tab-button', {})}
        >
          Lexino
        </div>
        <div
          onClick={this.handleLexinoClicked}
          className={cx('c-tabs__tab-button', {})}
        >
          Lexino
        </div>
      </Fragment>
    )
  }

  renderDropdown = () => {
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
        />
      </Fragment>
    )
  }

  handleTabClick = tabName => {
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
    const { activeTab } = this.state
    return (
      <div className="c-tabs" onClick={this.closeDropdown}>
        <div className="c-tabs__tab-buttons">{this.renderTabs()}</div>
        <div className="c-tabs__tab-dropdown">{this.renderDropdown()}</div>
        <div className="c-tabs__tab-content">{this.renderContent()}</div>
      </div>
    )
  }
}
