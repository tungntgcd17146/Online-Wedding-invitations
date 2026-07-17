import { HomeContent } from '../page';
import { Suspense } from 'react';

export default function NhaNuPage() {
  return (
    <Suspense fallback={null}>
      <HomeContent forceSide="nhanu" />
    </Suspense>
  );
}
