import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getAllQuestions } from "../../data/questions";
import Layout from "../../../core/layouts/Layout";
import Form from "../../../core/components/Form";
import { StartQuizSchema } from "../../validations";
import LabeledTextField from "../../../core/components/LabeledTextField";
import LabeledCheckbox from "../../../core/components/LabeledCheckbox";
import { Routes, useMutation, useRouter } from "blitz";
import startQuizMutation from "../../mutations/start";
import { FORM_ERROR } from "final-form";

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            firstQuestion: getAllQuestions()[0]!.id,
        },
    };
};

function QuestionsStartForm({ firstQuestion }: { firstQuestion: string }) {
    const [startQuiz] = useMutation(startQuizMutation);
    const router = useRouter();

    return (
        <Form
            schema={StartQuizSchema}
            onSubmit={async (values) => {
                try {
                    await startQuiz(values);
                } catch (error) {
                    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                        return { email: "This email is already being used, do you mean to log in?" };
                    } else {
                        return { [FORM_ERROR]: error.toString() };
                    }
                }
                await router.push(Routes.QuestionPage({ question: firstQuestion }));
            }}
            submitText="Start Quiz"
        >
            <LabeledTextField name="email" label="Email" type="email" />
            <LabeledTextField name="firstName" label="First Name" />
            <LabeledTextField name="lastName" label="Last Name" />
            <LabeledCheckbox name="inUS" label="Are you in the US?" />
        </Form>
    );
}

function QuestionsStartPage({ firstQuestion }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div>
            <h2 className="text-lg">Start taking the quiz. Are you ready?</h2>
            <QuestionsStartForm firstQuestion={firstQuestion} />
        </div>
    );
}

QuestionsStartPage.getLayout = (page) => <Layout title="Begin Quiz">{page}</Layout>;
// QuestionsStartPage.redirectAuthenticatedTo = "/profile"; // todo: redirect to profile page

export default QuestionsStartPage;
