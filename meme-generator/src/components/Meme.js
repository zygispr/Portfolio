import React, { useState, useEffect } from "react";

export default function Meme() {
  // Meme state:
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  // All memes state:
  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    // This gets the data from an API and sets it to 'allMemes' state
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((apiData) => setAllMemes(apiData.data.memes));
  }, []);

  // This function runs when 'Get a new meme image button' is clicked:
  function getMemeImage() {
    // Generates a random number between 0 and the length of the 'allMemes' array:
    const randomIndex = Math.floor(Math.random() * allMemes.length);

    // Gets the image url for the meme, whose index in the 'allMemes' array is 'randomIndex':
    const imageUrl = allMemes[randomIndex].url;

    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        randomImage: imageUrl,
      };
    });
  }

  // This function runs when 'topText' or 'bottomText' changes:
  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          name="topText"
          value={meme.topText}
          onChange={handleChange}
          type="text"
          className="form--input"
          placeholder="Top text"
        />
        <input
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
          type="text"
          className="form--input"
          placeholder="Bottom text"
        />
        <button onClick={getMemeImage} className="form--button">
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img className="meme--image" src={meme.randomImage} alt="Meme" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
