import { useState, useEffect, useMemo, useCallback } from 'react';
import { pb } from '../utils/pocketbase';
import { ListResult, Record, RecordService } from 'pocketbase';

const createPbCollection = (collectionName: string) =>
  pb.collection(collectionName);

const gameCollection = createPbCollection('game');
const userCollection = createPbCollection('user');
const roundCollection = createPbCollection('round');
const memeCollection = createPbCollection('meme');

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
      setResult(await collection.getFullList(queryParams));
      setLoading(false);
    }, []);

    return { data, result, loading, items, getList, getFullList };
  };
};

export const createCRUDHook = (collection: RecordService) => {
  return (id: string) => {
    const [data, setData] = useState<Record | null>(null);
    const [loading, setLoading] = useState(true);

    const getOne = useCallback(
      async (query = {}) => {
        setLoading(true);
        const result = await collection.getOne(id, query);
        setData(result);
        setLoading(false);
      },
      [id]
    );

    const createOne = useCallback(async (data: Record) => {
      setLoading(true);
      const result = await collection.create(data);
      setData(result);
      setLoading(false);
    }, []);

    const updateOne = useCallback(
      async (data: Record, overrideId?: string) => {
        setLoading(true);
        const result = await collection.update(
          overrideId ? overrideId : id,
          data
        );
        setData(result);
        setLoading(false);
      },
      [id]
    );

    const deleteOne = useCallback(
      async (overrideId?: string) => {
        setLoading(true);
        await collection.delete(overrideId ? overrideId : id);
        setData(null);
        setLoading(false);
      },
      [id]
    );

    return { data, loading, getOne, createOne, updateOne, deleteOne };
  };
};

const createSubscriptionHook = (collection: RecordService) => {
  return (id: string) => {
    const [data, setData] = useState<Record | null>(null);
    const [loading, setLoading] = useState(true);

    const unsubscribe = useCallback(async () => {
      setLoading(true);
      await collection.unsubscribe(id);
      setData(null);
      setLoading(false);
    }, [id]);

    useEffect(() => {
      collection.subscribe(id, (e) => {
        setData(e.record);
      });

      return () => {
        unsubscribe();
      };
    }, [id, unsubscribe]);

    return { data, loading, unsubscribe };
  };
};

export const useGame = createCRUDHook(gameCollection);
export const useUser = createCRUDHook(userCollection);
export const useRound = createCRUDHook(roundCollection);
export const useMeme = createCRUDHook(memeCollection);

export const useGameList = createSearchHook(gameCollection);
export const useUserList = createSearchHook(userCollection);
export const useRoundList = createSearchHook(roundCollection);
export const useMemeList = createSearchHook(memeCollection);

export const useGameSubscription = createSubscriptionHook(gameCollection);
export const useUserSubscription = createSubscriptionHook(userCollection);
export const useRoundSubscription = createSubscriptionHook(roundCollection);
export const useMemeSubscription = createSubscriptionHook(memeCollection);
