var base64Data = req.body.base64.replace(/^data:image\/png;base64,/, "");

require("fs").writeFile("out.pdf", base64Data, 'base64', function(err){

})