// const url = 'http://api.weatherapi.com/v1';
// function App() {
//   const [img, setImg] = useState();

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await fetch(url);
//       console.log(result);
//     };
//     fetchData();
//   });
// }

// export default function App() {
//   const [img, setImg] = useState();
//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch('https://api.memegen.link/templates/')
//         .then((response) => response.json())
//         .then((data) => setImg(data));

//       // const data = await response.json();

//       // const item = data[0].example.url;

//       // setImg(item);
//     }
//     fetchData().catch((error) => console.error(error));
//   }, []);

// export default function App() {
//   const [img, setImg] = useState([]);
//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch('https://api.memegen.link/templates/');
//       const data = await response.json();

//       const imgUrl = data.map((item) => item.example.url);
//       console.log(imgUrl);
//       setImg(imgUrl);
//     }
//     fetchData().catch((error) => console.error(error));
//   }, []);

//   console.log(img);
