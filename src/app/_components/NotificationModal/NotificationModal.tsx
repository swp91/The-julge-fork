// NotificationModal.tsx
'use client';
import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { Notification,NotificationStatus } from './types';
import axios from 'axios';

interface NotificationModalProps {
  userId: string;                    //알림 조회할 유저 ID
  isOpen: boolean;                   //모달의 열림 상태
  onClose: () => void;               //모달 닫는 함수
}

const NotificationModal: React.FC<NotificationModalProps> = ({ userId, isOpen, onClose }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

   // 알림 목록 조회
    useEffect(() => {
    if (isOpen) {
        fetchNotifications(userId);
    }
}, [isOpen]);

const fetchNotifications = async (userId: string) => {
    setLoading(true);
    setError(null);

    try {
        const token = localStorage.getItem('authToken');
            const response = await axios.get(`/users/${userId}/alerts`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { offset: 0, limit: 10 },
            });
            setNotifications(response.data.alerts);
            

        
        } catch (err) {
            setError('알림을 불러오는 데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };


    const markAsRead = async (id: string) => {
        // 알림 읽음 처리 로직 추가
        // API 호출 로직을 추가하세요.

        setNotifications((prevNotifications) =>
            prevNotifications.filter(notification => notification.id !== id)
        );
    };

    const renderNotification = (notification: Notification) => (
        <div key={notification.id} className="bg-white p-4 shadow-sm">
            <div className="flex items-start">
                <span className={clsx("w-2 h-2 rounded-full mr-2", {
                    'bg-blue-10': notification.status === '승인',
                    'bg-red-30': notification.status === '거절',
                })}></span>
                <div>
                    <p>{notification.message}</p>
                    <span className="font-family text-black text-14">
                        {new Date(notification.timestamp).toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );

    return (

<div className={clsx({ hidden: !isOpen })}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-10 shadow-lg p-4 w-80">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-family text-20b">알림 {notifications.length}개</h2>
                    <button onClick={onClose} className="text-black hover:text-black">×</button>
                </div>
                <div className="space-y-2">
                    {loading && <p>로딩 중...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {notifications.map(renderNotification)}
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;
