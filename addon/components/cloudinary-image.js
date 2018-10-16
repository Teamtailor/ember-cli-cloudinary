import $ from 'jquery';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';

const CloudinaryImageComponent = Component.extend({
  tagName: 'img',
  attributeBindings: ['src', 'width', 'height'],

  width: alias('options.width'),
  height: alias('options.height'),

  src: computed('publicId', 'width', 'height', function() {
    return $.cloudinary.url(this.get('publicId'), this.get('options'));
  })
});

CloudinaryImageComponent.reopenClass({
  positionalParams: ['publicId', 'options']
});

export default CloudinaryImageComponent;
