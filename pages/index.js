import Button from "../components/form/Button";
import QuestionCard from "../components/QuestionCard";
import { get } from "../helpers/api";

function index({ data }) {
  return (
    <div className="border py-4 px-4 flex-1">
      <h1 className="text-4xl font-medium mb-7">
        Quizz <span className="text-blue-600">APP</span>
      </h1>

      <QuestionCard data={data} />
      <div className="flex justify-end gap-3">
        <Button label="Previous" />
        <Button label="Next" bgClass="bg-green-500" />
      </div>
    </div>
  );
}

// fetching data here
export async function getServerSideProps(context) {
  const params = {
    amount: 8,
    category: 21,
    difficulty: "medium",
    type: "boolean",
  };

  // get data
  const data = await get(params);

  return {
    props: {
      data: data.map((item, index) => ({ ...item, id: index, answer: "" })),
    },
  };
}

export default index;
