const passwordChecker = (value) => {
    let errors = [];

    if (value.length === 0) {
        errors.push('Password is required.');
        if (errors.length > 0) {
            throw new Error(errors);
        }
    }

    if (value.length < 8 || value.length > 16) {
        errors.push('Password should be between 8-16 characters long.');
        if (errors.length > 0) {
            throw new Error(errors);
        }
    }

    if (!value.match(/[a-z]/)) {
        errors.push('Password should contain at least one lowercase letter.');
        if (errors.length > 0) {
            throw new Error(errors);
        }
    }
    if (!value.match(/[A-Z]/)) {
        errors.push('Password should contain at least one uppercase letter.');
        if (errors.length > 0) {
            throw new Error(errors);
        }
    }

    if (!value.match(/[0-9]/)) {
        errors.push('Password should contain at least one number.');
        if (errors.length > 0) {
            throw new Error(errors);
        }
    }

    if (!value.match(/[^a-zA-Z0-9]/)) {
        errors.push('Password should contain at least one special character.');
        if (errors.length > 0) {
            throw new Error(errors);
        }
    }

    return true;
};


module.exports = { passwordChecker }
