This is an open-source transport module for winston logger [flatiron/winston](https://github.com/flatiron/winston), logging into the easy scalable data store from crate.io.

If you don't know it:
[Crate Data](http://crate.io) - "Easy to scale real time SQL data store" 
Please note: Crate is a trademark of Crate Technology Gmbh, registered in the E.U. and in other countries.


For usage please check examples/sample.js.

```
var winston = require( 'winston' );
var CrateTransport = require( 'winsoton-crate' );
var logger = new (winston.Logger)({
	transports: [
	  new (winston.transports.Console)(),
	  new (CrateTransport.Crate)({source: 'my-module-name', connect: 'http://localhost:4200'})
	]
	});
logger.info ("Info message logged to crate", {metadata: "test-log", count:1})
```

It automatically crates a table called "log". 


## License

The MIT License(MIT)
Copyright(C) 2014 by Stefan Thies

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files(the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


