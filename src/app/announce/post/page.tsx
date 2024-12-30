import { Suspense } from "react";
import PostAnnounce from "../_components/PostAnnounce";
import Loading from "@/app/_components/Loding";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <PostAnnounce />
    </Suspense>
  );
}
