'use client';

import { CatListObj } from '@/app/zip/catType';
import { catsAtom } from '@/atoms/catsAtom';
import ZipCard from '@/components/zip/ZipCard';
import { useCats } from '@/hooks/useCats';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import CatRegisterModal from '@/components/zip/CatRegisterModal';
const ZipPage = () => {
  const router = useRouter();

  const [cats, setCats] = useAtom(catsAtom);
  const [selectedModal, setSelectedModal] = useState({} as CatListObj);
  const [showWriteModal, setShowWriteModal] = useState(false);

  const { data: catList } = useCats({ page: 0, size: 10 });

  useEffect(() => {
    if (catList) {
      setCats(catList);
    }
  }, [catList]);

  const openDetailModal = (item: CatListObj) => {
    setSelectedModal(item);
    router.push(`/zip/${item.id}`);
  };

  return (
    <>
      <h1 className="flex h-12 w-full items-center bg-gr-white px-4 text-heading-3 text-gr-900">
        모음집
      </h1>
      <section className="h-screen bg-gr-50 p-4">
        <div className="grid grid-cols-2 gap-4 ">
          {cats.map(cat => (
            <ZipCard
              key={cat.id}
              {...cat}
              onClick={() => openDetailModal(cat)}
            />
          ))}
        </div>
        <FloatingActionButton onClick={() => setShowWriteModal(true)} />
        {showWriteModal && (
          <CatRegisterModal
            onClose={() => setShowWriteModal(false)}
            id={selectedModal?.id ?? 0}
          />
        )}
      </section>
    </>
  );
};

export default ZipPage;
