'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

class Metadata {
  /**
   * @see http://www.topografix.com/gpx/1/1/#type_metadataType
   */
  // eslint-disable-next-line
  constructor({
    name,
    desc,
    author,
    copyright,
    link,
    time,
    keywords,
    bounds,
    extensions
  }) {
    _defineProperty(this, "name", void 0);

    _defineProperty(this, "desc", void 0);

    _defineProperty(this, "author", void 0);

    _defineProperty(this, "copyright", void 0);

    _defineProperty(this, "link", void 0);

    _defineProperty(this, "time", void 0);

    _defineProperty(this, "keywords", void 0);

    _defineProperty(this, "bounds", void 0);

    _defineProperty(this, "extensions", void 0);

    this.name = name || null;
    this.desc = desc || null;
    this.author = author || null;
    this.copyright = copyright || null;
    this.link = link || null;
    this.time = time || null;
    this.keywords = keywords || null;
    this.bounds = bounds || null;
    this.extensions = extensions || null;
  } // eslint-disable-next-line complexity


  toObject() {
    const {
      name,
      desc,
      author,
      copyright,
      link,
      time,
      keywords,
      bounds,
      extensions
    } = this;
    return _objectSpread({}, name ? {
      name
    } : {}, {}, desc ? {
      desc
    } : {}, {}, author ? {
      author: author.toObject()
    } : {}, {}, copyright ? {
      copyright: copyright.toObject()
    } : {}, {}, link ? {
      link: link.toObject()
    } : {}, {}, time ? {
      time
    } : {}, {}, keywords ? {
      keywords
    } : {}, {}, bounds ? {
      bounds: bounds.toObject()
    } : {}, {}, extensions ? {
      extensions
    } : {});
  }

}

module.exports = Metadata;
