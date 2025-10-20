'use client';

import { ApolloProvider } from '@apollo/client/react';
import { useState, useEffect } from 'react';
import client from '../appoloClient';

export default function ApolloProviderWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Всегда рендерим ApolloProvider, но с условной логикой внутри хуков
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}
