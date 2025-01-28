export async function renameProp(model) {
    let processed = {};
    for(let key in model) {
        processed[rename(key)] = model[key];
    }
    return processed;
}

function rename(propName) {
  if(propName === 'subcategory') {
    return 'category';
  }
  return propName;
}
  