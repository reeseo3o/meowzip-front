'use client';

import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { resetPwdOnServer } from '../../services/signup';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import usePasswordHandler from '../../utils/usePasswordHandler';
import Modal from '@/components/ui/Modal';

const ResetPwdPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [token, setToken] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { password, passwordCheck, handlePwdChange, handlePwdCheckChange } =
    usePasswordHandler();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) return;

    setToken(token);
  }, []);

  /**
   * @description API - POST reset password
   */
  const signUpMutation = useMutation({
    mutationFn: (reqObj: { password: string; token: string }) =>
      resetPwdOnServer(reqObj),
    onSuccess: (data: any) => {
      if (data.status !== 'OK') {
        data.message && setErrorMsg(data.message);
        setOpenModal(true);
      } else {
        router.push('/signin');
      }
    }
  });

  const resetPwd = () => {
    signUpMutation.mutate({ password: password.value, token: token });
  };

  return (
    <section className="px-4 pt-10">
      <article className="pb-8 text-left text-heading-1 text-gr-black">
        <h1>새 비밀번호를 입력하여</h1>
        <h1>재설정하세요</h1>
      </article>
      <article className="flex flex-col gap-2">
        <Input
          helperText={
            password.error ? '8자 이상 / 영문, 숫자, 특수문자 가능' : ''
          }
          value={password.value}
          placeholder="8자 이상 / 영문, 숫자, 특수문자 가능"
          error={password.error ? true : false}
          onChange={handlePwdChange}
        />
        <Input
          helperText={passwordCheck.error ? '비밀번호를 확인해주세요' : ''}
          value={passwordCheck.value}
          placeholder="비밀번호 확인"
          error={passwordCheck.error ? true : false}
          onChange={handlePwdCheckChange}
        />
      </article>
      <article className="py-4">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          disabled={
            !password.value ||
            !passwordCheck.value ||
            password.error ||
            passwordCheck.error
              ? true
              : false
          }
          onClick={resetPwd}
        >
          재설정하기
        </Button>
      </article>
      {openModal && (
        <Modal
          contents={{ title: '알림', body: errorMsg }}
          scrim={true}
          buttons={[
            {
              variant: 'primary',
              size: 'lg',
              content: '확인',
              style: 'w-full rounded-[16px] px-4 py-2 bg-sm-error-700'
            }
          ]}
          onClose={() => {
            setOpenModal(false);
          }}
        />
      )}
    </section>
  );
};

export default ResetPwdPage;
