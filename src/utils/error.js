const fs = require('fs');
const config = require(process.cwd() + '/config.js');

module.exports = (error, message = false, client = false) => {
    new Promise(function (resolve, reject) {
        if (message && message !== undefined) {
            require('./alert').errorMessage(error, message);
        };
        var sdterr = fs.createWriteStream(process.cwd() + '/log/error-' + Date.now() + '.log');
        const Logger = new console.Console(sdterr);
        Logger.error(error);
        if (!client || client === undefined) return resolve(true);
        var msg;
        try {
            if (error.message === undefined) {
                msg = error;
            } else {
                msg = error.message;
            };
            config.ownerID.forEach(callbackfn => {
                client.users.get(callbackfn).send(error).then(m => {
                    return resolve(m);
                }).catch(e => {
                    console.error(e);
                    return reject(e);
                });
            });
        } catch (err) {
            try {
                client.users.get(config.ownerID).send(error).then(m => {
                    return resolve(m);
                }).catch(e => {
                    console.error(e);
                    return reject(e);
                });
            } catch (error) {
                console.error(error);
                return reject(e);
            };
            return reject(err);
        };
    });
};