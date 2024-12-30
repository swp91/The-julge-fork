// NotificationModal.tsx
'use client';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Notification } from './types';
import { getAlarms, markAlarmAsRead } from '@/app/_api/alarm_api';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface NotificationModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  userId,
  isOpen,
  onClose,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      fetchNotifications(userId);
    }
  }, [isOpen, userId]);

  useEffect(() => {
    if (!isOpen) {
      setNotifications([]);
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  const fetchNotifications = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAlarms(userId, 0, 10);
      const mappedNotifications = response.data.items.map((item: any) => {
        const notification = item.item;
        const startDate = new Date(notification.notice.item.startsAt);
        const startHours = startDate.getHours();
        const startMinutes = startDate.getMinutes();
        const endHours =
          startHours + Math.floor(notification.notice.item.workhour);
        const endMinutes = startMinutes;
        const formattedDate = `${startDate.getFullYear()}-${String(
          startDate.getMonth() + 1,
        ).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
        const formattedStartTime = `${String(startHours).padStart(2, '0')}:${String(
          startMinutes,
        ).padStart(2, '0')}`;
        const formattedEndTime = `${String(endHours).padStart(2, '0')}:${String(
          endMinutes,
        ).padStart(2, '0')}`;
        notification.formattedTime = `${formattedDate} ${formattedStartTime}~${formattedEndTime}`;
        return notification;
      });
      setNotifications(mappedNotifications);
    } catch (err) {
      setError('알림을 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = async (id: string) => {
    try {
      await markAlarmAsRead(userId, id);
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== id),
      );
      router.push('/profile');
    } catch (err) {
      setError('알림 읽음 처리에 실패했습니다.');
    }
  };

  const renderNotification = (notification: Notification) => {
    const relativeTime = formatDistanceToNow(new Date(notification.createdAt), {
      locale: ko,
      addSuffix: true,
    });

    return (
      <div
        key={notification.id}
        className='bg-white border-l-4 p-4 shadow-sm rounded-md flex items-start cursor-pointer hover:bg-gray-50 z-50'
        style={{
          borderColor:
            notification.result === 'accepted' ? '#3B82F6' : '#EF4444',
        }}
        onClick={() => handleNotificationClick(notification.id)}>
        <div className='flex items-start gap-2'>
          <span
            className={clsx('w-2 h-2 rounded-full mt-1', {
              'bg-blue-500': notification.result === 'accepted',
              'bg-red-500': notification.result === 'rejected',
            })}></span>
          <div>
            <p className='text-sm font-medium text-gray-800'>
              {notification.shop.item.name} ({notification.formattedTime}) 공고
              지원이
              <span
                className={clsx({
                  'text-blue-500': notification.result === 'accepted',
                  'text-red-500': notification.result === 'rejected',
                })}>
                {notification.result === 'accepted' ? ' 승인' : ' 거절'}
              </span>
              되었습니다.
            </p>
            <p className='text-xs text-gray-500 mt-1'>{relativeTime}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={clsx({ hidden: !isOpen && !loading })}>
      <div className='absolute top-[25px] right-[-20px] w-[375px] md:w-80 md:right-3 bg-red-10 shadow-lg p-4 rounded-md z-50'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-bold text-gray-800'>
            알림 {notifications.length}개
          </h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700'>
            ×
          </button>
        </div>
        <div className='space-y-2'>
          {loading && <p>로딩 중...</p>}
          {!loading && notifications.length === 0 && !error && (
            <p>알림이 없습니다.</p>
          )}
          {error && <p className='text-red-500'>{error}</p>}
          {notifications.map(renderNotification)}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;