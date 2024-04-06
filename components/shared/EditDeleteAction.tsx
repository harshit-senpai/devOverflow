"use client";
import { deleteAnswers } from "@/lib/actions/answer.actions";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathName = usePathname();
  const router = useRouter();

  const handleDelete = async () => {
    if (type === "Question") {
      await deleteQuestion({
        questionId: JSON.parse(itemId),
        path: pathName,
      });
    } else if (type === "Answer") {
      await deleteAnswers({
        answerId: JSON.parse(itemId),
        path: pathName,
      });
    }
  };
  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full ">
      {type === "Question" && (
        <Link href={`/question/edit/${JSON.parse(itemId)}`}>
          <Image
            src="/assets/icons/edit.svg"
            alt="edit"
            width={14}
            height={14}
            className="cursor-pointer object-contain"
          />
        </Link>
      )}
      <Image
        src="/assets/icons/trash.svg"
        alt="edit"
        width={14}
        height={14}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
