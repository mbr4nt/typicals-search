export async function processPropName(model) {
    let processed = {};
    for(let key in model) {
        processed[toCamelCase(key)] = model[key];
    }
    return processed;
}

const reservedWords = new Set([
    'abstract', 'arguments', 'await', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue',
    'debugger', 'default', 'delete', 'do', 'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final', 'finally', 'float',
    'for', 'function', 'goto', 'if', 'implements', 'import', 'in', 'instanceof', 'int', 'interface', 'let', 'long', 'native', 'new',
    'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this',
    'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while', 'with', 'yield'
  ]);


  
  /**
   * Converts a human-readable field name to a camel-cased, JS-safe variable name.
   * @param {string} fieldName - The human-readable field name.
   * @returns {string} - The camel-cased JS-safe variable name.
   */
  function toCamelCase(fieldName) {
    // Remove any characters that are not letters, digits, underscores, or spaces
    let sanitized = fieldName.replace(/[^a-zA-Z0-9_ ]+/g, '');
  
    // Split by spaces or underscores, then convert to camel case
    let words = sanitized.split(/[ _]+/);
    let camelCased = words.map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toLowerCase() + word.slice(1);
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');
  
    // Ensure the result starts with a letter
    if (!/^[a-zA-Z]/.test(camelCased)) {
      camelCased = 'var' + camelCased.charAt(0).toUpperCase() + camelCased.slice(1);
    }
  
    // Check if the name is a reserved word
    if (reservedWords.has(camelCased)) {
      camelCased += 'Var';
    }
  
    return camelCased;
  }

  