const http = require("http");
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 8000;

// const server = http.createServer((req, res) => {
//   res.setHeader("Content-Type", "text/html");
//   if (req.url === "/") {
//     fs.readFile(path.join(__dirname, "public", "index.html"), (err, data) => {
//       if (err) throw err;
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(data);
//     });
//   }
//   else if (req.url === "/about") {
//     fs.readFile(path.join(__dirname, "public", "about.html"), (err, data) => {
//       if (err) throw err;
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(data);
//     });
//   }
//   else if(req.url === '/api/users'){
// const users=[
// {name:"Aniket Kumar Thakur" , age:21,gender:"male"},
// {name:"Adarsh Prakash" , age:20,gender:"female"}
// ];
// res.writeHead(200,{'Content-Type':'application/users'});
// res.end(JSON.stringify(users))
//   }
// });

//Build file path
const server = http.createServer((req, res) => {
  let filepath = path.join(
    __dirname,
    "public",
    req.url === '/' ? 'about.html' : req.url
  );
  console.log(req.url)
  

  //Extension
  let extname = path.extname(filepath);

  let contentType = "text/html";
  switch (extname) {
    case ".js":
      contentType = "text/javascrpit";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  //Read File
  fs.readFile(filepath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        //Page Not Found
        fs.readFile(path.join(__dirname, "public", "404.html"), (err, data) => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data, "utf-8");
        });
      } else {
        //Server Error
        res.writeHead(500);
        res.end(`Server Error ${err.code}......`);
      }
    } else {
      //Sucess
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(port, () => {
  console.log(`Server running..... on port ${port}`);
});
