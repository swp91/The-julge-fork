import clsx from 'clsx';
import Image from 'next/image';
import Button from './Button';
import { modalConfig } from '../_config/modalConfig';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  type: 'success' | 'alert' | 'question';
  content: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  questionType?: 'cancel' | 'approve' | 'reject';
}

export const Modal = ({
  isOpen,
  type,
  content,
  onClose,
  onConfirm,
  questionType = 'cancel',
}: ModalProps) => {
  // 모달창이 켜져있을 경우 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // 모달창이 켜져있지 않을 경우 아무것도 반환하지 않음
  if (!isOpen) return null;

  const config =
    type === 'question'
      ? modalConfig.question(questionType)
      : modalConfig[type];

  const { icon, responsiveClass, contentStyle, buttonPosition, buttons } =
    config;

  // 모달 타입에 따른 버튼 스타일
  const getButtonStyle = (index: number) => {
    switch (type) {
      case 'success':
        return 'default';
      case 'alert':
        return 'bordered';
      case 'question':
        return index === 0 ? 'bordered' : 'default';
      default:
        return 'default';
    }
  };

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'
      onClick={onClose}>
      <div
        className={clsx('bg-white rounded-lg relative', responsiveClass)}
        onClick={(e) => e.stopPropagation()}>
        {icon && (
          <div className='flex justify-center mt-6'>
            <Image src={icon} alt={type} width={24} height={24} />
          </div>
        )}

        <div className={clsx(contentStyle)}>{content}</div>

        <div className={clsx(buttonPosition)}>
          {buttons.map((label, index) => (
            <Button
              key={index}
              style={getButtonStyle(index)}
              size={type === 'success' ? 'sm' : 'xs'}
              onClick={() => {
                if (index === 0) {
                  onClose();
                } else {
                  onConfirm?.();
                  onClose();
                }
              }}>
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
