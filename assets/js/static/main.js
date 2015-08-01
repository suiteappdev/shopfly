global.$ = $;

var abar = require('address_bar');
var folder_view = require('folder_view');
var nwGui = require('nw.gui');

var App = {};

$(document).ready(function() {
  var folder = new folder_view.Folder($('#files'));

 // folder.open('Z:\\Facturacion\\0c7c365f87b980f373d01b89aca5507102f8da0a');

  App.folder = folder;

  folder.on('navigate', function(dir, mime) {
      nwGui.Shell.openItem(mime.path);
  });

});
