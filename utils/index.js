var Util = {};

Util.isObjEmpty = function(obj) {
  for (var name in obj) {
    return false;
  }
  return true;
}

module.exports = Util;
