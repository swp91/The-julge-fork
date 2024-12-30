import { Suspense } from "react";
import SearchPage from "./components/SearchPage";
import Loading from "@/app/_components/Loding";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchPage />
    </Suspense>
  );
}
