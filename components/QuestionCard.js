import React, { useState } from "react";
import RadioButton from "./form/RadioButton";
import Button from "./form/Button";
function QuestionCard({ data }) {
  const [datas, setDatas] = useState(data);

  // active card
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // methods

  // set data radio button
  const handleChange = (e) => {
    const answer = e.target.value;
    const newDatas = datas.map((el) =>
      el.id === datas[activeQuestionIndex].id ? { ...el, answer } : el
    );
    setDatas(newDatas);
  };

  // next button
  const next = (e) => {
    e.preventDefault();
    setActiveQuestionIndex(activeQuestionIndex + 1);
  };

  // previous button
  const previous = (e) => {
    e.preventDefault();
    setActiveQuestionIndex(activeQuestionIndex - 1);
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(datas);
  };

  return (
    <>
      <div className="flex">
        <span>{activeQuestionIndex + 1}</span>
        <ul className="px-4">
          <li className="mb-3">
            <p className="mb-3">{datas[activeQuestionIndex].question}</p>
            {["Yes", "No"].map((item, index) => {
              return (
                <RadioButton
                  key={index}
                  label={item}
                  value={item === "Yes" ? "True" : "False"}
                  onChange={handleChange}
                  modelValue={datas[activeQuestionIndex].answer}
                />
              );
            })}
          </li>
        </ul>
      </div>
      <div className="flex justify-end gap-3 mb-2">
        <Button label="Previous" disabled={activeQuestionIndex === 0} onClick={previous} />
        <Button
          label="Next"
          bgClass="bg-green-500"
          disabled={activeQuestionIndex >= datas.length - 1}
          onClick={next}
        />
        <Button
          label="Submit"
          bgClass="bg-green-500"
          disabled={activeQuestionIndex < datas.length - 1}
          onClick={submit}
        />
      </div>
    </>
  );
}

export default QuestionCard;
