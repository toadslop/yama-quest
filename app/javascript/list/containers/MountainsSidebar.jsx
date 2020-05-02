import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ListNameHeader extends Component {
  // render_mountains(regions, region) {
  //   return( regions[`${region}`].mountains.map((mountain) => {
  //     return <p>{mountain.name}</p>
  //   })
  //   )
  // }
  
  render() {
    const { regionsList } = this.props
    console.log(regionsList)
    return (
      <div>
        {regionsList.map((region) => {
          return(
            <div>
              <h3 key={region.id}>{region.name}</h3>
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
    regionsList: state.regionsList
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListNameHeader);