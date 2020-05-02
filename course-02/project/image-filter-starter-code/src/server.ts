import express from 'express';
const isImageUrl = require('is-image-url');
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());


// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1

  app.get( "/filteredimage", async ( req, res ) => {
    let {image_url}=req.query;
    if(!image_url){
      return res.send("URL not provided")
    }    
    filterImageFromURL(image_url)
    .then(function(url){
      const a=url.split("/");
      res.status(200).sendFile(url,()=>{
        deleteLocalFiles([url]);

      })
    }).catch(err=>{res.status(404).send('URL is not an appropriate image URL.Please try again!')})
  } );
    // res.status(200).sendFile(filteredurl,()=>
    // {
    //   const a=filteredurl.split("/");
    //   deleteLocalFiles(['src/util/tmp/'+a[a.length-1]]);

    // })
    //   //console.log('src/util/tmp/'+a[a.length-1]);
  
  
// Another way to send file and then delete the file locally is-
//const filteredurl= filterImageFromURL(image_url); This will return a promise,we can use then function to work
// with the value that this promise returns.
// filteredurl.then(function(url){
    //   const a=url.split("/");
    //   res.sendFile(url,()=>{
    //     deleteLocalFiles(['src/util/tmp/'+a[a.length-1]]);
    //   });
    

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();