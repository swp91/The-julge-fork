'use client';

import Pagination from './_components/Pagination';

export default function Home() {
  return (
    <div>
      <Pagination
        totalPages={50}
        onPageChange={(page) => {
          console.log(page);
        }}
      />
    </div>
  );
}
