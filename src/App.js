import logo from "./logo.svg";
import "./App.css";
import * as XLSX from "xlsx";
import Test from "../src/assets/test.png";
import Background from "../src/assets/background.png";

function App() {
  const handleUpload = (e) => {
    var files = e.target.files,
      f = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      console.log("readedData: ", readedData);
      const wsname = readedData.SheetNames[0];
      console.log("wsname", wsname);
      const ws = readedData.Sheets[wsname];
      const json = XLSX.utils.sheet_to_json(ws);
      console.log("json", json);
      json.forEach((item) => generateImg(item));
      // /* Convert array to json*/
      // const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
      // //setFileUploaded(dataParse);
    };
    reader.readAsBinaryString(f);
  };

  const generateImg = ({ phoneNumber, price }) => {
    console.log("phoneNumber", phoneNumber);
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let img = new Image();
    img.onload = function () {
      let loadedImageWidth = img.width;
      let loadedImageHeight = img.height;

      // Set the canvas to the same size as the image.
      canvas.width = loadedImageWidth;
      canvas.height = loadedImageHeight;

      // Draw the image on to the canvas.
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

      ctx.font = "50px serif";
      ctx.fillStyle = "white";

      ctx.fillText("hello word", 50, 90);
      // (B3) "FORCE DOWNLOAD"
      let anchor = document.createElement("a");
      anchor.href = canvas.toDataURL("image/jpeg");
      anchor.download = "image.jpeg";
      anchor.click();
      anchor.remove();
    };

    img.src = Background;
  };

  return (
    <div className="App">
      <input
        id="inputId"
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={handleUpload}
      />
      <canvas id="canvas" width="100" height="200"></canvas>
    </div>
  );
}

export default App;
