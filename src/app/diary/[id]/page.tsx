'use client';

import React, { useEffect, useState } from 'react';
import Topbar from '@/components/ui/Topbar';
import Carousel from '@/components/ui/Carousel';
import Label from '@/components/ui/Label';
import MoreBtnBottomSheet from '@/components/community/MoreBtnBottomSheet';
import { getCookie } from '@/utils/common';
import { jwtDecode } from 'jwt-decode';
import { useMutation } from '@tanstack/react-query';
import { deleteDiaryOnServer } from '@/services/diary';
import { useDiaryDetail } from '@/hooks/useDiaries';
import { useRouter } from 'next/navigation';
import DiaryWriteModal from '@/components/diary/DiaryWriteModal';
import { Cat } from '@/types/cat';

const DiaryDetailPage = ({ params: { id } }: { params: { id: number } }) => {
  const router = useRouter();

  const [editBottomSheet, setEditBottomSheet] = useState(false);
  const [showWriteModal, setShowWriteModal] = useState(false);

  const { data: diaryDetail, isError, isLoading } = useDiaryDetail(id);

  const token = getCookie('Authorization');
  const decodedToken: { memberId: number } = jwtDecode(token);

  useEffect(() => {
    if (!diaryDetail) return;
  }, [id]);

  const deleteDidary = () => {
    deleteDiaryMutation.mutate(id);
  };
  const deleteDiaryMutation = useMutation({
    mutationFn: (id: number) => deleteDiaryOnServer(id),
    onSuccess: (response: any) => {
      if (response.status === 'OK') {
        router.push('/diary');
      } else {
        console.error('일지 삭제 중 오류:', response.message);
      }
    },
    onError: (error: any) => {
      console.error('일지 삭제 중 오류:', error);
    }
  });

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;

  return (
    <div className="fixed left-0 top-0 z-10 h-screen overflow-y-auto bg-gr-white">
      <Topbar
        type="modal"
        title="날짜 props"
        onClose={() => router.back()}
        onClick={() => setEditBottomSheet(true)}
      />
      <section className="flex flex-col gap-4 border-b border-gr-100 px-4 pb-8 pt-12">
        <h5 className="text-end text-body-4 text-gr-500">
          {diaryDetail.memberNickname} • {diaryDetail.caredTime}
        </h5>
        <div className="flex h-[300px] w-[90vw]">
          {diaryDetail.images && (
            <Carousel images={diaryDetail.images} style="rounded-16" />
          )}
        </div>
        <h4 className="text-body-3 text-gr-black">{diaryDetail.content}</h4>
        <article className="mb-2 flex items-center justify-start gap-1">
          {diaryDetail.isFeed && (
            <Label.Text
              content="🐟 사료"
              className="rounded-md bg-gr-50 px-[6px] pb-1 pt-[5px]"
            />
          )}
          {diaryDetail.isGivenWater && (
            <Label.Text
              content="💧 물"
              className="rounded-md bg-gr-50 px-[6px] pb-1 pt-[5px]"
            />
          )}
        </article>
      </section>
      <section className="px-4 pb-[120px] pt-4">
        <h3 className="py-3 text-heading-5 text-gr-900">
          태그된 고양이 <span className="text-pr-500">{5}</span>
        </h3>
        {diaryDetail?.taggedCats?.map((cat: Cat) => (
          <article key={cat.id} className="flex items-center gap-4 py-2">
            <img
              src={cat.imageUrl}
              alt="cat-image"
              className="h-12 w-12 rounded-full"
            />
            <div className="flex items-center gap-2">
              <h4 className="text-body-3 text-gr-900">{cat.name}</h4>
              <img
                src={`/images/icons/gender-${cat.sex}.svg`}
                alt=""
                className={`rounded-full ${
                  cat.sex === 'F' ? 'bg-[#FFF2F1]' : 'bg-[#ECF5FF]'
                }`}
              />
            </div>
          </article>
        ))}
      </section>
      <MoreBtnBottomSheet
        isVisible={editBottomSheet}
        setIsVisible={() => setEditBottomSheet(!editBottomSheet)}
        heightPercent={['50%', '40%']}
        name={diaryDetail.memberNickname}
        isMine={decodedToken.memberId === diaryDetail.memberId}
        onDelete={deleteDidary}
        onEdit={() => setShowWriteModal(true)}
      />

      {showWriteModal && (
        <DiaryWriteModal
          onClose={() => setShowWriteModal(false)}
          id={diaryDetail.id}
          diaryDetail={diaryDetail}
        />
      )}
    </div>
  );
};

export default DiaryDetailPage;
