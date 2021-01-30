const express = require('express');
const app = express();
const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ attrkey: "ATTR" });

var stringgg = fs.readFileSync('data/gamezone.xml', 'utf-8')
parser.parseString(stringgg, async (err, d) => {
  if (err === null) {
    console.log(d["gamezone"]["games"][0]["game"][0]["title"][0]);

    app.set('view engine', 'ejs')

    app.use(express.static(__dirname + '/'))

    app.get('/jogos/:nome', function (req, res) {
        res.render('jogo',{data:d["gamezone"]["games"][0]["game"],nome:req.params.nome});
    })

    app.get('/jogos', function (req, res) {
        res.render('jogos',{data:d["gamezone"]["games"][0]["game"]});
    })

    app.get('/perifericos/:tipo/:nome', async function (req, res) {
        if (req.params.tipo==="desktop"){
            res.render('desktop',{data:d["gamezone"]["peripherals"][0]["desktop"],nome:req.params.nome,tipo:req.params.tipo});
        } else if (req.params.tipo==="headset") {
          res.render('perifericos',{data:d["gamezone"]["peripherals"][0]["headset"],nome:req.params.nome,tipo:req.params.tipo});
        } else if (req.params.tipo==="keyboard") {
          res.render('perifericos',{data:d["gamezone"]["peripherals"][0]["keyboard"],nome:req.params.nome,tipo:req.params.tipo});
        } else if (req.params.tipo==="monitor") {
          res.render('perifericos',{data:d["gamezone"]["peripherals"][0]["monitor"],nome:req.params.nome,tipo:req.params.tipo});
        } else if (req.params.tipo==="mouse") {
          res.render('perifericos',{data:d["gamezone"]["peripherals"][0]["mouse"],nome:req.params.nome,tipo:req.params.tipo});
        }
    })

    app.get('/perifericos', function (req, res) {
        res.render('perifericos',{desktop:d["gamezone"]["peripherals"][0]["desktop"],monitor:d["gamezone"]["peripherals"][0]["monitor"],keyboard:d["gamezone"]["peripherals"][0]["keyboard"],mouse:d["gamezone"]["peripherals"][0]["mouse"],headset:d["gamezone"]["peripherals"][0]["headset"]});
    })

    app.get('/plat', function (req, res) {
      res.render('plat',{data:d});
    })

    app.get('/criadores', function (req, res) {
      res.render('criadores',{data:d});
    })

    app.get('/eventos', function (req, res) {
      res.render('eventos',{data:d});
    })

    app.get('*', function (req, res) {
        res.render('jogos',{data:d["gamezone"]["games"][0]["game"]});
    })

  } else {
    console.log(err)
  }
  console.log("OK");
});




app.listen(8080, () => {
    console.log('A OUVIR NO PORTO 8080')
})
