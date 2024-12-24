import PostCard from './_components/PostCard/PostCard';

export default function Home() {
  return (
    <div>
      <PostCard
        address1='어흥시 냐옹구'
        name='가게이름가게이름가게이름'
        startsAt='2023-01-04 15:00~18:00'
        workhour='3'
        isPast={true}
        originalHourlyPay={5000}
        percent={50}
        imageUrl='https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fCVFQSVCMyVBMCVFQyU5NiU5MSVFQyU5RCVCNHxlbnwwfHwwfHx8MA%3D%3D'
      />
    </div>
  );
}
