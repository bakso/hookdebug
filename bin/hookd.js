#!/usr/bin/env node
const { spawn } = require('child_process');
const { basename, dirname, resolve } = require('path');
const {
  realpathSync,
  existsSync,
  readFileSync,
  writeFileSync,
  chmodSync
} = require('fs');
const which = require('which');

const rawArgv = process.argv;
const bin = rawArgv[2];
const args = rawArgv.slice(3);
if (typeof bin === 'undefined') {
  return console.log(`
  Usage: hookd <bin> [bin options]
`);
}
which(bin, function(err, resolvedPath) {
  if (err) {
    return console.error(err);
  }
  const realPath = realpathSync(resolvedPath);
  if (existsSync(realPath)) {
    let content = readFileSync(realPath, 'utf8');
    content = content.replace(
      '#!/usr/bin/env node',
      '#!/usr/bin/env node --inspect --debug-brk'
    );
    const filename = basename(realPath);
    const debugBin = resolve(dirname(realPath), `${filename}.debug`);
    console.log(debugBin, args.join(' '));
    writeFileSync(debugBin, content);
    chmodSync(debugBin, 0777);
    const p = spawn(debugBin, args, {
      stdio: 'inherit',
      cwd: process.cwd(),
      env: process.env
    });
    p.on('error', function(error){
      console.log(error);
    });
  }
});
