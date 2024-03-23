import Filter from "@/components/shared/Filter";
import HomeFilter from "@/components/shared/Home/HomeFilter";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/shared/card/QuestionCard";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const questions = [
  {
    _id: '1',
    title: 'How to center a div',
    tags: [
      {
        _id: '1',
        name: 'HTML'
      },
      {
        _id: '2',
        name: 'CSS'
      }
    ],
    author: {
      _id: '1',
      name: 'Ken Senpai',
      picture: 'ken.jpg'
    },
    upvotes: 100,
    answers: [], 
    createdAt: new Date('2021-09-20T00:00:00.000Z'),
    views: 100
  },
  {
    _id: '2',
    title: 'How to learn Next.js',
    tags: [
      {
        _id: '3', // Changed tag ID
        name: 'javascript'
      },
      {
        _id: '4', // Changed tag ID
        name: 'Next.js'
      }
    ],
    author: {
      _id: '2', // Changed author ID
      name: 'Alice',
      picture: 'alice.jpg'
    },
    upvotes: 15, 
    answers: [], 
    createdAt: new Date('2021-09-21T00:00:00.000Z'),
    views: 120 
  },
  {
    _id: '3', 
    title: 'How to use TypeScript with React',
    tags: [
      {
        _id: '5', 
        name: 'typescript'
      },
      {
        _id: '3', 
        name: 'javascript'
      }
    ],
    author: {
      _id: '3', 
      name: 'Bob',
      picture: 'bob.jpg'
    },
    upvotes: 20, 
    answers: [],
    createdAt: new Date('2021-09-22T00:00:00.000Z'), 
    views: 80 
  }
]

const numQuestions = questions.length

export default function Home() {
  return (
    <>
       <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href='/ask-question' className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient px-4 py-3 min-h-[46px] !text-light-900">Ask a Question</Button>
        </Link>
       </div>
       <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearchbar
          route='/'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for questions'
          otherClasses='flex-1'
          />

          <Filter
          filters={HomePageFilters}
          otherClasses='min-h-[56px] sm:min-w-[170px]'
          containerClasses='hidden max-lg:flex'
          />
        </div>
        <HomeFilter/>
        <div className="mt-10 flex w-full flex-col gap-6">
          {
            numQuestions > 0 ?
            questions.map((question) => (
              <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
              />
            ))
            : <NoResult 
              title="There's no question to show"
              description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
              link='/ask-question'
              linkTitle="Ask a Question"
            />
          }
        </div>  
    </>
  )
}