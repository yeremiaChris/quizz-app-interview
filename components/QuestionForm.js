import React, { useState, useEffect } from "react";
import RadioButton from "./form/RadioButton";
import Button from "./form/Button";
function QuestionForm({ data }) {
  // state
  const [datas, setDatas] = useState(data);
  const [isResult, setIsResult] = useState(false);
  const [score, setScore] = useState(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const question = datas[activeQuestionIndex];
  // last state

  // methods
  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem("datas");
    if (dataFromLocalStorage) {
      setIsResult(true);
      const activeQuestionIndexFromLocalStorage = localStorage.getItem("activeQuestionIndex");
      setDatas(JSON.parse(dataFromLocalStorage));
      setActiveQuestionIndex(parseInt(activeQuestionIndexFromLocalStorage));
    }
  }, []);

  // set data radio button to choice the answer
  const handleChange = (e) => {
    const answer = e.target.value;
    const newDatas = datas.map((el) => (el.id === question.id ? { ...el, answer, error: "" } : el));
    setDatas(newDatas);
  };

  // set local storage to save data when the page is load
  const setLocalStorage = () => {
    localStorage.setItem("datas", JSON.stringify(datas));
    localStorage.setItem("activeQuestionIndex", activeQuestionIndex);
  };
  const resetLocalStorage = () => {
    localStorage.removeItem("datas", JSON.stringify(datas));
    localStorage.removeItem("activeQuestionIndex", activeQuestionIndex);
  };

  // restart form
  const reStart = () => {
    setIsResult(false);
    // reset data
    const newData = datas.map((item) => ({ ...item, answer: "" }));
    setDatas(newData);

    // reset active question form
    setActiveQuestionIndex(0);
    resetLocalStorage();
  };

  // next button
  const next = (e) => {
    e.preventDefault();
    if (!question.answer) {
      const newData = datas.map((item) =>
        item.id === question.id ? { ...item, error: "This field is required" } : item
      );
      setDatas(newData);
    } else {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    }
    setLocalStorage();
  };

  // previous button
  const previous = (e) => {
    e.preventDefault();
    setActiveQuestionIndex(activeQuestionIndex - 1);
  };

  // submit form
  const submit = (e) => {
    e.preventDefault();
    if (!question.answer) {
      const newData = datas.map((item) =>
        item.id === question.id ? { ...item, error: "This field is required" } : item
      );
      setDatas(newData);
    } else {
      const score = datas.filter((item) => item.correct_answer === item.answer);
      setScore(score.length);
      setIsResult(true);
      resetLocalStorage();
    }
  };

  // last method

  return (
    <>
      {!isResult ? (
        <form onSubmit={submit}>
          <div className="flex">
            <span>{activeQuestionIndex + 1}</span>
            <ul className="px-4">
              <li className="mb-3">
                <p className={`${!question.error && "mb-3"}`}>{question.question}</p>
                {question.error && <span className="text-sm text-red-400 ">{question.error}</span>}
                {["Yes", "No"].map((item, index) => {
                  return (
                    <div key={index + index} className="flex items-center gap-4">
                      <RadioButton
                        label={item}
                        value={item === "Yes" ? "True" : "False"}
                        onChange={handleChange}
                        modelValue={question.answer}
                      />
                    </div>
                  );
                })}
              </li>
            </ul>
          </div>

          {/* handle action button */}
          <div className="flex justify-end gap-3 mb-2">
            <Button label="Previous" disabled={activeQuestionIndex === 0} onClick={previous} />
            {activeQuestionIndex < datas.length - 1 && (
              <Button
                label="Next"
                bgClass="bg-green-500"
                disabled={activeQuestionIndex >= datas.length - 1}
                onClick={next}
              />
            )}

            {/* submit button */}
            {activeQuestionIndex === datas.length - 1 && (
              <Button label="Submit" type="submit" bgClass="bg-green-500" />
            )}
          </div>
        </form>
      ) : (
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="grid items-center text-center gap-3">
            {score > datas.length / 2 && (
              <h2 className="text-3xl  font-bold text-green-500">Congratulations !!</h2>
            )}

            {datas.some((el) => el.answer) && (
              <h2
                className={`font-bold text-3xl mb-2 ${
                  score <= datas.length / 2 ? "text-red-400" : "text-green-500"
                }`}
              >
                Your Score {score} out of {datas.length}
              </h2>
            )}

            {score <= datas.length / 2 &&
              score !== datas.length &&
              datas.some((el) => el.answer) && (
                <Button label="Resume" bgClass="bg-yellow-500" onClick={() => setIsResult(false)} />
              )}

            <Button
              label={datas.every((el) => !el.answer) ? "Start Quizz" : "Restart"}
              bgClass="bg-green-500"
              onClick={reStart}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default QuestionForm;
