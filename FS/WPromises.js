//WITH PROMISES, AVOID FROM THE CALLBACK HELL

const { readFile } = require('fs')
readFile('../content/first.txt', 'utf8', (err, data) => {
    if (err) throw err
    console.log(data);
})
//if we want to define a lot of action then it can a problem to us
//better solution is to change it to promises.

const getText = (path) => {
    return new Promise((resolve, reject) => {
        readFile(path, 'utf8', (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}
getText('../content/first.txt')
    .then((result) => { console.log(result); })
    .catch((err) => { console.log(err) })

const start = async () => {
    try {
         //as you see that the reading of 2 files are easy than we do with callbacks
        const first = await getText('../content/first.txt')
        const second = await getText('../content/second.txt')
        console.log(first, second);

    } catch (error) {
        console.error(error);
    }
}

start()