const { format } = require('date-fns');
const { v4: uuid } = require('uuid')

console.log(format(new Date(), 'yyyy-MM-dd'));
console.log(uuid());

const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        // No need for a callback with fsPromises.appendFile()
        await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem);
    } catch (error) {
        console.error(error);
    }
};

module.exports = logEvents;