import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { create } from 'xmlbuilder';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
class XMLCreator {
  constructor(settings = {}) {
    _defineProperty(this, "settings", void 0);

    this.settings = settings;
  } // eslint-disable-next-line complexity


  processXmlItem(dir, key, value) {
    if (key === 'attributes') {
      Object.keys(value).forEach(attribute => {
        dir.attribute(attribute, value[attribute]);
      });
      return;
    }

    if (key === 'email') {
      const email = value.split('@');
      dir.ele(key, {
        id: email[0],
        domain: email[1]
      });
      return;
    }

    if (value instanceof Date) {
      dir.ele(key, value.toISOString());
      return;
    }

    if (Array.isArray(value) && typeof value[0] === 'object') {
      value.forEach(item => {
        this.generateXmlData(dir.ele(key), item);
      });
      return;
    }

    if (Array.isArray(value)) {
      dir.ele(key, value.join(','));
      return;
    }

    if (typeof value === 'object') {
      this.generateXmlData(dir.ele(key), value);
      return;
    }

    dir.ele(key, value);
  }

  generateXmlData(dir, object) {
    Object.keys(object).map(key => {
      return {
        key,
        value: object[key]
      };
    }).forEach(({
      key,
      value
    }) => {
      this.processXmlItem(dir, key, value);
    });
  }

  toString(data) {
    const root = create('gpx', {
      encoding: 'UTF-8'
    });
    this.generateXmlData(root, data);
    return root.end(_objectSpread({
      allowEmpty: true,
      indent: '  ',
      newline: '\n',
      pretty: true
    }, this.settings));
  }

}

export default XMLCreator;
