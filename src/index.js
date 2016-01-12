let prefix = (function () {
  if (typeof window === "undefined") {
    return {};
  }
  var styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(styles)
      .join('')
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
      )[1];
  return {
    dom: pre === 'ms' ? 'MS' : pre,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre === 'ms' ? pre : pre[0].toUpperCase() + pre.substr(1)
  };
}());

let vendorSpecificProperties = [
  'animation',
  'animationDelay',
  'animationDirection',
  'animationDuration',
  'animationFillMode',
  'animationIterationCount',
  'animationName',
  'animationPlayState',
  'animationTimingFunction',
  'appearance',
  'backfaceVisibility',
  'backgroundClip',
  'borderImage',
  'borderImageSlice',
  'boxSizing',
  'boxShadow',
  'contentColumns',
  'transform',
  'transformOrigin',
  'transformStyle',
  'transition',
  'transitionDelay',
  'transitionDuration',
  'transitionProperty',
  'transitionTimingFunction',
  'perspective',
  'perspectiveOrigin',
  'userSelect',
];

function prefixName(name) {
  return prefix.js + name[0].toUpperCase() + name.substr(1);
}

function prefixStyle(properties) {
  return Object.keys(properties).reduce((previous, property) => {
    if(vendorSpecificProperties.indexOf(property) !== -1) {
      previous[prefixName(property)] = properties[property];
    } else {
      previous[property] = properties[property];
    }

    return previous;
  }, {});
}

function flexbox(properties) {
  if (typeof navigator === "undefined") {
    return properties;
  }
  var ua = navigator.userAgent.toLowerCase();

  // polyfill for safari
  let iOS = false;
  if (navigator.platform) {
    iOS = ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform.replace(' Simulator', '')) > -1;
  }
  if ((ua.indexOf('safari') !== -1 || iOS ) && ua.indexOf('chrome') === -1) {
    let rename = function(obj, from, to) {
      if(obj[from] !== undefined && obj[from] !== null) {
        obj[to] = obj[from];
        delete obj[from];
      }
    }

    if(properties.display === 'flex') {
      properties.display = '-webkit-flex';
    }

    ['alignItems', 'justifyContent', 'flexDirection', 'flex', 'flexWrap'].forEach((prop) => {
      rename(properties, prop, prefixName(prop));
    });
  // polyfil for IE10
  } else if (navigator.appVersion.indexOf("MSIE 10") !== -1) {
    if(properties.display === 'flex') {
      properties.display = '-ms-flexbox';
    }

    // @TODO: implement 2012 flexbox syntax
  }


  return properties;
}

function prefixStyles(styles) {
  if (typeof window === "undefined") {
    return styles;
  }
  return Object.keys(styles).reduce((previous, current) => {
    previous[current] = flexbox(prefixStyle(styles[current]));
    return previous;
  }, {});
};

exports.prefixOne = function(style) {
  return flexbox(prefixStyle(style));
}
exports.prefix = prefixStyles;

/*
 * var styles = VendorPrefix.prefix({
 *  animation: '0.25 ease',
 * });
 */
