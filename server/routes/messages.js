const { concatStatic } = require("rxjs/operator/concat");

const messageRoutes = (app, fs) => {
    const dataPath = "./data/messages.json";
    const readFile = (
        callback,
        returnJson = false,
        filePath = dataPath,
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
        filePath = dataPath,
        encoding = "utf8"
    ) => {
        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // read message list
    app.get("/messages", (req, res) => {
        fs.readFile(dataPath, "utf8", (err, data) => {
            if (err) {
                throw err;
            }
            res.send(data);
        });
    });
    //send message
    app.post("/messages", (req, res) => {
        readFile((data) => {
            const newMessageId = Object.keys(data).length + 1;
            console.log(req.body);
            // add the new msg
            data[newMessageId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send("Message recieved");
                console.log(res);
            });
        }, true);
    });

};

module.exports = messageRoutes;