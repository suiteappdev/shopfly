'use strict';

angular.module('app').constant("$docFlyConf", {
		base : "http://127.0.0.1:3000/",
		socketUrl : "http://127.0.0.1:8080/",
        path: "C:\\",
        root: "#",
        gmailUser : 'docflyapp@gmail.com',
        gmailPwd : 'Majoca0126*',
        fileKey : "Majoca0126*",
        scanFolder : 'C:\\scanner',	
        //(local) si se va a escribir en disco o (s3) si se va utilizar en la nube
        provider: 's3',
        descargas: "C:\\descargas"
    })
