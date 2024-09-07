import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import Chapter from './Chapter';

import carto from './img/carto.jpeg'
import es from './img/es.jpeg'
import geodesy from './img/geodesy.jpeg'
import gis from './img/gis.jpeg'
import gnss from './img/gnss.jpeg'
import rs from './img/rs.jpeg'
import survey from './img/survey.jpeg'
import cad from './img/Cadastre.jpg'
import dbms from './img/db,s.jpeg'
import pm from './img/pm.png'
import './carousel.css'

const ChapterCard = () => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [cardsVisible, setCardsVisible] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Trigger the animation when the component mounts
    setCardsVisible(true);
  }, []);

  const chapters = [
    {
      id: 1,
      name: 'Fundamentals of Surveying',
      image: survey,
      additionalProp: 'https://nec.geoneer.com.np/api/geomatics/AGeE01',
    },
    {
      id: 2,
      name: 'Photogrammetry, Remote Sensing and Image Processing',
      image: rs,
      additionalProp: 'https://nec.geoneer.com.np/api/geomatics/AGeE02',
    },
    {
      id: 3,
      name: 'Geodesy and Gravity Field',
      image: geodesy,
      additionalProp: 'https://nec.geoneer.com.np/api/geomatics/AGeE03',
    },
    {
      id: 4,
      name: 'Cadaster, Land Use and Land Management',
      image: cad,
      additionalProp: 'https://nec.geoneer.com.np/api/geomatics/AGeE04',
    },
    {
      id: 5,
      name: 'Global Navigation Satellite System',
      image: gnss,
      additionalProp: 'https://nec.geoneer.com.np/api/geomatics/AGeE05',
    },
    {
      id: 6,
      name: 'Cartography and Geo-Visualization',
      image: carto,
      additionalProp: 'https://nec.geoneer.com.np/api/geomatics/AGeE06',
    },
    {
      id: 7,
      name: 'Spatial Data Management System and Spatial Data Infrastructure',
      image: dbms,
      additionalProp: 'https://nec.geoneer.com.np/api/geomatics/AGeE07',
    },
    {
      id: 8,
      name: 'Geographic Information System',
      image: gis,
      additionalProp: 'https://nec.geoneer.com.np/api/geomatics/AGeE08',
    },
    {
      id: 9,
      name: 'Engineering Survey',
      image: es,
      additionalProp: 'https://nec.geoneer.com.np/api/geomatics/AGeE09',
    },
    {
      id: 10,
      name: 'Project Planning, Design and Implementation',
      image: pm,
      additionalProp: 'https://nec.geoneer.com.np/api/geomatics/AGeE10',
    },
  ];
  

  const handleTakeExam = (chapterName, additionalProp,) => {
    setSelectedChapter(chapterName);
    // Use history.push to navigate to the '/chapter' route with props
    history.push({
      pathname: '/chapter',
      state: {
        chapterName: chapterName,
        additionalProp: additionalProp,
        // chapterName: chapterName,
        // Add other props as needed
      },
    });
  };

  return (
    <div>
      <div className={`d-flex flex-wrap justify-content-center ${cardsVisible ? 'visible' : ''}`}>
        {chapters.map(chapter => (
          <Card
            key={chapter.name}
            className={`mb-4 card-animation ${cardsVisible ? 'visible' : ''}`}
            style={{ width: '18rem', position: 'relative', overflow: 'hidden', marginRight: '20px', marginLeft: '20px' }}
          >
             <Card.Img
              src={chapter.image}
              alt={`Chapter ${chapter.id}`}
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div
              className="text-white  p-2"
              style={{ position: 'absolute', top: '0', width: '100%',backgroundColor: '#7cb474' ,textAlign: 'center' }}
            >
              <h7>{chapter.name}</h7>
            </div>
            <Card.Body className="text-center">
              <Button variant="success" onClick={() => handleTakeExam(chapter.name, chapter.additionalProp)}>
                Take Exam
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {selectedChapter !== null && (
        <Chapter
          chapterName={selectedChapter}
          additionalProp={chapters.find(chapter => chapter.name === selectedChapter)?.additionalProp}
        />
      )}
    </div>
  );
};

export default ChapterCard;