import Question from "@/components/form/Question";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

const Page = async () => {
  // const { userId } = auth();
  const userId = "1234567";
  if (!userId) {
    redirect("/sign-in");
  }
  const user = await getUserById({ userId });
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
      <div className="mt-9">
        <Question user={JSON.stringify(user._id)} />
      </div>
    </div>
  );
};

export default Page;
