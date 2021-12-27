// VALIDATION HELPERS

const validateRegistration = (username, email, password, cPassword) => { // VALIDATE REGISTRATION
	const errors = {} // stores errors

	// if(firstName.trim() === '') errors.firstName = 'First name field is required' // check if first name field is empty

	// if(lastName.trim() === '') errors.lastName = 'Last name field is required' // check if last name field is empty
	
	if(username.trim() === '') errors.username = 'Username field is required' // check if username field is empty
	else if(username.trim().length < 5) errors.username = 'Username must be at least 5 characters in length' // check if too short

	if(email.trim() === '') errors.email = 'Email field is required' // check if email field is empty
	else { // check if valid email format
		const emailRE = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
		if(!email.match(emailRE)) errors.email = 'Please enter a valid email'
	}

	if(password.trim() === '') errors.password = 'Password field is required' // check if password field is empty
	if(cPassword.trim() === '') errors.cPassword = 'Confirm password field is required' // check if password field is empty
	else if(password.trim().length < 5) errors.password = 'Password must be at least 5 characters in length' // check if too short
	if(password !== cPassword) errors.cPassword = 'Passwords must match' // check if passwords match

	return {errors, valid: Object.keys(errors).length < 1} // return errors and valid bool
}

const validateLogin = (username, password) => { // VALIDATE LOGIN
	const errors = {} // stores errors

	if(username.trim() === '') errors.username = 'Username field is required' // check if username fiield is empty
	if(password.trim() === '') errors.password = 'Password field is required' // check if password field is empty

	return {errors, valid: Object.keys(errors).length < 1} // return errors and valid bool
}

module.exports = {validateRegistration, validateLogin}