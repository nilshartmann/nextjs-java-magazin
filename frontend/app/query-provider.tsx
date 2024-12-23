"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { enableTanstackQueryDevTools } from "@/app/demo-config.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // disable refetch completly (only for demo)
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function RecipifyQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {enableTanstackQueryDevTools && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
