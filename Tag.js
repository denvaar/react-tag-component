import React from 'react';

var tagStyles = {
  padding: "8px",
  fontSize: "30px",
  fontWeight: "bold",
  background: "rgb(67, 128, 177)",
  marginRight: "5px",
  borderRadius: "5px",
  color: "rgb(155, 187, 218)",
  cursor: "default",
  position: "relative"
};

var tagCloseStyles = {
    cursor: "pointer",
    position: "absolute",
    top: "3px",
    right: "4px",
    fontSize: "12px"
};

var tagInputStyles = {
  fontSize: "30px",
  height: "45px",
  width: "80%",
  margin: "20px"
};


export class Tag extends React.Component {
  handleClose() {
    this.props.onClose(this.props.name);
  }
  render() {
    return (
      <span style={tagStyles} className={this.props.active}>{this.props.name}
        <i style={tagCloseStyles} className="fa fa-times" onClick={this.handleClose.bind(this)}></i>
      </span>
    );
  }
}

Tag.propTypes = {
  onClose: React.PropTypes.func
}

//export default Tag;

