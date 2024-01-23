import PocketBase from 'pocketbase';

(async () => {
  const pb = new PocketBase('http://127.0.0.1:8090');

  // console.log(pb);
  const res = await pb.admins.authWithPassword(
    'piotrgulmantowicz@wp.pl',
    'an2wS56kcYsyW2L'
  );

  // console.log(pb.admins);

  await pb.backups.create('new_backup.zip');
})();
