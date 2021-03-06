import React from 'react';
import { Tag } from './Tag.js';


class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {tags: props.existingTags,
                  existingTags: []}
  }

  handleKeyPress(e) {
    
    var charPressed = String.fromCharCode(e.which);
    var tagsToHighlight = this.state.existingTags.slice();

    tagsToHighlight = this._checkForMatches(e.target.value, tagsToHighlight, charPressed);
    this.setState({existingTags: tagsToHighlight});
  
  }

  _checkForMatches(val, tagsToHighlight, charPressed='') {
    
    this.state.tags.forEach(function(tag) {
      if (tag.startsWith(val + charPressed)) {
        if (tagsToHighlight.indexOf(tag) < 0) {
          tagsToHighlight.push(tag);
        }
      } else {
        var index = tagsToHighlight.indexOf(tag);
        if (index > -1) {
          tagsToHighlight.splice(index, 1);
        }
      }
    }, this);
    
    return tagsToHighlight;
  
  }

  handleInput(e) {
    
    if (e.keyCode == 8 && e.target.value.length > 0) { // Delete key
      
      var tagsToHighlight = this.state.existingTags.slice();
      tagsToHighlight = this._checkForMatches(e.target.value.slice(0, -1), tagsToHighlight);
      this.setState({existingTags: tagsToHighlight});

      if (e.target.value.length == 1) {
        this.setState({existingTags: []});
      }
    
    }
    if (e.keyCode == 8 && e.target.value.length == 0) {
      e.preventDefault();
      var tags = this.state.tags;
      var last_tag = tags.splice(-1,1);
      this.setState({tags:tags});
      e.target.value = last_tag;
    }

    if ((e.keyCode == 9 || e.keyCode == 13) && e.target.value.length > 0) { // Tab key
      
      var newTags = this.state.tags.slice();
      e.preventDefault();
      
      if (newTags.indexOf(e.target.value) < 0) {
        
        newTags.push(e.target.value);
        this.setState({tags: newTags, existingTags: []});
        e.target.value = "";
      
      }
    }
  }
  
  removeTag(e) {
    
    var tagNames = this.state.tags;
    var index = tagNames.indexOf(e);
    
    if (index > -1) {
      tagNames.splice(index, 1);
      this.setState({tags: tagNames});
    }
  
  }
  
  render() {
    
    var createTag = function(name) {
      return (
        <Tag key={name}
             name={name}
             active={this.state.existingTags.indexOf(name) > -1 ? 'active' : ''}
             onClose={this.removeTag.bind(this)}>
        </Tag>
      );
    };
    
    return (
      <div className="normal-styles">
        <div className="tag-editor">
          {this.state.tags.map(createTag, this)}
          <input className="tag-input" type="text"
            onKeyDown={this.handleInput.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)} />
        </div>
      </div>
    );
  
  }

}

App.propTypes = {
  existingTags: React.PropTypes.array
}

export default App;

