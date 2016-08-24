import React from 'react';
import {reduxForm} from 'redux-form';

const validate = value => {
	const errors = {};

	if (!values.email) {
		errors.email = "Please enter an email";
	}
}

export default class Signup extends React.Component {
  render() {
    return (
      <div>Signup</div>
    );
  }
}
