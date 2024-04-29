const logger = (req, res, next) => {
    const url = req.url
    const method = req.method
    const time = new Date().getFullYear()
    console.log(method, url, time);
    next()
    // res.send(`Home ${url} ${method} ${time}`)
}
module.exports = {logger}