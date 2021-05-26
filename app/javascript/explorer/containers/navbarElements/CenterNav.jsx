import React, { PureComponent } from "react";

class CenterNav extends PureComponent {
	render() {
		const { mobileClass } = this.props;
		return (
			<div className={`center-group ${mobileClass}`}>
				<i className="fas fa-mountain nav-icon"></i>
				<i className="fas fa-user nav-icon"></i>
				{/* <a href='/lists'> */}
				<i className="fas fa-scroll nav-icon"></i>
				{/* </a> */}
				<i className="fas fa-home nav-icon"></i>
			</div>
		);
	}
}

export default CenterNav;
