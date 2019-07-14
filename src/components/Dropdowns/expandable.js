import React from "react";
import styles from "./expandable.module.css";
import ClickAwayDetector from "components/common/click-away-detector";

export default class Expandable extends React.Component {
  static defaultProps = {
    expanded: false,
    closeOnSelect: false
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: props.expanded,
      closeOnSelect: props.closeOnSelect
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.onToggleExpanded &&
      this.state.expanded !== prevState.expanded
    ) {
      this.props.onToggleExpanded(this.state.expanded);
    }
  }

  toggleExpanded = () => {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  };

  toggleExpandedOnSelect = () => {
    const { closeOnSelect } = this.state;
    if (closeOnSelect) {
      this.setState({ expanded: false });
    }
  };

  onClickAway = () => {
    const { expanded } = this.state;
    if (expanded) {
      this.setState({ expanded: false });
    }
  };

  render() {
    const { expanded } = this.state;
    const { className, content, footer, header } = this.props;

    return (
      <ClickAwayDetector
        onClickAway={this.onClickAway}
        className={styles.expandable}
      >
        <div
          className={`${styles.content_wrapper} ${className} ${
            expanded ? styles.expanded : ""
          }`}
        >
          <div onClick={this.toggleExpanded} className={styles.header}>
            {header}
          </div>
          <div
            onClick={this.toggleExpandedOnSelect}
            className={`${styles.content} ${expanded ? styles.expanded : ""}`}
          >
            {content}
          </div>
          <div className={`${styles.content} ${expanded ? styles.expanded : ""}`}>
            {footer}
          </div>
        </div>
      </ClickAwayDetector>
    );
  }
}
