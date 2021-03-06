const Tesseract = require('tesseract.js')
const request = require('request')
const fs = require('fs')

/*
* Recebe os argumentos passados no terminal
*/
const args = process.argv;
const parameter = args[args.length - 1];
const path = require('path').dirname(require.main.filename)

/*
* Se o argumento recebido for uma URL ele faz a request com a url
* Senão o argumento recebido foi uma imagem local, então faz direto o reconhecimento
*/
if(parameter.includes("http://") || parameter.includes("https://")) {
    const url = parameter
    const extension = parameter.split('.')
    const filename = `pic.${extension[extension.length - 1]}`

    var writeFileStream = fs.createWriteStream(filename)

    request(url).pipe(writeFileStream).on('close', () => {
        console.log(url, 'save to', filename)
        Tesseract.recognize(filename)
            .progress(p => console.log('progress', p))
            .catch(err => console.log(err))
            .then(result => {
                let texto = result.text
                console.log(texto)
                saveText(texto)
            })
    })
} else {
    const file = `${path}/${parameter}`

    Tesseract.recognize(file)
        .progress(p => console.log('progress', p))
        .catch(err => console.log(err))
        .then(result => {
            let texto = result.text
            console.log(texto)
            saveText(texto)
        })
}

saveText = text => {
    fs.writeFile(`${path}/text.txt`, text, err => {
        if(err) { throw err; }    
        console.log("Arquivo salvo");
        process.exit(0)
    }); 
}