import { CatBaseType } from '@/app/zip/catType';
import Label from '@/components/ui/Label';
import Image from 'next/image';
import React from 'react';

const NEUTERING = { Y: '완료', N: '미완료', UNDEFINED: '모름' };

const ZipDetailCatCard = ({ ...props }: CatBaseType) => {
  return (
    <>
      <Image
        src="/images/zip-card.svg"
        alt="zip-card"
        width={120}
        height={120}
        className="w-full"
      />
      <div className="rounded-b-16 bg-gr-white px-6">
        <div className="flex flex-col items-center justify-center gap-1 pb-4 pt-2">
          <h1 className="text-heading-1 text-gr-900">{props.name}</h1>
          <Label.Default
            className="rounded-[4px] bg-gr-50 py-1 pl-2 pr-[6px] text-gr-600"
            src="/images/icons/share.svg"
            content={`만난지 ${props.dDay}일`}
          />
        </div>
        <Image
          src={props.imageUrl}
          width={375}
          height={240}
          className="rounded-xl object-cover"
          alt="cat-image"
        />
        <div className="pb-6 pt-4">
          <div className="flex items-center gap-2 py-[6px]">
            <h2 className="min-w-[60px] text-heading-5 text-gr-900">성별</h2>
            <div className="flex items-center gap-2 text-body-3 text-gr-700">
              <p>{props.sex === 'F' ? '여아' : '남아'}</p>
              <Label.Icon
                src={`/images/icons/gender-${props.sex}.svg`}
                className={`p-[2px] ${
                  props.sex === 'F' ? 'bg-[#FFF2F1]' : 'bg-[#ECF5FF]'
                }`}
              />
            </div>
          </div>
          <div className="flex gap-1 py-[6px]">
            <h2 className="min-w-[60px] text-heading-5 text-gr-900">만난 날</h2>
            <p className="text-body-3 text-gr-700">{props.metAt}</p>
          </div>
          <div className="flex gap-1 py-[6px]">
            <h2 className="min-w-[60px] text-heading-5 text-gr-900">중성화</h2>
            <p className="text-body-3 text-gr-700">
              {NEUTERING[props.isNeutered]}
            </p>
          </div>
          <div className="flex gap-1 py-[6px]">
            <h2 className="min-w-[60px] text-heading-5 text-gr-900">특징</h2>
            <p className="text-body-3 text-gr-700">{props.memo}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ZipDetailCatCard;
