"use client";
import Image from "next/image";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const handleEdit = () => {};
  const handleDelete = () => {
    if (type === "Question") {
    } else if (type === "Answer") {
    }
  };
  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full ">
      {type === "Question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="edit"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
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
