// @ts-check
import PocketBase from 'pocketbase';
import fs from 'fs';
(async () => {
  const pb = new PocketBase('https://memeking.fly.dev');

  // console.log(pb);
  await pb.admins.authWithPassword(
    'piotrgulmantowicz@wp.pl',
    'fHtLFADKtWXeV94'
  );

  // console.log(pb.admins);
  const file = fs.readFileSync('./pb_data/backups/new_backup.zip');
  console.log('file', file);
  await pb.backups.upload({ file: new Blob([file]) });
})();
