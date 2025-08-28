import React from 'react';
import back1 from "../assets/slideimg1.jpg";
import back2 from "../assets/slideimg2.jpg";
import back3 from "../assets/slideimg3.jpg";
import back4 from "../assets/slideimg4.jpg";
import back5 from "../assets/slideimg5.jpg";

const Background = ({ heroCount }) => {
  let imgSrc;

  switch (heroCount) {
    case 0:
      imgSrc = back2;
      break;
    case 1:
      imgSrc = back5;
      break;
    case 2:
      imgSrc = back3;
      break;
    case 3:
      imgSrc = back4;
      break;
    default:
      imgSrc = back1;
  }

  return (
    <div className="w-full h-[400px] md:h-full overflow-hidden">
      <img
        src={imgSrc}
        alt="Hero Background"
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
};

export default Background;
