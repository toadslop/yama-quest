import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ListNameHeader extends Component {
  render_mountains(mountains, region) {
    return( mountains[`${region}`].mountains.map((mountain) => {
      console.log(mountain.name)
      return <p>{mountain.name}</p>
    })
    )
  }
  
  render() {
    const { mountains } = this.props
    return (
      <div>
        {Object.keys(mountains).map((region) => {
          return(
            <div>
              <h3 key={mountains[`${region}`].id}>{region}</h3>
              <div>{this.render_mountains(mountains, region)}</div>
            </div>
          )
        })}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {  },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    mountains: state.mountains
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListNameHeader);