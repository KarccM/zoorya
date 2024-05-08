import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { withExpoSnack } from 'nativewind'

const Layout = () => {
  const queryClient = new QueryClient()
  const user = 123;
  return (
    <>
      <StatusBar />
      <QueryClientProvider client={queryClient}>
        <Stack>
          {user ?
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> :
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          }
        </Stack>
      </QueryClientProvider>
    </>
  )
};

export default withExpoSnack(Layout);