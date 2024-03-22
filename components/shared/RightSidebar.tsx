import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Tag from './Tag'

const hotQuestion = [
    {
        _id: 1, 
        title: 'How do I use express as a custom server in Next.js'
    },
    {
        _id: 2, 
        title: 'Async/Await Function Not Handling Errors Properly'
    },
    {
        _id: 3, 
        title: 'Next JS router'
    },
    {
        _id: 4, 
        title: 'How can I get (query string) parameters from the URL in Next.js?'
    },
    {
        _id: 5, 
        title: 'What is the best modern tech stack we can use to create a Stackoverflow clone?'
    }
]

const popularTags = [
    {
        _id: 1,
        name: 'React',
        totalQuestions: 1
    },
    {
        _id: 2,
        name: 'Javascript',
        totalQuestions: 2
    },
    {
        _id: 3,
        name: 'Next.js',
        totalQuestions: 4
    },
    {
        _id: 4,
        name: 'Tailwindcss',
        totalQuestions: 9
    },
    {
        _id: 5,
        name: 'Prisma',
        totalQuestions: 10
    },
]

const RightSidebar = () => {
    return (
        <section className='background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[350px]'>
            <div>
                <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
                <div className='mt-7 flex w-full flex-col gap-[30px]'>
                    {
                        hotQuestion.map((question) => (
                            <Link
                            href='/question'
                            key={question._id}
                            className='flex cursor-pointer items-center justify-between gap-7'
                            >
                                <p className='body-medium text-dark500_light700'>{question.title}</p>
                                <Image
                                src='/assets/icons/chevron-right.svg'
                                alt='chevron-right'
                                className='invert-colors'
                                height={20}
                                width={20}
                                />
                            </Link>
                        ))
                    }
                </div>
            </div>
            <div className='mt-16'>
            <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>
            <div className='mt-7 flex flex-col gap-4'>
                    {
                        popularTags.map((tag) => (
                            <Tag
                            _id={tag._id}
                            key={tag._id}
                            name={tag.name}
                            totalQuestions={tag.totalQuestions}
                            showCount={true}
                            />
                        ))
                    }
            </div>
            </div>
        </section>
    )
}

export default RightSidebar;