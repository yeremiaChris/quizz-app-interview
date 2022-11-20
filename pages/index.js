import { getCookie, hasCookie } from "cookies-next";
import QuestionForm from "../components/QuestionForm";
import { get } from "../helpers/api";
import { requiredAuthenticaton } from "../helpers/requiredAuthentication";

function index({ data, isRequest }) {
  return (
    <div className="border py-4 px-6 flex-1">
      <h1 className="text-4xl font-medium mb-7">
        Quizz <span className="text-blue-600">APP</span>
      </h1>

      <QuestionForm data={data} isRequest={isRequest} />
    </div>
  );
}

// fetching data here
export async function getServerSideProps(context) {
  return requiredAuthenticaton(context, async () => {
    let isRequest = true;
    const params = {
      amount: 8,
      category: 21,
      difficulty: "medium",
      type: "boolean",
    };

    // get data
    const data = await get(params);
    isRequest = false;
    const user = context.req.cookies["user"];
    return {
      props: {
        isRequest,
        user,
        data: !data
          ? []
          : data.map((item, index) => ({ ...item, id: index, answer: "", error: "" })),
      },
    };
  });
}

export default index;
