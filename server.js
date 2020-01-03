const express = require("express");
const logger = require("morgan");
const path = require("path");
const compression = require("compression");
const app = express();
const helmet = require("helmet");

let deployFolder;
const args = process.argv.slice(2);

if (args[0]) {
  deployFolder = args[0];
  progess.env.DEPLOY_FOLDER = args[0];
} else {
  deployFolder = "public";
}

const port = process.env.PORT || 3000;

if (app.get("env") == "production") {
  app.use(
    logger("common", {
      skip: function(req, res) {
        return res.statusCode < 400;
      },
      stream: __dirname + "/../morgan.log"
    })
  );
} else {
  app.use(logger("dev"));
}
app.use(helmet());
app.use(helmet.xssFilter());

app.use(compression({ threshold: 0 }));
app.use(express.static(path.join(__dirname, deployFolder)));
app.use("/static", express.static(path.join(__dirname, deployFolder)));
app.listen(port, function() {
  console.log("Static Server listening on port " + port + "!");
});
