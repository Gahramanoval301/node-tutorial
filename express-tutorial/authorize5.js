const authorize = (req, res, next) => {
    const { user } = req.query
    if (user === 'john') {
        req.user = {name:'john', id:3} //so, any of my routes in app5.js have access to that user
        next();
    } else {
        res.status(401).send('Unauthorized')
    }
}
module.exports = { authorize };