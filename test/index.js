import {FS, PATH, PATH_FS} from '../fs.mjs';

const read = () => {
  const out = [];
  for (const file of FS.readdir(mountDir).filter(file => !/^\.+$/.test(file)))
    out.push(file);
  console.log(out.join('\n'));
};

const onsync = error => {
  if (error) throw error;
  read();
};

const mountDir = '/idbfs';
FS.mkdir(mountDir);
FS.mount(FS.filesystems.IDBFS, { root: '.' }, mountDir);
FS.syncfs(true, onsync);

addEventListener('message', () => {
  FS.syncfs(true, onsync);
});
