const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://blog:Asdfgh%40123@cluster0.ysusfbc.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    retryWrites: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const VisitorModel = require("./schema/visitor_model");
app.post("/create-view", (req, res) => {
  const newVisit = new VisitorModel();
  VisitorModel.create({ event_name: "view_count", count: 1 }, (err, doc) => {
    if (err) console.log(err);
    else console.log(doc);
  });
});
app.get("/get-view", (req, res) => {
  // VisitorModel.find({ event_name: "view_count" }).then((doc) => {
  //   console.log(doc);
  //   // res.send(doc);
  // });
  VisitorModel.findOneAndUpdate(
    { event_name: "view_count" },
    { $inc: { count: 1 } },
    { new: true },
    function (err, response) {
      if (err) {
        console.log(err);
      } else {
        console.log(response);
        res.json(response.count);
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
