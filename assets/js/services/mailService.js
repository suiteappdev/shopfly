'use strict';

angular.module('app').service('$mailService', ["$docFlyConf", function($docFlyConf){
		try{
				var nodemailer = require('nodemailer');
				
				var transporter = nodemailer.createTransport({
				    service: 'Gmail',
				    auth: {
				        user: $docFlyConf.gmailUser,
				        pass: $docFlyConf.gmailPwd
				    }
				});

				   		
		}catch(e){}

		this.mailer = transporter;
}]);