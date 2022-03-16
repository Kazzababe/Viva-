import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import Layout from "../../../core/layouts/Layout";
import { Routes } from "blitz";
import { getQuestionById } from "../../data/questions";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const questionId = context.params?.question;

    if (typeof questionId !== "string" || !getQuestionById(questionId)) {
        return {
            redirect: {
                destination: Routes.Page404(),
                permanent: false,
            },
        };
    }
    return {
        props: {
            question: getQuestionById(questionId)!,
        },
    };
};

function QuestionPage({ question }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div>
            <h2 className="text-lg">{question.question}</h2>
        </div>
    );
}

QuestionPage.getLayout = (page) => <Layout title="Home">{page}</Layout>;

export default QuestionPage;
