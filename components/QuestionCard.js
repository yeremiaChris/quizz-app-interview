import React, { useState } from "react";
import RadioButton from "./form/RadioButton";

function QuestionCard({ data }) {
  const [datas, setDatas] = useState(data);

  // active card
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // methods
  const handleChange = (e) => {
    const answer = e.target.value;
    const newDatas = datas.map((el) =>
      el.id === datas[activeQuestionIndex].id ? { ...el, answer } : el
    );
    setDatas(newDatas);
  };

  return (
    <ul className="list-decimal px-4">
      <li className="mb-3">
        <p className="mb-3">{datas[activeQuestionIndex].question}</p>
        <RadioButton
          label="Yes"
          value="True"
          onChange={handleChange}
          modelValue={datas[activeQuestionIndex].answer}
        />
        <RadioButton
          label="No"
          value="False"
          onChange={handleChange}
          modelValue={datas[activeQuestionIndex].answer}
        />
      </li>
    </ul>
  );
}

export default QuestionCard;
