import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ListNameHeader extends Component {
  render_mountains(regions, region) {
    return( regions[`${region}`].mountains.map((mountain) => {
      return <p>{mountain.name}</p>
    })
    )
  }
  
  render() {
    const { regions } = this.props
    console.log(regions);
    return (
      <div>
        {Object.keys(regions).map((region) => {
          return(
            <div>
              <h3 key={regions[`${region}`].id}>{region}</h3>
              <div>{this.render_mountains(regions, region)}</div>
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
    regions: state.regions
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListNameHeader);