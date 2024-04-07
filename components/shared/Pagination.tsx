"use client";
import { Button } from "../ui/button";

const Props = {
  pageNumber: 1,
  isNext: false,
};

const Pagination = () => {
  const handleNavigation = (direction: string) => {};
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Button
        onClick={() => handleNavigation("prev")}
        disabled={false}
        className="light-border-2 btn flex-min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="body-medium text-dark200_light800">Prev</p>
      </Button>
      <div className="bg-primary-500 flex items-center justify-center rounded-md px-3.5 py-2">
        <p className="body-semibold text-light-900">{Props.pageNumber}</p>
      </div>
      <Button
        onClick={() => handleNavigation("next")}
        disabled={false}
        className="light-border-2 btn flex-min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="body-medium text-dark200_light800">Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
