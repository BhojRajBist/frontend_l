// import React, { useState, useEffect } from 'react';
// import './home.css'; // Import your CSS file for styling
// import c1 from './images/c1.png'
// import c2 from './images/c2.png'
// import c3 from './images/c3.png'

// const Homepage = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       image:c1,
//       // text: 'This is the your gateway to Loksewa.This site is developed by Geoneer Geopatial Services',
//     },
//     {
//       image: c2,
//       // text: 'Join Us to Crack Loksewa',
//     },
//     {
//       image: c3,
//       // text: 'Join Us for Exclusive Offers',
//     },
//   ];

//   const totalSlides = slides.length;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [totalSlides]);

//   return (
//     <div className="carousel-container">
//       {slides.map((slide, index) => (
//         <div
//           key={index}
//           className={`slide ${index === currentSlide ? 'active' : ''}`}
//           style={{ backgroundImage: `url(${slide.image})` }}
//         >
//           <div className="text-box">
//             {/* <h1>{slide.text}</h1>
//             <button>Learn More</button> */}
//           </div>
//         </div>
//       ))}


//     </div>
   
     
//   );
// };

// export default Homepage;


import React, { useState, useEffect } from 'react';
import './home.css'; 
import c1 from './images/c1.png';
import c2 from './images/c2.png';
import c3 from './images/c3.png';

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: c1 },
    { image: c2 },
    { image: c3 },
  ];

  const totalSlides = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // const nextSlide = () => {
  //   setCurrentSlide((currentSlide + 1) % totalSlides);
  // };

  // const prevSlide = () => {
  //   setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
  // };

  return (
    <div className="carousel-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
        >
          <img src={slide.image} alt={`Slide ${index}`} />
          <div className="text-box">
            {/* <h1>{slide.text}</h1>
            <button>Learn More</button> */}
          </div>
        </div>
      ))}
      <div className="dots-container">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
      {/* <div className="arrow left" onClick={prevSlide}>&lt;</div>
      <div className="arrow right" onClick={nextSlide}>&gt;</div> */}
    </div>
  );
};

export default Homepage;
