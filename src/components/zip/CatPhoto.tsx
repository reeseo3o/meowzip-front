import Topbar from '../ui/Topbar';
import ImageUploader from '@/components/diary/ImageUploader';
import { CatRegisterReqObj } from '@/app/zip/catType';
import Filter from '../diary/Filter';
import { useState } from 'react';

interface SignInMainProps {
  setStep: () => void;
  setCatData: (data: any) => void;
  setPrev: () => void;
}

export default function CatPhoto({
  setStep,
  setCatData,
  setPrev
}: SignInMainProps) {
  const [selectedImage, setSelectedImage] = useState({
    key: 0,
    imageSrc: '',
    croppedImage: null
  });

  const defaultImagesrc =
    'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg';

  const catImages = [
    {
      key: 0,
      imageSrc:
        'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg',
      croppedImage: null
    },
    {
      key: 1,
      imageSrc:
        'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg',
      croppedImage: null
    },
    {
      key: 2,
      imageSrc:
        'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg',
      croppedImage: null
    },
    {
      key: 3,
      imageSrc:
        'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg',
      croppedImage: null
    },
    {
      key: 4,
      imageSrc:
        'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg',
      croppedImage: null
    },
    {
      key: 5,
      imageSrc:
        'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg',
      croppedImage: null
    },
    {
      key: 6,
      imageSrc:
        'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg',
      croppedImage: null
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 h-full min-w-[320px] bg-gr-white">
      <Topbar type="three">
        <Topbar.Back onClick={setPrev} />
        <Topbar.Title title="고양이 등록(2/3)" />
        <Topbar.Complete
          onClick={() => {
            setCatData((prev: CatRegisterReqObj) => ({
              ...prev,
              image: selectedImage.imageSrc,
              croppedImage: selectedImage.croppedImage
            }));
            setStep();
          }}
        />
      </Topbar>
      <section className="pt-20">
        <div className="flex items-center justify-center">
          <img
            className="rounded-[48px]"
            src={selectedImage.croppedImage || defaultImagesrc}
            width={120}
            height={120}
            alt="고양이 사진"
          />
        </div>
      </section>
      <section className="px-6">
        <div className="py-4 text-center text-body-4 text-gr-black">
          고양이 대표 사진을 하나 선택하세요!
        </div>
        <div className="grid grid-cols-4 gap-4">
          <ImageUploader
            width="w-16"
            height="h-16"
            data={selectedImage}
            deleteBtn
            onUpload={(data: any) => {
              setSelectedImage(data);
            }}
          />
          {catImages.map(data => (
            <Filter
              key={data.key}
              id={data.key}
              imageUrl={data.imageSrc}
              type="cat"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
