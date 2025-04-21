'use client';

import dynamic from 'next/dynamic';

const SearchPageContent = dynamic(() => import('./SearchPageContent'), {
  ssr: false,
});

export default function SearchPageWrapper() {
  return <SearchPageContent />;
}
