import { useState, useEffect, useCallback } from 'react';
import { NotificationSettings } from '../types';
import { motivationalMessages } from '../data/messages';

const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: false,
  interval: 60, // 60 minutes = 1 hour
  startTime: '09:00',
  endTime: '18:00',
  weekendsEnabled: true
};

export const useNotifications = () => {
  const [settings, setSettings] = useState<NotificationSettings>(DEFAULT_SETTINGS);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [usedMessageIds, setUsedMessageIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('motivational-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Load used message IDs
    const savedUsedIds = localStorage.getItem('used-message-ids');
    if (savedUsedIds) {
      setUsedMessageIds(new Set(JSON.parse(savedUsedIds)));
    }

    // Check notification permission
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const saveSettings = useCallback((newSettings: NotificationSettings) => {
    setSettings(newSettings);
    localStorage.setItem('motivational-settings', JSON.stringify(newSettings));
  }, []);

  const requestPermission = useCallback(async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    }
    return false;
  }, []);

  const getRandomMessage = useCallback(() => {
    const availableMessages = motivationalMessages.filter(
      msg => !usedMessageIds.has(msg.id)
    );
    
    // If all messages have been used, reset the used set
    if (availableMessages.length === 0) {
      setUsedMessageIds(new Set());
      return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    }
    
    const randomMessage = availableMessages[Math.floor(Math.random() * availableMessages.length)];
    
    // Mark this message as used
    const newUsedIds = new Set(usedMessageIds);
    newUsedIds.add(randomMessage.id);
    setUsedMessageIds(newUsedIds);
    localStorage.setItem('used-message-ids', JSON.stringify(Array.from(newUsedIds)));
    
    return randomMessage;
  }, [usedMessageIds]);

  const isWithinActiveHours = useCallback(() => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [startHour, startMin] = settings.startTime.split(':').map(Number);
    const [endHour, endMin] = settings.endTime.split(':').map(Number);
    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;
    
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    if (isWeekend && !settings.weekendsEnabled) {
      return false;
    }
    
    return currentTime >= startTime && currentTime <= endTime;
  }, [settings]);

  const sendNotification = useCallback(() => {
    if (permission !== 'granted' || !isWithinActiveHours()) {
      return;
    }

    const message = getRandomMessage();
    const notification = new Notification('💪 Your Motivational Coach', {
      body: message.text,
      icon: '/vite.svg',
      badge: '/vite.svg',
      tag: 'motivational-message',
      requireInteraction: false,
      silent: false
    });

    // Auto-close after 10 seconds
    setTimeout(() => {
      notification.close();
    }, 10000);
  }, [permission, isWithinActiveHours, getRandomMessage]);

  const startNotifications = useCallback(async () => {
    if (!settings.enabled) return;
    
    const hasPermission = permission === 'granted' || await requestPermission();
    if (!hasPermission) return;

    // Clear any existing interval
    if (intervalId) {
      clearInterval(intervalId);
    }

    // Send first notification immediately if within active hours
    if (isWithinActiveHours()) {
      sendNotification();
    }

    // Set up recurring notifications
    const id = window.setInterval(() => {
      sendNotification();
    }, settings.interval * 60 * 1000); // Convert minutes to milliseconds

    setIntervalId(id);
  }, [settings, permission, intervalId, isWithinActiveHours, sendNotification, requestPermission]);

  const stopNotifications = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [intervalId]);

  useEffect(() => {
    if (settings.enabled) {
      startNotifications();
    } else {
      stopNotifications();
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [settings.enabled, startNotifications, stopNotifications]);

  return {
    settings,
    saveSettings,
    permission,
    requestPermission,
    isActive: !!intervalId,
    sendTestNotification: sendNotification,
    getRandomMessage
  };
};