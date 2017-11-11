function isObjEmpty(obj) {
  for (var name in obj) {
    return false;
  }
  return true;
}


export {isObjEmpty};
