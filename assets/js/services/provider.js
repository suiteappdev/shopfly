var edge = require('edge');

window.getScanner = edge.func({
	assemblyFile: 'assembly/scanner.dll',
	typeName: 'scanner.provider',
	methodName: 'GetScanners'
});

window.ScanfromHtml = ScanfromHtml = edge.func({
	assemblyFile: 'assembly/scanner.dll',
	typeName: 'scanner.provider',
	methodName: 'ScanfromHtml'
});
