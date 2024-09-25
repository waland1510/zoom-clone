'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo, User as StreamUser } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user || !API_KEY) return;

    const streamUser: StreamUser = {
      id: user.id,
      name: user.username || user.id,
      image: user.imageUrl,
    };

    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: streamUser,
      tokenProvider,
    });

    setVideoClient(client);

    return () => {
      client.disconnectUser();
    };
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
