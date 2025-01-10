import Button from "../_components/Button";
import Badge from "../_components/Badge";

export interface OwnerData {
  applicationId: string;
  name: string;
  introduction: string;
  phone: string;
  status: string;
}

export interface ColumnOwnerData extends OwnerData {
  onStatusChange: (
    applicationId: string,
    newStatus: "accepted" | "rejected"
  ) => Promise<void>;
}

export interface WorkerData {
  shopName: string;
  date: string;
  hourlyPay: string;
  status: string;
}

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  hiddenOn?: "sm" | "md" | "lg";
}

export const tableConfig: {
  owner: Column<ColumnOwnerData>[];
  worker: Column<WorkerData>[];
} = {
  owner: [
    { header: "신청자", accessor: "name" },
    { header: "소개", accessor: "introduction", hiddenOn: "md" },
    { header: "전화번호", accessor: "phone", hiddenOn: "lg" },
    {
      header: "상태",
      accessor: "status",
      render: (value, row) =>
        value === "pending" ? (
          <div className="space-x-2">
            <Button
              style="bordered"
              size="xxs"
              onClick={() => row.onStatusChange(row.applicationId, "rejected")}
            >
              거절하기
            </Button>
            <Button
              style="bordered"
              size="xxs"
              onClick={() => row.onStatusChange(row.applicationId, "accepted")}
            >
              승인하기
            </Button>
          </div>
        ) : value === "rejected" ? (
          <Badge status="거절" />
        ) : (
          <Badge status="승인" />
        ),
    },
  ],
  worker: [
    { header: "가게", accessor: "shopName" },
    {
      header: "일자",
      accessor: "date",
      render: (value) => {
        const startDate = new Date(value);
        const formattedDate = `${startDate.getFullYear()}-${String(
          startDate.getMonth() + 1
        ).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;
        const formattedTime = `${String(startDate.getHours()).padStart(
          2,
          "0"
        )}:${String(startDate.getMinutes()).padStart(2, "0")}`;

        return `${formattedDate} ${formattedTime}`;
      },
    },
    { header: "시급", accessor: "hourlyPay", hiddenOn: "lg" },
    {
      header: "상태",
      accessor: "status",
      render: (value) =>
        value === "pending" ? (
          <Badge status="대기" />
        ) : value === "rejected" ? (
          <Badge status="거절" />
        ) : (
          <Badge status="승인" />
        ),
    },
  ],
};
