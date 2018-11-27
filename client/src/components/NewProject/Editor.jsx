import React, { Component } from "react";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css"; // import styles

// Import bootstrap(v3 or v4) dependencies
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import "bootstrap/dist/css/bootstrap.css";

class RichTextEditor extends Component {
  render() {
    return (
      <ReactSummernote
        value={this.props.value}
        options={{
          height: 350,
          dialogsInBody: true,
          popover: {
            image: [],
            link: [],
            air: []
          },
          toolbar: [
            ["style", ["style"]],
            ["font", ["bold", "underline", "clear"]],
            ["fontname", ["fontname"]],
            ["para", ["ul", "ol", "paragraph"]],
            ["table", ["table"]],
            ["insert", ["link", "picture", "video"]],
            ["view", ["fullscreen", "codeview"]]
          ]
        }}
        onChange={this.props.onChangeHTML}
      />
    );
  }
}

export default RichTextEditor;
