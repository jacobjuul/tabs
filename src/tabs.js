import React, { Component } from 'react';
import cx from 'classnames';
import data from './data';

const TABS_LEXINO = 'LEXINO';
const TABS_KOMMENTAR = 'KOMMENTARER';

// { state: {
//  activeSectionId: 'section1',
//  activeTab: 'tab_lexino',
//  normalizeBySections: {
//    section1: {
//      tab_lexino: {
//        loadingState: 'loading',
//        data: []
//      },
//      tab_kommentarer: {
//        loadingState: 'loaded',
//        data: []
//      }
//    },
//    section2: {
//      tab_lexino: {
//        loadingState: 'error',
//        data: []
//      }
//    }
//  }
// } }

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSectionId: props.selectedSection,
      activeTab: props.initialTab || TABS_KOMMENTAR,
      normalizeBySections: data
    };

    this.handleLexinoClicked = this.handleTabClick.bind(this, TABS_LEXINO);
    this.handleKommentarerClicked = this.handleTabClick.bind(
      this,
      TABS_KOMMENTAR
    );
  }

  renderContent = () => {
    const { normalizeBySections, activeSectionId } = this.state;
    switch (normalizeBySections[activeSectionId][this.state.activeTab].name) {
      case TABS_LEXINO:
        return <div>Lexino</div>;

      default:
        return <div>Loading</div>;
    }
  };

  handleTabClick = tabName => {
    this.setState({ activeTab: tabName });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <div className="c-tabs">
        <div className="c-tabs__tab-buttons">
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
        </div>
        {this.renderContent()}
      </div>
    );
  }
}
