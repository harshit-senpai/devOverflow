"use server";

import Tag, { ITag } from "@/database/tag.model";

import { connectToDatabase } from "@/lib/createDatabase";

import type {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
} from "./shared.types";
import console from "console";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";
import User from "@/database/user.model";

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 10 } = params;
    const query: FilterQuery<typeof Tag> = {};

    const skipAmount = (page - 1) * pageSize;

    let searchOptions = {};

    switch (filter) {
      case "popular":
        searchOptions = { questions: -1 };
        break;
      case "recent":
        searchOptions = { createdAt: -1 };
        break;
      case "name":
        searchOptions = { name: 1 };
        break;
      case "old":
        searchOptions = { createdAt: 1 };
        break;
      default:
        break;
    }

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    const totalTags = await Tag.countDocuments(query);

    const tags = await Tag.find(query)
      .sort(searchOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const isNext = totalTags > skipAmount + tags.length;

    return { tags, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const questions = tag.questions;

    return { tagTitle: tag.name, questions };
  } catch (error) {
    console.log(error);
  }
}

export async function getTopPopularTags() {
  try {
    connectToDatabase();

    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);

    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
