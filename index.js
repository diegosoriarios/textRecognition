const Tesseract = require('tesseract.js')
const request = require('request')
const fs = require('fs')
const url = 'http://tesseract.projectnaptha.com/img/eng_bw.png'
const filename = "pic.png"

var writeFileStream = fs.createWriteStream(filename)

request(url).pipe(writeFileStream).on('close', () => {
    console.log(url, 'save to', filename)
    Tesseract.recognize(filename)
        .progress(p => console.log('progress', p))
        .catch(err => console.log(err))
        .then(result => {
            let texto = result.text
            //Adicionar o texto em um arquivo?
            //
            console.log(texto)
            process.exit(0)
        })
})