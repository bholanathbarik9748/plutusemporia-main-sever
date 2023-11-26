// Error Handler
module.exports.handlerError = (err) => {
    let errors = ""

    // user already exists
    if (err.code === 11000) {
        errors += 'This email or user id is already associated with an account.';
        return errors;
    }

    // Validation Error
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors += "\n";
            errors += properties.message;
        })
    }
    return errors;
}