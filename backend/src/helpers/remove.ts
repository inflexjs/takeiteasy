import * as path from "path";
import * as fs from "fs";
import * as rimraf from "rimraf"

const params = {
    lifetime: {
        day: 86400,
        week: 604800,
        month: 2592000
    },
    timeout: 2500
}

export const clearingLoop = () => {
    setInterval(() => removeFiles('once', 15), params.timeout) // 86400 сек - день
    setInterval(() => removeFiles('day', params.lifetime.day), params.timeout) // 86400 сек - день
    setInterval(() => removeFiles('week', params.lifetime.week), params.timeout) //604800 сек - неделя
    setInterval(() => removeFiles('month', params.lifetime.month), params.timeout) //2592000 сек - месяц
}

const removeFiles = (dir, lifetime): void => {
    // lifetime in sec
    const staticDir = path.resolve(__dirname, '..', 'cloud', dir)

    fs.readdir(staticDir, (error, files) => {
        if (!files) {
            return null
        }
        files.forEach((file, index) => {
            fs.stat(path.join(staticDir, file), (error, stat) => {
                let now, endTime

                if (error) {
                    return console.log(error)
                }

                now = new Date().getTime()
                endTime = new Date(stat.ctime).getTime() + (lifetime * 1000)

                if (now > endTime) {
                    return rimraf(path.join(staticDir, file), (error) => {
                        if (error) {
                            return console.log(error)
                        }
                        console.log(`${file} successfully delete`)
                    })
                }
            })
        })
    })
}