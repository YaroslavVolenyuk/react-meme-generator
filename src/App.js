import './App.css';
import { type } from '@testing-library/user-event/dist/type';
import { useEffect, useState } from 'react';
// import Images from './Images';
import styles from './styles.module.css';

// fetched template:
export default function App() {
  const [memeID, setMemeID] = useState([]);
  const [imgURL, setImgURL] = useState([]);

  const [inputTop, setInputTop] = useState('');
  const [inputBottom, setInputBottom] = useState('');
  let memeIndex = 0;

  // id of meme
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.memegen.link/templates/');
      const data = await response.json();
      // console.log(data[0]);
      // console.log(data[0].example.text[1]);
      // console.log(data[0].url);
      const objectID = data.map((item) => item.id);
      // console.log(imgUrl);
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
      // console.log(imgUrl);
      setImgURL(imgUrl);
    }
    fetchURL().catch((error) => console.error(error));
  }, []);

  let imputTopReplacement;
  imputTopReplacement = inputTop.replace('-', ' ');
  imputTopReplacement = inputTop.replace('__', '-');
  imputTopReplacement = inputTop.replace('--', '-');
  imputTopReplacement = inputTop.replace(' ', '_');
  imputTopReplacement = inputTop.replace('', '_');

  let inputBottomReplacement;
  inputBottomReplacement = inputBottom.replace('-', ' ');
  inputBottomReplacement = inputBottom.replace('__', '-');
  inputBottomReplacement = inputBottom.replace('--', '-');
  inputBottomReplacement = inputBottom.replace(' ', '_');
  inputBottomReplacement = inputBottom.replace('', '_');
  inputBottomReplacement = inputBottom.replace('+', '+++');

  // console.log(inputTop);
  // console.log(imputTopReplacement);
  // console.log(inputBottom);
  // console.log(inputBottomReplacement);

  // console.log(
  //   `https://api.memegen.link/images/${memeID[1]}/${imputTopReplacement}/${inputBottomReplacement}.jpg`,
  // );

  // ссыла на генерацию картинки
  const imageUrl = `https://api.memegen.link/images/${memeID[memeIndex]}/${imputTopReplacement}/${inputBottomReplacement}.jpg`;

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

          <button className={styles.btn}> Download!</button>
        </div>
        <div className={styles.gallery}>
          <div className={styles.displayedimg}>
            {imgURL.map((image) => (
              <img
                key={image.toString()}
                src={image}
                width="110"
                height="90"
                alt=""
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
