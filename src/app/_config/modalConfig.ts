export const modalConfig = {
  success: {
    icon: null,
    responsiveClass: 'w-[327px] h-[220px] md:w-[540px] md:h-[250px]',
    contentStyle: 'mt-[81px] md:mt-[108px] mb-[50px] md:mb-[45px] text-center',
    buttonPosition:
      'bottom-[28px] w-full flex justify-center px-[28px] md:justify-end md:right-[28px]',
    buttons: ['확인'],
  },
  alert: {
    icon: '/image/modal-alert.svg',
    responsiveClass: 'w-[298px] h-[184px]',
    contentStyle: 'mt-[24px] mb-[32px] text-center',
    buttonPosition: 'absolute bottom-[20px] w-full flex justify-center',
    buttons: ['확인'],
  },
  question: (type: 'cancel' | 'approve' | 'reject') => {
    const actions = {
      cancel: ['아니오', '취소하기'],
      approve: ['아니오', '승인하기'],
      reject: ['아니오', '거절하기'],
    };

    return {
      icon: '/image/modal-question.svg',
      responsiveClass: 'w-[298px] h-[184px]',
      contentStyle: 'mt-[24px] mb-[32px] text-center',
      buttonPosition: 'absolute bottom-[20px] w-full flex justify-center gap-2',
      buttons: actions[type],
    };
  },
};
