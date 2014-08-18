try {
	var winston = require( 'winston' );
	var CrateTransport = require( '../lib/index.js' );
	var logger = new (winston.Logger)({
	    transports: [
	      new (winston.transports.Console)(),
	      new (CrateTransport.Crate)({source: 'my-program', connect: 'http://localhost:4200'})
	    ]
	    });
	for (var i=0; i<1000; i++) {
		 logger.info (  "Test " + i, {x:i}, function (err, res){
		 	if (err)  console.log ("Error " + err)
		 })
	} 
		

} catch (ex) { 
	console.log (ex.stack)
}

process.on ('uncaught exception', function () {})
