import { Suspense } from "react";
import EditAnnounce from "../_components/EditAnnounce";
import Loading from "@/app/_components/Loding";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <EditAnnounce />
    </Suspense>
  );
}
