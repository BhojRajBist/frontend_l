

import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import '../components/quiz.css';
import Swal from 'sweetalert2';
import parse from 'html-react-parser';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const Chapter = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const questionRef = useRef(null);
  const [showResultButton, setShowResultButton] = useState(false);
  const [optionStyle, setOptionStyle] = useState({});
  const [showResultDetails, setShowResultDetails] = useState(false);
  const [disabledQuestions, setDisabledQuestions] = useState([]);
  let questionNumber = 1; 
  const location = useLocation();
  // const chapterId = location.state?.chapterId;
  const additionalProp = location.state?.additionalProp;
  const chapterName = location.state?.chapterName;

  const handleResultSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setShowResultButton(true);
    setDisabledQuestions(Object.keys(selectedAnswers));
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!showResultButton) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [showResultButton]);
  

  useEffect(() => {
    axios
      .get(` ${additionalProp} `)
      .then(response => {
        setIsLoaded(true);
        setItems(response.data);
      })
      .catch(error => {
        setIsLoaded(true);
        setError(error);
      });
  },[additionalProp]);

  useEffect(() => {
    if (questionRef.current) {
      const questionWidth = questionRef.current.getBoundingClientRect().width;
      const optionStyle = {
        width: questionWidth + 'px',
      };
      setOptionStyle(optionStyle);
    }
  }, [items]);

  const mergedItems = items.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = item;
    } else {
      acc[item.id] = { ...acc[item.id], ...item };
    }
    return acc;
  }, {});

  const mergedItemsArray = Object.values(mergedItems);

  const handleOptionClick = (itemId, option) => {
    // Check if the option is already selected for the given question
    if (!selectedAnswers[itemId] && !showResultButton) {
      setSelectedAnswers(prevState => ({
        ...prevState,
        [itemId]: option.toString(), // Convert the option to a string
      }));
    }
  };

  const getOptionClassName = (itemId, option) => {
    const item = mergedItemsArray.find(item => item.id === itemId);
    const selectedOption = selectedAnswers[itemId];

    if (selectedOption === option.toString()) {
      if (showResultButton) {
        if (selectedOption !== item.correctOpt.toString()) {
          return 'option wrong';
        }
      }

      return 'option selected';
    } else if (disabledQuestions.includes(itemId)) {
      // Disable the option if the question is disabled
      return 'option disabled';
    } else {
      return 'option';
    }
  };

  const handleShowResultClick = () => {
    const count = Object.values(selectedAnswers).reduce((acc, selectedOption, index) => {
      const item = mergedItemsArray[index];
      if (selectedOption === item.correctOpt.toString()) {
        acc++;
      }
      return acc;
    }, 0);

    setShowResultDetails(true);

    Swal.fire({
      title: 'Result',
      text: `You answered ${count} questions correctly!`,
      icon: 'info',
    }).then(() => {
      // Store quiz data in local storage
      const quizData = {
        date: new Date().toLocaleString(),
        score: count,
      };
      localStorage.setItem('quizData', JSON.stringify(quizData));
    });
  };

  const attendedQuestionsCount = Object.keys(selectedAnswers).length;

  return (
    <div className="quiz-container">
      
    
      <h6>Practice Questions for    <strong>"{chapterName}"</strong> </h6>
      <br></br>

      {console.log(chapterName)}

      <div className="attendance-count">{attendedQuestionsCount} Questions Attended</div>

      {error && <div>Error: {error.message}</div>}

      {!isLoaded && !error && <div>Loading...</div>}

      {isLoaded && mergedItemsArray.length === 0 && <div>No items to display</div>}

      {isLoaded && mergedItemsArray.length > 0 && (
   <ul style={{ listStyleType: 'none', paddingLeft: '0', marginRight: '10px' }}>
          {mergedItemsArray.map(item => (
            <li key={item.id}>
              <br></br>
<h6>
  <div ref={questionRef} style={{ display: 'flex', alignItems: 'flex-start', textAlign: 'left' }}>
    <span style={{ marginRight: '10px', whiteSpace: 'nowrap' }}>
      Q {questionNumber++}:
    </span>
    <span style={{ flex: 1 }}>
      {parse(item.question)}
    </span>
  </div>
</h6>

<ul style={{ listStyleType: 'none', padding: '0', margin: '0', textAlign: 'left' }}>
  <li
    className={getOptionClassName(item.id, "1")}
    onClick={() => handleOptionClick(item.id, "1")}
    style={{ ...optionStyle, marginBottom: '5px', padding: '10px', cursor: 'pointer' }}
  >
    <span className="option-text">{parse(item.option1)}</span>
  </li>
  <li
    className={getOptionClassName(item.id, "2")}
    onClick={() => handleOptionClick(item.id, "2")}
    style={{ ...optionStyle, marginBottom: '5px', padding: '10px', cursor: 'pointer' }}
  >
    <span className="option-text">{parse(item.option2)}</span>
  </li>
  <li
    className={getOptionClassName(item.id, "3")}
    onClick={() => handleOptionClick(item.id, "3")}
    style={{ ...optionStyle, marginBottom: '5px', padding: '10px', cursor: 'pointer' }}
  >
    <span className="option-text">{parse(item.option3)}</span>
  </li>
  <li
    className={getOptionClassName(item.id, "4")}
    onClick={() => handleOptionClick(item.id, "4")}
    style={{ ...optionStyle, marginBottom: '5px', padding: '10px', cursor: 'pointer' }}
  >
    <span className="option-text">{parse(item.option4)}</span>
  </li>
</ul>
{showResultDetails && (
  <div className="result-details"  style={{ display: 'flex', alignItems: 'flex-start', textAlign: 'left' }}>
    <p >Explanation: {parse(item.explanation)}</p>
  </div>
)}

           
            </li>
          ))}
        </ul>
      )}

      {attendedQuestionsCount === mergedItemsArray.length && !showResultButton && (
        <button className="submit-button" onClick={handleResultSubmit}>Submit</button>
      )}

      {showResultButton && (
        <button className="show-result-button" onClick={handleShowResultClick}>Show Result</button>
      )}
    </div>
  );
};

export default Chapter;



