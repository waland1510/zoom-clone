import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call | null>(null);
  const [isCallLoading, setIsCallLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client || !id) {
      setIsCallLoading(false);
      return;
    }
    
    const loadCall = async () => {
      try {
        const { calls } = await client.queryCalls({ 
          filter_conditions: { id: Array.isArray(id) ? id[0] : id } 
        });

        setCall(calls.length > 0 ? calls[0] : null);
      } catch (error) {
        console.error('Error loading call:', error);
        setError(error instanceof Error ? error : new Error('Unknown error occurred'));
      } finally {
        setIsCallLoading(false);
      }
    };

    setIsCallLoading(true);
    setError(null);
    loadCall();
  }, [client, id]);

  return { call, isCallLoading, error };
};
