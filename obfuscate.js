// ESSA MARRETA PEGA O CONTEUDO DO widget.js FAZ O OBFUSCATION DO CODIGO E ESCREVE
// O RESULTADO NO ARQUIVO obfuscate-prod.js
// O ARQUIVO obfuscate-prod.js É O ARQUIVO QUE SERÁ USADO EM PROD.

const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');

fs.readFile('widget.js', 'utf8', (err, data) => {
  if (err) {console.error('Error reading widget.js:', err);return;}

  const obfuscatedCode = JavaScriptObfuscator.obfuscate(data, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    renameGlobals: false,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
  }).getObfuscatedCode();

  // escreve o resultado no novo arquivo
  fs.writeFile('obfuscate-prod.js', obfuscatedCode, 'utf8', (err) => {
    if (err) {
      console.error('Error writing obfuscate-prod.js:', err);
      return;
    }
    console.log('Obfuscated code has been written to obfuscate-prod.js');
  });
});
