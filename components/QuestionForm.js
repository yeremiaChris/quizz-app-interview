import React, { useState, useEffect } from "react";
import RadioButton from "./form/RadioButton";
import Button from "./form/Button";
function QuestionForm({ data }) {
  // state
  // state to display start button before begin the quizz
  const [isStart, setStart] = useState(true);

  // data from api
  const [datas, setDatas] = useState(data);

  // detect submit button is clicked and set the result
  const [isResult, setIsResult] = useState(false);

  // set the score
  const [score, setScore] = useState(0);

  // state for set the active form to display
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // obj current data
  const question = datas[activeQuestionIndex];
  // last state

  // create score
  const handlingScore = (data) => {
    const score = data.filter((item) => item.correct_answer === item.answer);
    setScore(score.length);
  };

  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem("datas");
    setStart(true);
    // resume quizz when only before we submit the form, if the form is submit then we refresh the form will be reset
    if (dataFromLocalStorage) {
      const activeQuestionIndexFromLocalStorage = localStorage.getItem("activeQuestionIndex");
      setDatas(JSON.parse(dataFromLocalStorage));
      handlingScore(JSON.parse(dataFromLocalStorage));
      setActiveQuestionIndex(parseInt(activeQuestionIndexFromLocalStorage) + 1);
    }
  }, []);

  // methods
  // required error handling
  const errorHandling = () => {
    const newData = datas.map((item) =>
      item.id === question.id ? { ...item, error: "This field is required" } : item
    );
    setDatas(newData);
  };

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

  // reset local storage
  const resetLocalStorage = () => {
    localStorage.removeItem("datas", JSON.stringify(datas));
    localStorage.removeItem("activeQuestionIndex", activeQuestionIndex);
  };

  // restart form
  const reStart = () => {
    // set result to false to hide message of the result
    setIsResult(false);

    // reset active question form
    setActiveQuestionIndex(0);

    // reset localstorage when user is start the quizz
    resetLocalStorage();

    // reset data when user is start
    const newData = datas.map((item) => ({ ...item, answer: "" }));
    setDatas(newData);

    // set start to show the form
    setStart(false);
  };

  // next button
  const next = (e) => {
    e.preventDefault();

    // error handling when radio button is not checked
    if (!question.answer) {
      errorHandling();
    } else {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    }

    // set local storage when next button is clicked
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

    // error handling before submitted
    if (!question.answer) {
      errorHandling();
    } else {
      handlingScore(datas);
      setIsResult(true);
      if (score <= datas.length / 2) {
        resetLocalStorage();
      }
    }
  };

  // last method

  return (
    <>
      {!isResult && !isStart ? (
        <form onSubmit={submit}>
          <div className="flex">
            <span>{activeQuestionIndex + 1}</span>
            <ul className="px-4">
              <li className="mb-3">
                <p className={`${!question.error && "mb-3"}`}>{question && question.question}</p>
                {question.error && (
                  <span className="text-sm text-red-400 ">{question && question.error}</span>
                )}
                {["Yes", "No"].map((item, index) => {
                  return (
                    <div key={index + index} className="flex items-center gap-4">
                      <RadioButton
                        label={item}
                        value={item === "Yes" ? "True" : "False"}
                        onChange={handleChange}
                        modelValue={question && question.answer}
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

            {score <= datas.length / 2 && score !== datas.length && datas.some((el) => el.answer) && (
              <Button
                label="Resume"
                bgClass="bg-yellow-500"
                onClick={() => {
                  setStart(false);
                  setIsResult(false);
                }}
              />
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
