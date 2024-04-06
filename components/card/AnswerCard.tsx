import Link from "next/link";

import Metric from "../shared/Metric";
import { formatNumber, getTimeStamp } from "@/utils/util";
import { getQuestionById } from "@/lib/actions/question.action";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface Props {
  clerkId?: string | null;
  _id: string;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upvotes: string[];
  createdAt: Date;
}

const AnswerCard = async ({
  clerkId,
  _id,
  question,
  author,
  upvotes,
  createdAt,
}: Props) => {
  const showActionsButtons = clerkId && clerkId === author?.clerkId;
  const result = await getQuestionById({ questionId: question._id });
  return (
    <div className="card-wrapper mt-2 rounded-[10px] px-9 py-11">
      <Link href={`/question/${question?._id}/#${_id}`}>
        <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
          <div>
            <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
              {getTimeStamp(createdAt)}
            </span>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {result.title}
            </h3>
          </div>
          <SignedIn>
            {showActionsButtons && (
              <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
            )}
          </SignedIn>
        </div>

        <div className="flex-between mt-6 w-full flex-wrap gap-3">
          <Metric
            imgUrl={author.picture}
            alt="user avatar"
            value={author.name}
            title={` • asked ${getTimeStamp(createdAt)}`}
            href={`/profile/${author.clerkId}`}
            textStyles="body-medium text-dark400_light700"
            isAuthor
          />

          <div className="flex-center gap-3">
            <Metric
              imgUrl="/assets/icons/like.svg"
              alt="like icon"
              value={formatNumber(upvotes.length)}
              title=" Votes"
              textStyles="small-medium text-dark400_light800"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AnswerCard;
