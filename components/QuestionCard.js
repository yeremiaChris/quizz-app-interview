import React, { useState } from "react";
import RadioButton from "./form/RadioButton";

function QuestionCard({ data }) {
  const [datas, setData] = useState({ data: data || [] });
  return (
    <ul className="list-decimal px-4">
      {datas.data.map((item, index) => {
        return (
          <li className="mb-3" key={index}>
            {item.question}
            {item.choices.map((item) => {
              return (
                <div className="list-[lower-alpha] mt-3" key={item}>
                  <RadioButton label={item} />
                </div>
              );
            })}
          </li>
        );
      })}
    </ul>
  );
}

export default QuestionCard;
