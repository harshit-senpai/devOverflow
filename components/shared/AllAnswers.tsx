import { LargeNumberLike } from "crypto";
import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.actions";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: number;
}

const AllAnswers = async ({ questionId, userId, totalAnswers }: Props) => {
  const result = await getAnswers({ questionId });
  console.log(result);
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient font-semibold">
          {totalAnswers} Answers
        </h3>
        <Filter filters={AnswerFilters} />
      </div>

      {/* <div>
        {
            result.answers.map()
        }
      </div> */}
    </div>
  );
};

export default AllAnswers;
