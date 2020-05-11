const router = require("express").Router();
const fs = require("fs");
var tesseract = require("tesseract.js");

router.route("/").post((req, res) => {
  
  const {data} = req.body;
  
  // convert base 64 to image
  let base64Image = data.split(';base64,').pop();
  fs.writeFile("./src/images/convert.png", base64Image, {encoding: 'base64'}, function (err, data) {
    if (err) {
      console.log (err);
    }
    
    tesseract.recognize(fs.readFileSync("./src/images/convert.png"))
      .then(result => {
        var txt = result.data.text;

        txt = txt.split("\n");
        var arr = [];
        
        for (var i = 0; i < txt.length; i++) {
          if (!(txt[i] === '' || (txt[i].includes("WEEK") && txt[i].includes("TERMS")) ) ){
            
            var tmp = txt[i];

            if (parseInt(tmp[0]) && (tmp[2] === ' ' || tmp[2] === '.')) {
              tmp = tmp.substring(3);
              arr.push(tmp);
              
            } else {
              arr[arr.length - 1] += " " + tmp;
            
            }
            
          }
        }
        for (var i = 0; i < arr.length; i++) {
          arr[i] = arr[i].split(":");
        }
        
        return (res.json(arr));
        /**
         * Used to store file into data, so we can use it for quick testing
         */
        /*
        fs.writeFile("./src/data/tmp.txt", txt, function (err, result) {
          if (err) {
            console.log(err);
          }
          
          
        })
        */
        
      })
      /**
       * load file straight from data for quick testing
       */
      /*
      var txt = fs.readFileSync("./src/data/tmp.txt", 'utf8');
      txt = txt.split("\n");
      var arr = [];
      
      for (var i = 0; i < txt.length; i++) {
        if (!(txt[i] === '' || (txt[i].includes("WEEK") && txt[i].includes("TERMS")) ) ){
          
          var tmp = txt[i];

          if (parseInt(tmp[0]) && (tmp[2] === ' ' || tmp[2] === '.')) {
            tmp = tmp.substring(3);
            arr.push(tmp);
            
          } else {
            arr[arr.length - 1] += " " + tmp;
           
          }
          
        }
      }
      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split(":");
      }
      
      return (res.json(arr));
      */
  });
  
  /*
  client.textDetection("./images/convert.png")
    .then(
      results => {
        console.log(results);
        return res.json(results);
      }
    )
    .catch(err => res.status(400).json('Error: ' + err))
  */
 
  
})

module.exports = router;