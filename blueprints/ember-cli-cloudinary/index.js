/*jshint node:true*/
module.exports = {
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies
  
  description: 'ember-cli-cloudinary blueprint',

  afterInstall: function() {
    this.addPackageToProject('blueimp-file-upload')
    this.addPackageToProject('cloudinary-jquery-file-upload', '^2.0.6')
  }
};
