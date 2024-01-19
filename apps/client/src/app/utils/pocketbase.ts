import PocketBase from 'pocketbase';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const url = import.meta.env.VITE_POCKETBASE_URL;
export const pb = new PocketBase(url);
