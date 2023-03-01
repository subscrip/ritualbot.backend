const chalk = require('chalk')

module.exports = class Logger {
    constructor(options = { scope }) {
        this.scope = options?.scope || "AppLogger"
    }

    info(message="") {
        return console.log(`${this.base()} | ${chalk.blueBright.bold('info')} › ${chalk.white(message)}`)
    }

    debug(message="") {
        return console.log(`${this.base()} | ${chalk.greenBright('debug')} › ${chalk.white(message)}`)
    }

    error(message="", error=null) {
        console.log('')
        if(error) console.log(error)
        return console.log(`${this.base()} | ${chalk.redBright('error')} › ${chalk.white(message)}`)
    }

    warn(message="") {
        return console.log(`${this.base()} | ${chalk.yellowBright('warn')} › ${chalk.white(message)}`)
    }

    base() {
        var dt = new Date()
        return `${chalk.gray.bold(`[${chalk.magenta.bold(this.scope)}]`)}`
    }
}