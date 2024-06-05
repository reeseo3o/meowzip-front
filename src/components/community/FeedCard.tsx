'use client';

import React, { useEffect, useRef, useState } from 'react';
import UserArea from './feed/UserArea';
import Carousel from '@/components/ui/Carousel';
import ButtonArea from '@/components/community/feed/ButtonArea';
import { useRouter } from 'next/navigation';
import { FeedType } from '@/types/communityType';

interface FeedCardProps {
  variant?: 'detail';
  content: FeedType;
  goToDetail?: () => void;
  openBottomSheet?: () => void;
}

const FeedCard = ({
  variant,
  content,
  goToDetail,
  openBottomSheet
}: FeedCardProps) => {
  const router = useRouter();

  const [showMore, setMore] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setIsClamped(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }, [content?.content]);

  const clickLike = () => {
    console.log('click like interaction');
  };

  const clickComment = () => {
    if (variant === 'detail') return;
    router.push(`/community/${content.id}`);
  };

  const clickBookmark = () => {
    console.log('프로필의 저장한 글에 피드 저장');
  };

  const toggleContent = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setMore(!showMore);
  };

  return (
    <div className="border-b border-gr-100 px-4 pt-4" onClick={goToDetail}>
      <UserArea
        nickname={content?.memberNickname}
        profile={content?.memberNickname}
        createdAt={content?.createdAt}
        onClick={() => {
          openBottomSheet && openBottomSheet();
        }}
      />
      <section className="flex flex-col items-start gap-1">
        <p
          ref={contentRef}
          className={`pt-4 text-body-3 text-gr-black ${
            showMore ? 'line-clamp-none' : 'line-clamp-3'
          }`}
          onClick={clickComment}
        >
          {content?.content}
        </p>
        {isClamped && (
          <button
            className="text-body-3 text-gr-300"
            onClick={e => toggleContent(e)}
          >
            {showMore ? '간략히' : '더보기'}
          </button>
        )}
      </section>
      {content?.images && content?.images?.length > 0 && (
        <section className="flex h-[300px] gap-2 pt-4" onClick={clickComment}>
          <Carousel images={content.images} style="rounded-b-lg" />
        </section>
      )}
      <ButtonArea
        like={content?.likeCount}
        comment={content?.commentCount}
        clickLike={clickLike}
        clickComment={clickComment}
        clickBookmark={clickBookmark}
      />
    </div>
  );
};

export default FeedCard;
