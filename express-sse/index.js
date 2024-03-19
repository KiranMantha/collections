const express = require("express");
const cors = require("cors");
const app = express();
const port = 3010;
const path = require("path");
const getTime = () => new Date().toLocaleTimeString();
const generateMessage = (number, activity) => {
  const data = {
    applicationNumber: 6000000567,
    type: "dhp-ui",
    notificationType: "APPLICATION",
    number,
    userID: 300,
    activity,
    status: "UNPR",
    reason: "D2",
    lastUpdatedTs: 1701320176587,
  };
  return `data: ${JSON.stringify(data)}\n\n`;
};

const generateBellMessage = () => {
  const data = {
    type: "dhp-ui",
    notificationType: "BELL",
    number: 0,
    userID: "409",
    activity: "REJ_INIT",
    status: "REJECTIN",
    lastUpdatedTs: getTime(),
  };
  return `data: ${JSON.stringify(data)}\n\n`;
};

app.use(express.static("static"));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.resolve("pages/index.html"));
});

app.get("/sse", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  setTimeout(() => {
    //res.write(generateBellMessage());
    // res.write(generateBellMessage(6000000006));
    // res.write(generateMessage(6000000006, 'DOCUMENT_REJECTED'));
    res.write(generateMessage(6000000006, 'PCA_REQ'));
    // setTimeout(() => {
    //   res.write(generateMessage(6000000008));
    //   setTimeout(() => {
    //     res.write(generateMessage(6000000009));
    //   }, 8000);
    // }, 5000);
  }, 3000);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
