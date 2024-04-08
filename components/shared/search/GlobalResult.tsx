"use client";

import { useEffect, useState } from "react";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";

const GlobalResult = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);

  const global = searchParams.get("global");
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setIsLoading(true);

      try {
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
  }, [global, type]);

  return (
    <div className="absolute top-full z-10 mt-3 w-full bg-light-800 py-5 shadow-sm dark:bg-dark-400 rounded-xl ">
      <p className="text-dark400_light900 paragraph-semibold px-5">Filters</p>
      <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50" />

      <div className="space-y-5">
        <p className="text-dark400_light900 paragraph-semibold px-5">
          Top Match
        </p>
        {isLoading ? (
          <div className="flex-center flex-col px-5">
            <ReloadIcon className="my-2 h-10 w-10 text-primary-500 animate-spin" />
            <p className="text-dark200_light800 body-regular">
              Browsing the entire database
            </p>
          </div>
        ) : (
          <div>Content</div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
