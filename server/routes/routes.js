const messageRoutes = require("./messages");

const appRouter = (app, fs) => {
    app.get("/", (req, res) => {
        res.send("welcome to the development api-server");
    });

    messageRoutes(app, fs);
};

module.exports = appRouter;