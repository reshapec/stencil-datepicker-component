 /* tslint:disable:no-console */
 const fs = require('fs');
 const path = require('path');
 const fetch = require('node-fetch');
 
 const express = require('express');
 const app = express();
 const port = '3030';
 const server_address = process.env.SERVER_HOST;
 
 if (!server_address) {
   console.log("SERVER_HOST not found!")
 }
 
 app.use(express.static(path.resolve(__dirname, 'www')));
 
 fs.readFile(path.join(__dirname, 'www/index.html'), function read(err, content) {
   if (err) {
     throw err;
   }
 
   app.get("*", async (req, res) => {
     try {
       res.status(200).send(`<!doctype html>${content}`);
     } catch (err) {
       console.log(req.path, err);
       res.status(500).send("Server Inner Error.");
     }
   });
 });
 
 app.get('/readiness', (_req, res) => {
   res.status(200).end();
 });
 
 app.get('/api/*', async (req, res) => {
   const url = req.url.replace("/api", server_address);
   await fetch(url).then(async (response) => {
     if (response.status !== 200) {
       res.status(response.status).send("")
     }
     const data  = await response.json();
     res.status(200).send(data);
   });
 });
 
 app.listen(port, () => console.log(`server started at http://localhost:${ port }`));