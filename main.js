let express = require("express")
let bodyParser = require("body-parser")
let fs = require("fs")

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*")
    res.removeHeader('X-Powered-By')
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    next()

});

app.get("/get_my_name", async (req, res, next) => {
    res.status(200).json({
        'Name': 'Jesús'
    });
    next();
});

app.post("/send_your_name", async (req, res, next) => {
    fs.exists("name.json", (exists) => {
        if (exists) {
            fs.readFile('name.json', (err, documents) => {
                if (err) throw err;
                let name = JSON.parse(documents);
                let arr = []
                arr.push(name);
                let json = JSON.stringify({
                    name: req.body.name
                });
                console.log('aca: ',arr)
                arr.push(json)
            })
        } else {
            let arr = [];
            let json = JSON.stringify({
                name: req.body.name
            });
            arr.push(json)
            console.log(arr)
            fs.writeFile('./name.json', arr, (err) => {
                if (err) throw err;
            });
        }
    })
    let my_name = req.body.name
    res.status(200).json({
        'Name': my_name
    });
    next();
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Microservice: is listening on port ', process.env.PORT || 3000)
})