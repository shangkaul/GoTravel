const { concatStatic } = require("rxjs/operator/concat");

const messageRoutes = (app, fs) => {
    const itinPath = "./data/itin.json";
    const respPath = "./data/response.json";
    const ratePath = "./data/rate.json";
    const bookPath = "./data/book.json";


    const readFile = (
        callback,
        returnJson = false,
        filePath = respPath,
        encoding = "utf8"
    ) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (
        fileData,
        callback,
        filePath = respPath,
        encoding = "utf8"
    ) => {
        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // read message itinerary
    app.get("/itin", (req, res) => {
        fs.readFile(itinPath, "utf8", (err, data) => {
            if (err) {
                throw err;
            }
            res.send(data);
        });
    });
    // read message quiz


    // read message rate

    app.get("/rate", (req, res) => {
        fs.readFile(ratePath, "utf8", (err, data) => {
            if (err) {
                throw err;
            }
            res.send(data);
        });
    });
    // read message book

    app.get("/book", (req, res) => {
        fs.readFile(bookPath, "utf8", (err, data) => {
            if (err) {
                throw err;
            }
            res.send(data);
        });
    });
    // send message
    app.post("/messages", (req, res) => {
        readFile((data) => {
            const newMessageId = Object.keys(data).length + 1;
            console.log(req.body);
            data[newMessageId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send("Message recieved");
                console.log(res);
            });
        }, true);
    });

};

module.exports = messageRoutes;