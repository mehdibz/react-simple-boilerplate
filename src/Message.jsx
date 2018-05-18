import React, { Component } from 'react';

class Message extends Component {
  constructor(props) {
    super(props);
  }
  imageSupport(url){
    const ext =  /(?:\.([^.]+))?$/.exec(url)[1];
    const picType = {
      jpg: true,
      gif: true,
      png: true
    }
    return picType[ext];
  }
  render()  {
  	var customStyle = {
      color: this.props.singleMessage.messageColor
    }
    return (
      <div className="message">
        <div>
        	<span 
        		style={customStyle} 
        		className="message-username">
        		{this.props.singleMessage.username}
        	</span>
        </div>
        {!this.imageSupport(this.props.singleMessage.content) &&
        	<span className="message-content">
        		{this.props.singleMessage.content}
        	</span>
        }
        {this.imageSupport(this.props.singleMessage.content) &&
	        <div>
	        	<img className="message-image"  
	        		 src= {this.props.singleMessage.content}/>
	        </div>
    	}
      </div>
    );
  }
}

export default Message;
