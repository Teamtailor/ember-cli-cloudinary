import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { htmlSafe } from '@ember/string';
import { run } from '@ember/runloop';
import $ from 'jquery';
import { observer } from '@ember/object';

export default Component.extend({
  tagName: 'input',
  classNames: ['cloudinary-fileupload'],

  attributeBindings: ['name', 'type', 'data-cloudinary-field', 'data-form-data', 'multiple', 'style', 'accept'],

  // Attributes
  name: 'file',
  type: 'file',
  multiple: false,
  fieldName: null,
  'data-cloudinary-field': alias('fieldName'),
  accept: 'image/jpeg,image/gif,image/png',
  style: htmlSafe(""),

  // Endpoint
  signatureEndpoint: null,

  // Default Options
  disableImageResize: false,
  imageMaxWidth: 10000000,
  imageMaxHeight: 10000000,
  acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp|ico)$/i,
  maxFileSize: 50000000,
  loadImageMaxFileSize: 50000000,
  maxChunkSize: 10000000,

  // Fetch signature
  init() {
    this._super(...arguments);

    if (!this.get('signatureEndpoint')) {
      console.error('`signatureEndpoint` parameter must be specified on cloudinary-direct-file component.');
    }

    $.get(this.get('signatureEndpoint'), { timestamp: Date.now() / 1000 }).done((response) => {
      run(() => { this.set('data-form-data', JSON.stringify(response)); });
    });
  },

  didSetData: observer('data-form-data', function() {
    run.next(this, function() {
      this.$().cloudinary_fileupload({
        disableImageResize: this.get('disableImageResize'),
        imageMaxWidth: this.get('imageMaxWidth'),
        imageMaxHeight: this.get('imageMaxHeight'),
        acceptFileTypes: this.get('acceptFileTypes'),
        maxFileSize: this.get('maxFileSize'),
        loadImageMaxFileSize: this.get('loadImageMaxFileSize'),
        maxChunkSize: this.get('maxChunkSize')
      });
    });
  }),

  didInsertElement() {
    this.$().bind('cloudinarydone', (e, data) => {
      this.sendAction('onUploadDone', e, data);
    });

    this.$().bind('cloudinaryprogress', (e, data) => {
      this.sendAction('fileProgress', e, data);
    });

    this.$().bind('cloudinaryprogressall', (e, data) => {
      this.sendAction('allFileProgress', e, data);
    });

    this.$().bind('cloudinarystart', (e, data) => {
      this.sendAction('onUploadStart', e, data);
    });

    this.$().bind('cloudinarystop', (e, data) => {
      this.sendAction('onUploadStop', e, data);
    });

    this.$().bind('cloudinaryfail', (e, data) => {
      this.sendAction('onUploadFail', e, data);
    });

    this.$().bind('fileuploadprocessfail', (e, data) => {
      this.sendAction('onUploadFail', e, data);
    });

    this.$().bind('cloudinaryalways', (e, data) => {
      this.sendAction('onUploadAlways', e, data);
    });
  }
});
