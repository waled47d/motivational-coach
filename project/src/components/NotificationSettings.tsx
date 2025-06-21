import React from 'react';
import { Settings, Clock, Calendar, Bell, BellOff } from 'lucide-react';
import { NotificationSettings as NotificationSettingsType } from '../types';

interface NotificationSettingsProps {
  settings: NotificationSettingsType;
  onSettingsChange: (settings: NotificationSettingsType) => void;
  permission: NotificationPermission;
  onRequestPermission: () => Promise<boolean>;
  isActive: boolean;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  settings,
  onSettingsChange,
  permission,
  onRequestPermission,
  isActive
}) => {
  const handleToggle = async () => {
    if (!settings.enabled && permission !== 'granted') {
      const granted = await onRequestPermission();
      if (!granted) return;
    }
    
    onSettingsChange({
      ...settings,
      enabled: !settings.enabled
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Notification Settings</h2>
      </div>

      {/* Enable/Disable Toggle */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center gap-3">
          {isActive ? (
            <Bell className="w-5 h-5 text-green-600" />
          ) : (
            <BellOff className="w-5 h-5 text-gray-400" />
          )}
          <div>
            <h3 className="font-medium text-gray-800">Hourly Notifications</h3>
            <p className="text-sm text-gray-600">
              {isActive ? 'Active and sending messages' : 'Currently disabled'}
            </p>
          </div>
        </div>
        <button
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.enabled ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {permission === 'denied' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-700">
            Notifications are blocked. Please enable them in your browser settings to receive motivational messages.
          </p>
        </div>
      )}

      {/* Interval Setting */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <label className="font-medium text-gray-800">Message Frequency</label>
        </div>
        <select
          value={settings.interval}
          onChange={(e) => onSettingsChange({
            ...settings,
            interval: Number(e.target.value)
          })}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value={15}>Every 15 minutes</option>
          <option value={30}>Every 30 minutes</option>
          <option value={60}>Every hour</option>
          <option value={120}>Every 2 hours</option>
          <option value={180}>Every 3 hours</option>
        </select>
      </div>

      {/* Active Hours */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <label className="font-medium text-gray-800">Active Hours</label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Start Time</label>
            <input
              type="time"
              value={settings.startTime}
              onChange={(e) => onSettingsChange({
                ...settings,
                startTime: e.target.value
              })}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">End Time</label>
            <input
              type="time"
              value={settings.endTime}
              onChange={(e) => onSettingsChange({
                ...settings,
                endTime: e.target.value
              })}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Weekend Setting */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div>
          <h3 className="font-medium text-gray-800">Include Weekends</h3>
          <p className="text-sm text-gray-600">Receive messages on Saturday and Sunday</p>
        </div>
        <button
          onClick={() => onSettingsChange({
            ...settings,
            weekendsEnabled: !settings.weekendsEnabled
          })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.weekendsEnabled ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.weekendsEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
};