import ImageUploader from '@/components/diary/ImageUploader';
import Chip from '@/components/ui/Chip';
import Textarea from '@/components/ui/Textarea';
import Topbar from '@/components/ui/Topbar';
import React, { useState } from 'react';
import BackIcon from '../../../public/images/icons/back.svg';
import { Button } from '@/components/ui/Button';
import BottomSheet from '@/components/ui/BottomSheet';
import TimeInput from '@/components/diary/TimeInput';
import SearchCatModal from './SearchCatModal';
interface DiaryWriteModalProps {
  onClose: () => void;
}

const DiaryWriteModal = ({ onClose }: DiaryWriteModalProps) => {
  const [textareaContent, setTextareaContent] = useState('');
  const [currentTime, setCurrentTime] = useState({
    hour: new Date().getHours().toString().padStart(2, '0'),
    minute: new Date().getMinutes().toString().padStart(2, '0')
  });
  const [chipObjList, setChipObjList] = useState([
    { key: 'food', content: '🐟 사료', checked: false },
    { key: 'water', content: '💧 물', checked: false }
  ]);
  const [searchCatModal, setSearchCatModal] = useState(false);
  const [selectTimeBottomSheet, setSelectTimeBottomSheet] = useState(false);
  const [tagCatList, setTagCatList] = useState([
    { key: '1', src: 'image', style: '', name: '석삼이', gender: 'female' },
    { key: '2', src: 'image', style: '', name: '점남이', gender: 'male' },
    { key: '3', src: 'image', style: '', name: '뚱쭝이', gender: 'female' },
    { key: '4', src: 'image', style: '', name: '감자', gender: 'male' }
  ]);

  const displayTime = () => {
    const { hour, minute } = currentTime;
    const formattedHour = hour.padStart(2, '0');
    const formattedMinute = minute.padStart(2, '0');
    return `${formattedHour}:${formattedMinute}`;
  };

  return (
    <div className="fixed left-0 top-0 z-10 h-screen w-full overflow-y-auto bg-gr-white">
      <Topbar type="modal" title="일지쓰기" onClose={onClose} />
      <section className="flex items-center justify-between px-4 py-2">
        <h5 className="py-2 text-heading-5 text-gr-900">돌봄 시간</h5>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setSelectTimeBottomSheet(!selectTimeBottomSheet);
          }}
        >
          {displayTime()}
        </Button>
      </section>
      <section className="flex flex-col gap-4">
        <article>
          <h5 className="p-4 text-heading-5 text-gr-900">돌봄 일지</h5>
          <div className="px-4">
            <Textarea
              propObj={{
                placeholder: '오늘 하루의 돌봄 일지를 기록해보세요.',
                content: textareaContent,
                maxLength: 500
              }}
              onChange={e => setTextareaContent(e)}
            />
          </div>
        </article>
        <article>
          <h5 className="p-4 text-heading-5 text-gr-900">
            사진 <span className="text-pr-500">2</span>/3
          </h5>
          <div className="flex gap-3 px-4">
            <ImageUploader deleteBtn />
            <ImageUploader deleteBtn />
            <ImageUploader deleteBtn />
          </div>
        </article>
        <article>
          <h5 className="p-4 text-heading-5 text-gr-900">돌봄 기록</h5>
          <div className="flex gap-2 px-4 py-1">
            {chipObjList.map(chip => {
              return (
                <Chip
                  key={chip.key}
                  propObj={chip}
                  onClick={() =>
                    setChipObjList(prevList =>
                      prevList.map(prevChip =>
                        prevChip.key === chip.key
                          ? { ...prevChip, checked: !prevChip.checked }
                          : prevChip
                      )
                    )
                  }
                />
              );
            })}
          </div>
        </article>
        <article>
          <BottomSheet
            isVisible={selectTimeBottomSheet}
            setIsVisible={() =>
              setSelectTimeBottomSheet(!selectTimeBottomSheet)
            }
          >
            <div className="padding-[0 6px] flex h-[48px] items-center justify-center">
              돌봄 시간을 입력하세요.
            </div>
            <TimeInput
              time={currentTime}
              setTime={setCurrentTime}
              setSelectTimeBottomSheet={setSelectTimeBottomSheet}
            />
          </BottomSheet>
        </article>
        <article>
          <div className="flex items-center justify-between p-4">
            <h5 className="text-heading-5 text-gr-900">
              고양이 태그
              <span className="pl-1 text-pr-500 ">{tagCatList.length}</span>
            </h5>
            <BackIcon
              width={16}
              height={16}
              stroke="var(--gr-black)"
              className="rotate-180"
              onClick={() => setSearchCatModal(true)}
            />
          </div>
          <ul className="px-4 py-1 pb-20">
            {tagCatList.map(cat => {
              return (
                <li key={cat.key} className="flex items-center gap-4 py-2">
                  <img
                    src="/vercel.svg"
                    // src={cat.src }
                    alt="cat-image"
                    className="h-12 w-12 rounded-full border"
                  />
                  <div className="flex gap-2">
                    <h5 className="text-body-2 text-gr-900">{cat.name}</h5>
                    <img
                      src={`/images/icons/gender-${cat.gender}.svg`}
                      alt="tag cat"
                      className={`rounded-full ${
                        cat.gender === 'female'
                          ? 'bg-[#FFF2F1]'
                          : 'bg-[#ECF5FF]'
                      }`}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </article>
        {searchCatModal && (
          <SearchCatModal setSearchCatModal={setSearchCatModal} />
        )}
      </section>
    </div>
  );
};

export default DiaryWriteModal;
