import './App.css';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

// fetched template:
export default function App() {
  //
  const [memeID, setMemeID] = useState([]);
  const [imgURL, setImgURL] = useState([]);

  const [inputTop, setInputTop] = useState('');
  const [inputBottom, setInputBottom] = useState('');
  const [memeIndex, setMemeIndex] = useState([51]);
  const [findMeme, setFindMeme] = useState(''); // get input message for finding name of the meme
  // id of meme
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.memegen.link/templates/');
      const data = await response.json();
      const objectID = data.map((item) => item.id);
      setMemeID(objectID);
      // console.log(objectID);
    }
    fetchData().catch((error) => console.error(error));
  }, []);
  // url of array of images
  useEffect(() => {
    async function fetchURL() {
      const response = await fetch('https://api.memegen.link/templates/');
      const data = await response.json();
      console.log(data[0].example.url);
      const imgUrl = data.map((item) => item.example.url);
      setImgURL(imgUrl);
    }
    fetchURL().catch((error) => console.error(error));
  }, []);

  // symbols replacement
  const inputTopReplacement = inputTop
    .replace(/__/g, '-')
    .replace(/--/g, '-')
    .replace(/ /g, '_');

  const inputBottomReplacement = inputBottom
    .replace(/__/g, '-')
    .replace(/--/g, '-')
    .replace(/ /g, '_');

  // ссыла на генерацию картинки
  const imageUrl = `https://api.memegen.link/images/${memeID[memeIndex]}/${
    inputTopReplacement ? inputTopReplacement : '_'
  }${inputBottomReplacement ? '/' + inputBottomReplacement : ''}.jpg`;

  // download image:
  function downloadImage() {
    const downloadURL = `https://api.memegen.link/images/${memeID[memeIndex]}/${
      inputTopReplacement ? inputTopReplacement : '_'
    }${inputBottomReplacement ? '/' + inputBottomReplacement : ''}.jpg`;
    const fileName = `${memeID[memeIndex]}.jpg`;

    fetch(downloadURL)
      .then((response) => response.blob())
      .then((blob) => saveAs(blob, fileName))
      .catch((error) => console.log(error));
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const index = memeID.findIndex((item) => item === findMeme);
      if (index !== -1) {
        setMemeIndex(index);
      }
    }
  };
  // selecting meme by typing:
  imgURL.find((element) => element.includes(findMeme));

  return (
    <div className="App">
      <section className={styles.section}>
        <div
          // className={styles.generatedimage}
          // style={{ backgroundImage: `url(${imageUrl})` }}
          data-test-id="meme-image"
        >
          <img
            src={imageUrl}
            alt=""
            data-test-id="meme-image"
            className={styles.generatedimage}
          />{' '}
        </div>

        <div className={styles.url}>
          <p>Custom meme:</p>

          <input
            // className={styles.input}
            placeholder="Search your meme"
            id="message"
            name="message"
            value={findMeme}
            onChange={(event) => setFindMeme(event.currentTarget.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            label="Top Text"
            // className={styles.input}
            placeholder="Top line"
            value={inputTop}
            onChange={(event) => {
              setInputTop(event.currentTarget.value);
            }}
          />
          <input
            label="Bottom Text"
            // className={styles.input}
            placeholder="Bottom line"
            value={inputBottom}
            onChange={(event) => {
              setInputBottom(event.currentTarget.value);
            }}
          />

          <button onClick={downloadImage} className={styles.btn}>
            Download!
          </button>
        </div>
        <div className={styles.gallery}>
          <div className={styles.displayedimg}>
            {imgURL.map((image, index) => (
              <button
                aria-label="Meme template"
                className={styles.btngallery}
                key={`gallery-image-${image}`}
                src={image}
                width="110"
                height="90"
                alt=""
                onClick={() => setMemeIndex(index)}
                style={{
                  backgroundImage: `url(${image})`,
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
