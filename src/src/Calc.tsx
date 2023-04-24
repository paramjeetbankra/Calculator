import "./Calc.css";
import Screen from "./Component/Screen";
import Button from "./Component/Button";
import ButtonWrapper from "./Component/ButtonWrapper";
import { useState } from "react";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="]
];

export default function Calculator() {
  let [calc, setCalc] = useState({
    sign: "",
    num: "0",
    res: "0"
  });

  let resetClickHandler = () => {
    setCalc({
      sign: "",
      num: "0",
      res: "0"
    });
  };
  let invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: ""
    });
  };
  let percentClickHandler = () => {
    let num: Number = calc.num ? parseFloat(calc.num) : 0;
    let res: Number = calc.res ? parseFloat(calc.res) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)).toString(),
      res: (res /= Math.pow(100, 1)).toString(),
      sign: ""
    });
  };
  let equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : math(Number(calc.res), Number(calc.num), calc.sign),
        sign: "",
        num: "0"
      });
    }
  };
  let signClickHandler = (value: any) => {
    setCalc({
      ...calc,
      sign: value,
      res: !Number(calc.res) && calc.num ? calc.num : calc.res,
      num: "0"
    });
  };

  let commaClickHandler = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + "." : calc.num
    });
  };
  let numClickHandler = (val: String) => {
    if (calc.num.length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === "0" && val === "0"
            ? "0"
            : Number(calc.num) % 1 === 0
            ? Number(calc.num + val).toString()
            : calc.num + val,
        res: !calc.sign ? "0" : calc.res
      });
    }
  };

  let handleClick = (e: Event) => {
    e.preventDefault();
    const val = e.target?.innerHTML;
    switch (val) {
      case "C":
        resetClickHandler();
        break;
      case "+-":
        invertClickHandler();
        break;
      case "%":
        percentClickHandler();
        break;
      case "=":
        equalsClickHandler();
        break;
      case "/":
      case "X":
      case "-":
      case "+":
        signClickHandler(val);
        break;
      case ".":
        commaClickHandler();
        break;
      default:
        numClickHandler(val);
    }
  };

  return (
    <div className="wrapper">
      <Screen value={Number(calc.num) ? calc.num : calc.res} />
      <ButtonWrapper>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              text={btn}
              onClick={handleClick}
            />
          );
        })}
      </ButtonWrapper>
    </div>
  );
}
