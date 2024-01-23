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

  await pb.backups.restore('blob');
})();
