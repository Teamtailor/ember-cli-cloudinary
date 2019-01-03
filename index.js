/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-cloudinary',

  included: function(app) {
    this._super.included.apply(this, arguments);

    this.import('node_modules/blueimp-file-upload/js/vendor/jquery.ui.widget.js');
    this.import('node_modules/blueimp-file-upload/js/jquery.iframe-transport.js');
    this.import('node_modules/blueimp-file-upload/js/jquery.fileupload.js');
    this.import('node_modules/blueimp-file-upload/js/jquery.fileupload-process.js');
    this.import('node_modules/blueimp-file-upload/js/jquery.fileupload-validate.js');
    this.import('node_modules/cloudinary-jquery-file-upload/cloudinary-jquery-file-upload.js');
  }
};

