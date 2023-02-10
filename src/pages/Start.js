import React, { useEffect, useState } from "react";
import OtpInput from "react18-input-otp";
import "./page-styles/start.css";
import WordToDisplay from "../components/WordToDisplay";
import { generateSlug } from "random-word-slugs-fr";
import AppModal from "../components/AppModal";
import { apiService } from "../services/api.service";
import backspaceIcon from '../assets/img/backspace.png'

const Start = () => {
  const [error, setError] = useState(false);
  const [gessWord, setGessWord] = useState("");
  const [trueWord, setTrueWord] = useState("");
  const [wordToDisplay, setWordToDisplay] = useState("");
  const [wordToDisplayBackup, setWordToDisplayBackup] = useState("");
  const [wordLength, setWordLength] = useState(0);
  const [message, setmessage] = useState("");
  const [partStatus, setpartStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mark, setMark] = useState(10);
  const [tryNumber, setTryNumber] = useState(1);
  const [user, setUser] = useState(null);
  const [userCreateMessage, setUserCreateMessage] = useState("");

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
    setWordToDisplayBackup(shuffledArray);
  };
  console.log(wordToDisplayBackup)
  console.log("wordToDisplay",wordToDisplay);

  const takeLetter = (value, index) => {
    let _tryNumber
    removeWordToDisplayLetter(index)
    setError(false);
    const oldgessWord = gessWord;
    const newgessWord = oldgessWord + value;
    setGessWord(newgessWord);
    if (newgessWord.length === wordLength) {
      console.log(tryNumber)
      _tryNumber = tryNumber + 1
     setTryNumber(_tryNumber);
      const _mark = mark;
      if (newgessWord === trueWord) {
        setmessage("Bravo! Vous avez gagne...");
        setpartStatus(true);
        setError(true);
        updateUserInfo(_mark);
      } else {
        if (_tryNumber < 6) setMark(mark - 2);
        setpartStatus(false);
        setError(true);
        setmessage("Désolé! Vous avez perdu");
      }
    }
  };

  const removeWordToDisplayLetter = (index) => {
    const _wordToDisplay = wordToDisplay;
    _wordToDisplay.splice(index, 1);
    setWordToDisplay(_wordToDisplay);
  }

  const runAgain = () => {
    randomWord();
  };

  const handledBackspace = () => {
    console.log("wordToDisplayBackup", wordToDisplayBackup);
    const gessWordLetter = gessWord[gessWord.length - 1];
    console.log("gessWordLetter", gessWordLetter);
    const wordToDisplayIndex = wordToDisplayBackup.indexOf(gessWordLetter);
    console.log(wordToDisplayIndex);
    if (gessWord.length !== 0) {
      setGessWord(gessWord.slice(0, gessWord.length - 1));
      wordToDisplay.splice(wordToDisplayIndex, 0, gessWordLetter);
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
          <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Pseudo
              <span class="badge badge-primary badge-pill text-secondary">
                {user?.pseudo}
              </span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              points Total
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
      <div className="d-flex justify-content-end backspace-custum" onClick={handledBackspace}>
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

      <div className="d-flex justify-content-center mt-5">
        {!message &&
          wordToDisplay &&
          wordToDisplay.map((letter, index) => (
            <div key={index} onClick={() => takeLetter(letter, index)}>
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
