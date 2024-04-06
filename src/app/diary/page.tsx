'use client';

import { useState, useEffect } from 'react';
import DiaryCard from '@/components/diary/DiaryCard';
import Filter from '@/components/diary/Filter';
import DiaryListLayout from '@/components/diary/DiaryListLayout';
import DiaryWriteModal from '@/components/diary/DiaryWriteModal';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import { DiaryObj } from './diaryType';
import { useDiaries } from '@/hooks/useDiaries';
import { dateToString } from '@/utils/common';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { diaryDateAtom } from '@/atoms/diaryAtom';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { catsAtom } from '@/atoms/catsAtom';
import { getCatsOnServer } from '@/services/cat';

const DiaryPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [cats, setCats] = useAtom(catsAtom);
  const [diaryDate] = useAtom(diaryDateAtom);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState({} as DiaryObj);

  const openDetailModal = (item: DiaryObj) => {
    setSelectedModal(item);
    router.push(`/diary/${item.id}`);
  };

  const { data: catData } = useQuery({
    queryKey: ['getCats'],
    queryFn: () => getCatsOnServer({ page: 0, size: 10 }),
    staleTime: 1000 * 60 * 10
  });

  useEffect(() => {
    if (catData) {
      setCats(catData);
    }
  }, [catData]);

  const {
    data: diaryList,
    error,
    isLoading
  } = useDiaries({
    date: dateToString(diaryDate),
    page: 0,
    size: 10
  });

  useEffect(() => {
    if (showWriteModal) return;
    queryClient.invalidateQueries({ queryKey: ['diaries'] });
  }, [diaryDate, showWriteModal]);

  return (
    <>
      {!isLoading && (
        <DiaryListLayout>
          <section className="flex justify-start bg-gr-white">
            {cats?.map((cat: any) => (
              <Filter
                key={cat.id}
                id={cat.id}
                imageUrl={cat.imageUrl}
                isCoParented={cat.isCoparented}
                name={cat.name}
              />
            ))}
          </section>
          <section className="p-4">
            {!isLoading &&
              diaryList?.map((diary: DiaryObj) => (
                <DiaryCard
                  key={diary.id}
                  {...diary}
                  onClick={() => openDetailModal(diary)}
                />
              ))}
          </section>
        </DiaryListLayout>
      )}

      <FloatingActionButton onClick={() => setShowWriteModal(true)} />

      {showWriteModal && (
        <DiaryWriteModal
          onClose={() => setShowWriteModal(false)}
          id={selectedModal.id}
        />
      )}
    </>
  );
};

export default DiaryPage;
