// Export a function that has a req, res, and next parameter.
// Check if the req.session has a user object.
// If the session doesn't have it, add it to the session.
// User object: { username: '', cart: [], total: 0 }.
// If the session does have it, call next.

module.exports = function (req, res, next){
    const {session} =req;
    if(!session.user){
        session.user={username: '', cart: [], total:0}
    }
    next();
}
