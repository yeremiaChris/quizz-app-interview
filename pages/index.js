import axios from "axios";
import QuestionCard from "../components/QuestionCard";
import { BASE_URL } from "../helpers/constant";

function index({ data }) {
  return (
    <div className="border py-4 px-4 flex-1">
      <QuestionCard data={data} />
    </div>
  );
}

// fetching data here
export async function getServerSideProps(context) {
  const res = await axios.get(`${BASE_URL}/questions?limit=1`);
  console.log(res);
  return {
    props: {
      data: res.data.map((item) => {
        return {
          ...item,
          choices: [...item.incorrectAnswers, item.correctAnswer],
        };
      }),
    }, // will be passed to the page component as props
  };
}

export default index;
