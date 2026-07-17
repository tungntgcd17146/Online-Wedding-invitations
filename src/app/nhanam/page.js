import { HomeContent } from '../page';
import { Suspense } from 'react';

export default function NhaNamPage() {
  return (
    <Suspense fallback={null}>
      <HomeContent forceSide="nhanam" />
    </Suspense>
  );
}
