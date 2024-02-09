import reactLogo from "../../assets/react.svg";
import style from "./Index.module.scss";
import Button from "../../components/button/Button";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import parse from "html-react-parser";

const Index = () => {
  const [texts, setTexts] = useState<string[]>([]);
  const [text, setText] = useState<string>("");

  const isOnce = useRef(false);
  useEffect(
    () => {
      if (isOnce.current) return;
      navigator.serviceWorker.addEventListener("message", (event) => {
        const character: string = event.data.msg;
        // console.log("character", character);
        // if (character === "[DONE]") {
        //   const array: string[] = [...texts];
        //   array.push(parse(text));
        //   setText("");
        //   setTexts(array);
        //   return;
        // } else if (character.startsWith("[IMAGE]")) {
        //   const imageLink = character.replace("[IMAGE]", "");
        //   const imgTag = `<br/><img src="${imageLink}" width="500px" /><br/>`;
        //   setText(text + imgTag);
        // } else {
        //   setText(text + character);
        // }
      });
      isOnce.current = true;
    },
    [
      // text, texts
    ]
  );

  const element = parse(text);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className={clsx(style["logo"], style["react"])}
            alt="React logo"
          />
        </a>
      </div>

      {texts.map((text, i) => (
        <p className={style["message-card"]} key={i}>
          {text}
        </p>
      ))}
      {text && <p className={style["message-card"]}>{element}</p>}
      <div className={style["card"]}>
        <Button text={`こんにちは`} onClick={() => ws.send("こんにちは")} />　
        <Button
          text={`千代田区の情報が知りたい`}
          // onClick={() => ws.send("千代田区")}
        />
      </div>
    </>
  );
};

export default Index;
