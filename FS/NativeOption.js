//NODE'S NATIVE OPTION BY FREECODECAMP
const { readFile, writeFile } = require('fs').promises
const util = require('util')
const readFilePromise = util.promisify(readFile)
const WriteFilePromise = util.promisify(writeFile)

const start = async () => {
    try {
        const first = await readFilePromise('./content/first.txt', 'utf8')
        const second = await readFilePromise('./content/second.txt', 'utf8')
        console.log(first, second);
        await WriteFilePromise('./content/result-mind-grenade.txt', `This is awesome ${first},${second}`)

    } catch (error) {
        console.error(error);
    }
}
start();

//2nd way
const { readFile, writeFile } = require('fs').promises

const start2 = async () => {
    const first = await readFile('./content/first.txt', 'utf8')
    const second = await readFile('./content/second.txt', 'utf8')
    console.log(first, second);
    await writeFile('./content/result-mind-grenade.txt', 'i"ts for testing', { flag: 'a' })
}

start2();