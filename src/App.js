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
  const [memeIndex, setMemeIndex] = useState([20]);

  // id of meme
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.memegen.link/templates/');
      const data = await response.json();
      const objectID = data.map((item) => item.id);
      setMemeID(objectID);
    }
    fetchData().catch((error) => console.error(error));
  }, []);
  // url of array of images
  useEffect(() => {
    async function fetchURL() {
      const response = await fetch('https://api.memegen.link/templates/');
      const data = await response.json();
      // console.log(data[0].example.url);
      const imgUrl = data.map((item) => item.example.url);
      setImgURL(imgUrl);
    }
    fetchURL().catch((error) => console.error(error));
  }, []);

  // update id of selected image
  const handleClick = (index) => {
    setMemeIndex(index);
  };

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
    const imageUrl = `https://api.memegen.link/images/${memeID[memeIndex]}/${
      inputTopReplacement ? inputTopReplacement : '_'
    }${inputBottomReplacement ? '/' + inputBottomReplacement : ''}.jpg`;
    const fileName = imageUrl.slice(imageUrl.lastIndexOf('/') + 1);

    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => saveAs(blob, fileName))
      .catch((error) => console.log(error));
  }

  return (
    <div className="App">
      <section className={styles.section}>
        <div
          className={styles.generatedimage}
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <></>
        </div>

        <div className={styles.url}>
          <p>Custom meme:</p>
          <br></br>

          <input className={styles.input} />

          <input
            className={styles.input}
            placeholder="Top line"
            value={inputTop}
            onChange={(event) => {
              setInputTop(event.currentTarget.value);
            }}
          />
          <input
            className={styles.input}
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
                className={styles.btngallery}
                key={image.toString()}
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
