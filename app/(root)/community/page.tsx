import UserCard from "@/components/card/UserCard";
import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";

import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";
import Loading from "./loading";

const Page = async (searchParams: SearchParamsProps) => {
  const result = await getAllUsers({
    searchQuery: searchParams.searchParams.q,
    filter: searchParams.searchParams.filter,
    page: searchParams.searchParams.page ? +searchParams.searchParams.page : 1,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for great minds...."
          otherClasses="flex-1"
        />

        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p> No Users </p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first
            </Link>
          </div>
        )}
      </section>
      <div className="mt-10">
        <Pagination
          pageNumber={
            searchParams?.searchParams.page
              ? +searchParams?.searchParams.page
              : 1
          }
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default Page;
