async function convOneImg(urlRest, options, fileOutName) {
  const fs = require('fs')
  const fetch = require('node-fetch')

  function getConvertedFile (urlRest, options) {
    return new Promise(function (resolve, reject) {
      fetch(urlRest, options)
         .then(res => {
           return resolve(res.body)
         })
         .catch(err => reject(err))
        })
    }

    const data = await getConvertedFile(urlRest, options)
    const dest = fs.createWriteStream(fileOutName)
    data.pipe(dest);
}

module.exports = convOneImg