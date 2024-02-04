import { useState, useEffect, useMemo, useCallback } from 'react';
import { pb } from '../utils/pocketbase';
import Record from 'pocketbase';
import { ListResult, RecordService } from 'pocketbase';
import { IUser } from '../contexts/auth-provider/auth-provider.interface';
import { IPost } from '../contexts/post-provider/post-provider.interface';
import { IComment } from '../contexts/comment-provider/comment-provider.interface';
import { IGroup } from '../contexts/group-provider/group-provider.interface';

const createPbCollection = (collectionName: string) =>
  pb.collection(collectionName);
pb.autoCancellation(false);

const gameCollection = createPbCollection('game');
const userCollection = createPbCollection('users');
const roundCollection = createPbCollection('round');
const memeCollection = createPbCollection('meme');
const chatCollection = createPbCollection('chats');
const messageCollection = createPbCollection('messages');
const postCollection = createPbCollection('posts');
const commentCollection = createPbCollection('comments');
const groupCollection = createPbCollection('groups');

export const createSearchHook = <T extends Record>(
  collection: RecordService
) => {
  return () => {
    const [data, setData] = useState<ListResult<T> | T[] | null>(null);
    const [result, setResult] = useState<T[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const items = useMemo(
      () => (Array.isArray(data) ? data : data?.items || []),
      [data]
    );

    const getList = useCallback(
      async ({ page = 1, perPage = 10, queryParams = {} }) => {
        setLoading(true);
        try {
          const result = await collection.getList<T>(
            page,
            perPage,
            queryParams
          );
          setData(result);
          setResult(result.items);
        } catch (error) {
          setError(
            error instanceof Error
              ? error
              : new Error('An unknown error occured')
          );
        } finally {
          setLoading(false);
        }
      },
      []
    );

    const getFullList = useCallback(async (queryParams = {}) => {
      setLoading(true);
      try {
        const result = await collection.getFullList<T>(queryParams);
        setData(result);
        setResult(result);
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error('An unknown error occured')
        );
      } finally {
        setLoading(false);
      }
    }, []);

    return useMemo(
      () => ({
        data,
        result,
        error,
        loading,
        items,
        getList,
        getFullList,
      }),
      [data, getFullList, getList, items, loading, result, error]
    );
  };
};

export const createCRUDHook = <T extends Record>(collection: RecordService) => {
  return (id?: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getOne = useCallback(
      async (query = {}, overrideId?: string) => {
        if (!id && !overrideId) throw new Error('No id provided');
        setLoading(true);
        try {
          const result = (await collection.getOne(
            (overrideId ? overrideId : id) as string,
            query
          )) as T;
          setData(result);
          return result;
        } catch (error) {
          setError(
            error instanceof Error
              ? error
              : new Error('An unknown error occured')
          );
        } finally {
          setLoading(false);
        }
      },
      [id]
    );

    const createOne = useCallback(async (data: Partial<T>) => {
      setLoading(true);
      const result = (await collection.create(data)) as T;
      setData(result);
      setLoading(false);
      return result;
    }, []);

    const updateImage = useCallback(
      async (data: Partial<T>, overrideId?: string) => {
        if (!id && !overrideId) {
          throw new Error('No id provided');
        }
        const formData = new FormData();
        for (const key in data) {
          formData.append(key, data[key] as string | Blob);
        }
        setLoading(true);
        try {
          const result = (await collection.update(
            (overrideId ? overrideId : id) as string,
            formData
          )) as T;
          setData(result);
        } catch (error) {
          setError(
            error instanceof Error
              ? error
              : new Error('An unknown error occured')
          );
        } finally {
          setLoading(false);
        }
      },
      [id]
    );

    const updateOne = useCallback(
      async (data: Partial<T>, overrideId?: string) => {
        if (!id && !overrideId) {
          throw new Error('No id provided');
        }

        setLoading(true);
        try {
          const result = (await collection.update(
            (overrideId ? overrideId : id) as string,
            data
          )) as T;
          setData(result);
        } catch (error) {
          setError(
            error instanceof Error
              ? error
              : new Error('An unknown error occured')
          );
        } finally {
          setLoading(false);
        }
      },
      [id]
    );

    const deleteOne = useCallback(
      async (overrideId?: string) => {
        if (!id && !overrideId) throw new Error('No id provided');
        setLoading(true);
        try {
          await collection.delete((overrideId ? overrideId : id) as string);
          setData(null);
        } catch (error) {
          setError(
            error instanceof Error
              ? error
              : new Error('An unknown error occured')
          );
        } finally {
          setLoading(false);
        }
      },
      [id]
    );

    return {
      data,
      error,
      loading,
      getOne,
      createOne,
      updateOne,
      deleteOne,
      updateImage,
    };
  };
};

const createSubscriptionHook = <T extends Record>(
  collection: RecordService
) => {
  return (id?: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const unsubscribe = useCallback(async () => {
      setLoading(true);
      await collection.unsubscribe(id);
      setData(null);
      setError(null);
      setLoading(false);
    }, [id]);

    useEffect(() => {
      if (!id) return;
      collection.subscribe(id, (e) => {
        setData(e.record as T);
        setError(null);
      });

      return () => {
        unsubscribe();
      };
    }, [id, unsubscribe]);

    return { data, error, loading, unsubscribe };
  };
};

export const useGame = createCRUDHook(gameCollection);
export const useUser = createCRUDHook<IUser>(userCollection);
export const useRound = createCRUDHook(roundCollection);
export const useMeme = createCRUDHook(memeCollection);
export const useChat = createCRUDHook(chatCollection);
export const useMessage = createCRUDHook(messageCollection);
export const usePost = createCRUDHook(postCollection);
export const useComment = createCRUDHook(commentCollection);
export const useGroup = createCRUDHook<IGroup>(groupCollection);

export const useGameList = createSearchHook(gameCollection);
export const useUserList = createSearchHook(userCollection);
export const useRoundList = createSearchHook(roundCollection);
export const useMemeList = createSearchHook(memeCollection);
export const useChatList = createSearchHook(chatCollection);
export const useMessageList = createSearchHook(messageCollection);
export const usePostList = createSearchHook<IPost>(postCollection);
export const useCommentList = createSearchHook<IComment>(commentCollection);
export const useGroupList = createSearchHook<IGroup>(groupCollection);

export const useGameSubscription = createSubscriptionHook(gameCollection);
export const useUserSubscription = createSubscriptionHook(userCollection);
export const useRoundSubscription = createSubscriptionHook(roundCollection);
export const useMemeSubscription = createSubscriptionHook(memeCollection);
export const useChatSubscription = createSubscriptionHook(chatCollection);
export const useMessageSubscription = createSubscriptionHook(messageCollection);
export const usePostSubscription = createSubscriptionHook(postCollection);
export const useCommentSubscription = createSubscriptionHook(commentCollection);
export const useGroupSubscription = createSubscriptionHook(groupCollection);
