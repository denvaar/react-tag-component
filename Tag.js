import React from 'react';

export class Tag extends React.Component {
  handleClose() {
    this.props.onClose(this.props.name);
  }
  render() {
    return (
      <span className={"tag-styles " + this.props.active}>{this.props.name}
        <i className="fa fa-times tag-close" onClick={this.handleClose.bind(this)}></i>
      </span>
    );
  }
}

Tag.propTypes = {
  onClose: React.PropTypes.func
}


