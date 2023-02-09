import React, { useEffect, useState } from "react";
import OtpInput from "react18-input-otp";
import "./page-styles/start.css";
import WordToDisplay from "../components/WordToDisplay";
import { generateSlug } from "random-word-slugs-fr";
import AppModal from "../components/AppModal";
import { apiService } from "../services/api.service";


const Start = () => {
  const [error, setError] = useState(false);
  const [gessWord, setGessWord] = useState("");
  const [trueWord, setTrueWord] = useState("");
  const [wordToDisplay, setWordToDisplay] = useState("");
  const [wordLength, setWordLength] = useState(0);
  const [message, setmessage] = useState("");
  const [partStatus, setpartStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mark, setMark] = useState(6);

  useEffect(() => {
    randomWord();
    setShowModal(true);
  }, []);

  const randomWord = () => {
    const slug = generateSlug(1, { format: "title" });
    let word = slug;
    word = word.toUpperCase();
    console.log(word);
    setGessWord("");
    setmessage("");
    setError(false);
    setTrueWord(word);
    setWordLength(word.length);
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
        setpartStatus(true);
        setError(true);
      } else {
        setMark(mark - 2);
        setpartStatus(false);
        setError(true);
        setmessage("Désolé! Vous avez perdu");
      }
    }
  };

  const runAgain = () => {
    randomWord();
  };

  const ModalCallback = (addPayload) => {
    apiService
      .add(addPayload)
      .then((res) => {
        console.log(res?.data);
        setShowModal(false);
      })
      .catch((err) => {
        console.log("api add error", err);
      });
  };

  
  return (
    <div className="start-container container">
      <div>
        <button type="button" class="btn btn-primary mb-5">
          Point <span class="badge badge-light"> {mark} </span>
        </button>
      </div>
      <OtpInput
        className="col otpInput"
        value={gessWord}
        numInputs={wordLength}
        isInputNum={true}
        hasErrored={error}
        errorStyle={
          partStatus
            ? { border: "1px solid green" }
            : { border: "1px solid red" }
        }
        inputStyle="form-control mx-2"
      />

      <div className="d-flex justify-content-center mt-5">
        {!message &&
          wordToDisplay &&
          wordToDisplay.map((letter, index) => (
            <div key={index} onClick={() => takeLetter(letter)}>
              <WordToDisplay letter={letter} />
            </div>
          ))}
        {message && (
          <>
            <div>
              <div>{message}</div>
              <button className="btn btn-primary mt-3" onClick={runAgain}>
                Reprendre
              </button>
            </div>
          </>
        )}
      </div>
      <AppModal
        setShow={setShowModal}
        show={showModal}
        callback={ModalCallback}
        header={"Information du joueur"}
      />
    </div>
  );
};

export default Start;
