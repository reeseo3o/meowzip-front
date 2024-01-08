'use client';

import Email from '@/components/signin/Email';
import Password from '@/components/signin/Password';
import CheckAccount from '@/components/signin/CheckAccount';
import SignInMain from '@/components/signin/SignInMain';
import Complete from '@/components/signin/Complete';
import Topbar from '@/components/ui/Topbar';
import KakaoLogin from '@/components/signin/KakaoLogin';

export type NonEmptyArray<T> = readonly [T, ...T[]];
import { useFunnel } from '@/components/common/Funnel';

const SignInPage = () => {
  const steps = [
    'main',
    'email',
    'accountInfo',
    'password',
    'complete',
    'kakao'
  ] as const;

  type Step = (typeof steps)[number];

  const [Funnel, setStep] = useFunnel(steps, 'main');

  return (
    <div className="p-[40px 16px 0px 16px] flex-[1 0 0] flex max-w-[640px] flex-col items-center self-stretch">
      <div className="funnel-container mt-16 w-full">
        <Funnel>
          <Funnel.Step name="main">
            <SignInMain setStep={() => setStep('email')} />
          </Funnel.Step>
          <Funnel.Step name="email">
            <Email setStep={(nextStep: Step) => setStep(nextStep)} />
          </Funnel.Step>
          <Funnel.Step name="accountInfo">
            <div className="fixed top-0 w-full">
              <Topbar
                hideRight
                type="modal"
                title="계정 확인"
                onClick={() => history.go(-1)}
              />
            </div>
            <CheckAccount setStep={() => setStep('complete')} />
          </Funnel.Step>
          <Funnel.Step name="password">
            <Password setStep={() => setStep('complete')} />
          </Funnel.Step>
          <Funnel.Step name="complete">
            <Complete />
          </Funnel.Step>
          <Funnel.Step name="kakao">
            <KakaoLogin />
          </Funnel.Step>
        </Funnel>
      </div>
    </div>
  );
};

SignInPage.displayName = 'SignInPage';
export default SignInPage;
