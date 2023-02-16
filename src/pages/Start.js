import React, { useEffect, useRef, useState } from "react";
import OtpInput from "react18-input-otp";
import "./page-styles/start.css";
import WordToDisplay from "../components/WordToDisplay";
import { generateSlug } from "random-word-slugs-fr";
import AppModal from "../components/AppModal";
import { apiService } from "../services/api.service";
import backspaceIcon from "../assets/img/backspace.png";

const Start = () => {
  const [error, setError] = useState(false);
  const [gessWord, setGessWord] = useState("");
  const [trueWord, setTrueWord] = useState("");
  const [wordToDisplay, setWordToDisplay] = useState("");
  const [previosWordToDisplay, setPreviosWordToDisplay] = useState("");
  const [wordLength, setWordLength] = useState(0);
  const [message, setmessage] = useState({ value: "", style: "" });
  const [partStatus, setpartStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mark, setMark] = useState(10);
  const [tryNumber, setTryNumber] = useState(1);
  const [user, setUser] = useState(null);
  const [userCreateMessage, setUserCreateMessage] = useState("");
  const [wordRoDisplayHistory, setWordRoDisplayHistory] = useState([]);
  const flag = useRef(false);

  useEffect(() => {
    if (flag.current === false) {
      randomWord();
      setShowModal(true);
    }
    return () => (flag.current = true);
  }, []);

  const randomWord = () => {
    const slug = generateSlug(1, { format: "title" });
    let word = slug;
    word = word.toUpperCase();
    console.log(word);
    setGessWord("");
    setmessage({ value: "", style: "" });
    setError(false);
    setTrueWord(word);
    setWordLength(word.length);
    console.log("word", word);
    const wordArray = word.split("");
    const shuffledArray = wordArray.sort(() => Math.random() - 0.5);
    setWordToDisplay(shuffledArray);
    setPreviosWordToDisplay(shuffledArray.join(" ").replace(/\s/g, ""));
  };


  const takeLetter = (value, index, wtd) => {
    let _tryNumber;
    removeWordToDisplayLetter(index, wtd);
    setError(false);
    const oldgessWord = gessWord;
    const newgessWord = oldgessWord + value;
    setGessWord(newgessWord);
    if (newgessWord.length === wordLength) {
      console.log(tryNumber);
      _tryNumber = tryNumber + 1;
      setTryNumber(_tryNumber);
      const _mark = mark;
      if (newgessWord === trueWord) {
        setmessage({
          value: "Bravo! Vous avez gagne...",
          style: "text-success",
        });
        setpartStatus(true);
        setError(true);
        updateUserInfo(_mark);
      } else {
        if (_tryNumber < 6) setMark(mark - 2);
        setpartStatus(false);
        setError(true);
        setmessage({
          value: "Désolé! Vous avez perdu",
          style: "text-danger",
        });
      }
    }
  };

  const removeWordToDisplayLetter = (index, wtd) => {
    const w = wtd.join(" ").replace(/\s/g, "")
    const _wordToDisplay = wordToDisplay;
    setWordRoDisplayHistory((prev) => [
      ...prev,
      w,
    ]);
    _wordToDisplay.splice(index, 1);
    setWordToDisplay(_wordToDisplay);
  };

  const runAgain = () => {
    setUserCreateMessage('')
    randomWord();
    setWordRoDisplayHistory([]);
  };

  const runPreviosRandomWord = () => {
      setUserCreateMessage("");
      setWordToDisplay(previosWordToDisplay.split(""));
      setmessage({ value: "", style: "" });
      setGessWord("");
      setWordRoDisplayHistory([]);
    };

  const handledBackspace = () => {
    if (wordRoDisplayHistory.length !== 0) {
      const index = wordRoDisplayHistory.length - 1
      const wordString = wordRoDisplayHistory[index];
      const wObject = wordString.split("");
      setWordToDisplay(wObject);
      setGessWord(gessWord.slice(0, gessWord.length - 1));
      wordRoDisplayHistory.splice(index, 1);
    }
  };

  const updateUserInfo = (payload) => {
    apiService
      .update(user?.userId, payload)
      .then((res) => {
        const d = res?.data;
        setUser(d?.user);
        setShowModal(false);
        setMark(10);
      })
      .catch((err) => {
        console.log("api update error", err);
      });
  };

  const ModalCallback = (addPayload) => {
    apiService
      .add(addPayload)
      .then((res) => {
        const d = res?.data;
        if (d?.new === true) {
          setUserCreateMessage("Nouveau utilisateur Creé avec succès");
        } else {
          setUserCreateMessage("Utilisateur existant");
        }
        console.log(res?.data);
        setUser(res?.data?.user);
        setShowModal(false);
      })
      .catch((err) => {
        console.log("api add error", err);
      });
  };

  return (
    <div className="start-container container">
      {userCreateMessage && (
        <div class="alert alert-primary" role="alert">
          {userCreateMessage}
        </div>
      )}
      <div className="row">
        <div class="col-4">
          <h4 className="text-secondary primary-color">Information du joueur</h4>
          <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center fw-bold">
              Pseudo
              <span class="badge badge-primary badge-pill text-secondary ">
                {user?.pseudo}
              </span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center fw-bold">
              Score
              <span class="badge badge-primary badge-pill bg-primary">
                {user?.mark}
              </span>
            </li>
          </ul>
        </div>
        <div class="col-8"></div>
      </div>
      <div>
        <button type="button" class="btn btn-primary mb-5">
          Point <span class="badge badge-light"> {mark} </span>
        </button>
      </div>
      <div
        className="d-flex justify-content-end backspace-custum"
        onClick={handledBackspace}
      >
        <img width={50} height={50} src={backspaceIcon} alt="retour" />
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

      <div className="d-flex justify-content-center mt-5 mb-5">
        {!message.value &&
          wordToDisplay &&
          wordToDisplay.map((letter, index) => (
            <div
              key={index}
              onClick={() => takeLetter(letter, index, wordToDisplay)}
            >
              <WordToDisplay letter={letter} />
            </div>
          ))}
        {message.value && (
          <>
            <div>
              <div className={`h1 ${message.style}`}>{message.value}</div>
              <button
                className="btn btn-outline-secondary mt-3 me-2 py-3 px-4"
                onClick={runPreviosRandomWord}
              >
                Reprendre
              </button>
              <button
                className="btn btn-primary mt-3 ms-3 py-3 px-3"
                onClick={runAgain}
              >
                Recommencer
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
