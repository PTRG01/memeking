import { useState, useEffect, useMemo, useCallback } from 'react';
import { pb } from '../utils/pocketbase';
import { ListResult, Record, RecordService } from 'pocketbase';
import { IUser } from '../contexts/auth-provider/auth-provider';

const createPbCollection = (collectionName: string) =>
  pb.collection(collectionName);

const gameCollection = createPbCollection('game');
const userCollection = createPbCollection('users');
const roundCollection = createPbCollection('round');
const memeCollection = createPbCollection('meme');
const chatCollection = createPbCollection('chats');
const messageCollection = createPbCollection('messages');

export const createSearchHook = (collection: RecordService) => {
  return () => {
    const [data, setData] = useState<ListResult | null>(null);
    const [result, setResult] = useState<Record[] | null>(null);
    const [loading, setLoading] = useState(true);

    const items = useMemo(
      () => (Array.isArray(data) ? data : data?.items || []),
      [data]
    );

    const getList = useCallback(
      async ({ page = 1, perPage = 10, queryParams = {} }) => {
        setLoading(true);
        const result = await collection.getList(page, perPage, queryParams);
        setData(result);
        setResult(result.items);
        setLoading(false);
      },
      []
    );

    const getFullList = useCallback(async (queryParams = {}) => {
      setLoading(true);
      setData(null);
      const result = await collection.getFullList(queryParams);
      setData(result);
      setLoading(false);
      console.log(result);
    }, []);

    return { data, result, loading, items, getList, getFullList };
  };
};

export const createCRUDHook = <T extends Record>(collection: RecordService) => {
  return (id?: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);

    const getOne = useCallback(
      async (query = {}, overrideId?: string) => {
        if (!id && !overrideId) throw new Error('No id provided');
        setLoading(true);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const result = (await collection.getOne(id || overrideId, query)) as T;
        setData(result);
        setLoading(false);
      },
      [id]
    );

    const createOne = useCallback(async (data: T) => {
      setLoading(true);
      const result = (await collection.create(data)) as T;
      setData(result);
      setLoading(false);
    }, []);

    const updateOne = useCallback(
      async (data: Partial<T>, overrideId?: string) => {
        if (!id && !overrideId) {
          throw new Error('No id provided');
          return;
        }
        setLoading(true);
        const result = (await collection.update(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          overrideId ? overrideId : id,
          data
        )) as T;
        setData(result);
        setLoading(false);
        console.log(result);
      },
      [id]
    );

    const deleteOne = useCallback(
      async (overrideId?: string) => {
        if (!id && !overrideId) throw new Error('No id provided');
        setLoading(true);
        await collection.delete(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          overrideId ? overrideId : id
        );
        setData(null);
        setLoading(false);
      },
      [id]
    );

    return { data, loading, getOne, createOne, updateOne, deleteOne };
  };
};

const createSubscriptionHook = <T extends Record>(
  collection: RecordService
) => {
  return (id?: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);

    const unsubscribe = useCallback(async () => {
      setLoading(true);
      await collection.unsubscribe(id);
      setData(null);
      setLoading(false);
    }, [id]);

    useEffect(() => {
      if (!id) return;
      collection.subscribe(id, (e) => {
        setData(e.record as T);
      });

      return () => {
        unsubscribe();
      };
    }, [id, unsubscribe]);

    return { data, loading, unsubscribe };
  };
};

export const useGame = createCRUDHook(gameCollection);
export const useUser = createCRUDHook<IUser>(userCollection);
export const useRound = createCRUDHook(roundCollection);
export const useMeme = createCRUDHook(memeCollection);
export const useChat = createCRUDHook(chatCollection);
export const useMessage = createCRUDHook(messageCollection);

export const useGameList = createSearchHook(gameCollection);
export const useUserList = createSearchHook(userCollection);
export const useRoundList = createSearchHook(roundCollection);
export const useMemeList = createSearchHook(memeCollection);
export const useChatList = createSearchHook(chatCollection);
export const useMessageList = createSearchHook(messageCollection);

export const useGameSubscription = createSubscriptionHook(gameCollection);
export const useUserSubscription = createSubscriptionHook(userCollection);
export const useRoundSubscription = createSubscriptionHook(roundCollection);
export const useMemeSubscription = createSubscriptionHook(memeCollection);
export const useChatSubscription = createSubscriptionHook(chatCollection);
export const useMessageSubscription = createSubscriptionHook(messageCollection);
