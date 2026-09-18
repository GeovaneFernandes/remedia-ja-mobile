import React from 'react';
import { AppNavigator } from './src/navigation';
import { requestNotificationPermission } from './src/lib/notifications';

export default function App() {
  React.useEffect(() => {
    requestNotificationPermission();
  }, []);

  return <AppNavigator />;
}
