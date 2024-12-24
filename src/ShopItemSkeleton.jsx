import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ShopItemSkeleton() {
  return (
    <div>
      <div className="h-[15rem]">
        <Skeleton height="100%" />
      </div>
      <div className="p-2">
        <Skeleton height={20} className="mx-auto" />
        <Skeleton height={20} width={80} className="mx-auto mt-2" />
      </div>
    </div>
  );
}

export default ShopItemSkeleton;
