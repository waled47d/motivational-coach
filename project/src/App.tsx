import React, { useState } from 'react';
import { Header } from './components/Header';
import { MessageDisplay } from './components/MessageDisplay';
import { NotificationSettings } from './components/NotificationSettings';
import { useNotifications } from './hooks/useNotifications';

function App() {
  const {
    settings,
    saveSettings,
    permission,
    requestPermission,
    isActive,
    sendTestNotification,
    getRandomMessage
  } = useNotifications();

  const [currentMessage, setCurrentMessage] = useState(() => getRandomMessage());

  const handleNewMessage = () => {
    setCurrentMessage(getRandomMessage());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        
        <div className="space-y-8">
          <MessageDisplay
            message={currentMessage}
            onNewMessage={handleNewMessage}
            onTestNotification={sendTestNotification}
          />
          
          <NotificationSettings
            settings={settings}
            onSettingsChange={saveSettings}
            permission={permission}
            onRequestPermission={requestPermission}
            isActive={isActive}
          />
        </div>
        
        <footer className="text-center mt-16 text-gray-500">
          <p>Keep this tab open to receive notifications • Made with ❤️ for your success</p>
        </footer>
      </div>
    </div>
  );
}

export default App;