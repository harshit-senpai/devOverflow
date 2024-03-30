import Answer from "@/components/form/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import Tag from "@/components/shared/Tag";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { URLProps } from "@/types";
import { formatNumber, getTimeStamp } from "@/utils/util";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params }: URLProps) => {
  const result = await getQuestionById({ questionId: params.id });
  const { userId: clerkId } = auth();

  let user;

  if (clerkId) {
    user = await getUserById({ userId: clerkId });
  }
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile.${result.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.author.picture}
              className="rounded-full"
              width={22}
              height={22}
              alt={result.author.name}
            />
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>
          <div>Voting</div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="asked"
          value={`asked ${getTimeStamp(result.createdAt)}`}
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="answers"
          title="Answers"
          value={formatNumber(result.answers.length)}
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="views"
          title="views"
          value={0}
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML data={result.content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {result.tags.map((tag: any) => (
          <Tag key={tag._id} _id={tag._id} name={tag.name} showCount={false} />
        ))}
      </div>

      <AllAnswers
        questionId={JSON.stringify(result._id)}
        userId={JSON.stringify(user._id)}
        totalAnswers={result.answers.length}
      />

      <Answer
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(user._id)}
      />
    </>
  );
};

export default Page;
