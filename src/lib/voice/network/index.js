const fetch = require('node-fetch');

module.exports = async (track) => {
    return await new Promise(async function (resolve, reject) {
        await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURI(track)}&type=video&key=${require(process.cwd() + '/config.js').key.YouTube}`
        ).then(res => res.json()).then(json => {
            resolve(json.items);
            return json.items;
        });
    });
};