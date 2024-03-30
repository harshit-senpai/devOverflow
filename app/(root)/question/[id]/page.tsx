import { getQuestionById } from "@/lib/actions/question.action";

const Page = async ({ params, searchParams }) => {
  const result = await getQuestionById({ questionId: params.id });
  return <div>Page</div>;
};

export default Page;
