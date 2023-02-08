import React, { useEffect, useState } from "react";
import OtpInput from "react18-input-otp";
import "./page-styles/start.css";
import WordToDisplay from "../components/WordToDisplay";
const Start = () => {
  const [error, setError] = useState(false);
  const [gessWord, setGessWord] = useState("");
  const [trueWord, setTrueWord] = useState("");
  const [wordToDisplay, setWordToDisplay] = useState("");
  const [wordLength, setWordLength] = useState(0);
  const [message, setmessage] = useState("");

  useEffect(() => {
    randomWord();
  }, []);

  const randomWord = () => {
    var word = "BONJOUR";
    setTrueWord(word);
    setWordLength(word.length);
    word = word.toUpperCase();
    console.log("word", word);
    const wordArray = word.split("");
    const shuffledArray = wordArray.sort(() => Math.random() - 0.5);
    console.log(shuffledArray);
    setWordToDisplay(shuffledArray);
  };

  const takeLetter = (value) => {
    setError(false);
    const oldgessWord = gessWord;
    const newgessWord = oldgessWord + value;
    setGessWord(newgessWord);
    if (newgessWord.length === wordLength) {
        if (newgessWord === trueWord) {
            setmessage("Bravo! Vous avez gagne...");
        } else {
          setError(true);
        setmessage("Désolé! Vous avez perdu");
      }
    }
  };

  return (
    <div className="start-container container">
      <OtpInput
        className="col-sm-2 col-md-2 col-lg-2 otpInput"
        value={gessWord}
        numInputs={wordLength}
        isInputNum={true}
        hasErrored={error}
        errorStyle={{ border: "1px solid red" }}
        inputStyle="form-control mx-2 text-primary w-100 fs-6"
      />

      <div className="d-flex justify-content-around mt-5">
        {!message &&
          wordToDisplay &&
          wordToDisplay.map((letter, index) => (
            <div key={index} onClick={() => takeLetter(letter)}>
              <WordToDisplay letter={letter} />
            </div>
          ))}
        {message && <span>{message}</span>}
      </div>
    </div>
  );
};

export default Start;
