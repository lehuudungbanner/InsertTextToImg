import logo from "./logo.svg";
import "./App.css";
import * as XLSX from "xlsx";
import God from "../src/assets/moneyGod.jpg";
import Crown from "../src/assets/imageCrown.jpg";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DEFAULT_IMG = 1;
const listImage = [
  { image: God, type: 1 },
  { image: Crown, type: 2 },
];

const textStyle = [
  {
    type: 1,
    downloadStyle: { x: 380, y: 920, fontSize: "70px" },
    previewStyle: { x: 120, y: 280, fontSize: "20px", scale: 0.3 },
  },
  {
    type: 2,
    downloadStyle: { x: 200, y: 630, fontSize: "45px" },
    previewStyle: { x: 120, y: 315, fontSize: "20px", scale: 0.5 },
  },
];

function App() {
  const [listPhone, setListPhone] = useState([]);
  const [selectedImage, setSelectedImage] = useState(1);
  const [selectedPhoneItem, setSelectedPhoneItem] = useState({});

  useEffect(() => {
    const imageItem = listImage.find((item) => item.type == DEFAULT_IMG);
    const style = textStyle.find((item) => item.type == DEFAULT_IMG);

    generateImg(imageItem.image, style);
  }, []);

  const handleUpload = (e) => {
    var files = e.target.files;
    var f = files[0];
    if (f) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var data = e.target.result;
        if (data) {
          let readedData = XLSX.read(data, { type: "binary" });
          const wsname = readedData.SheetNames[0];
          const ws = readedData.Sheets[wsname];
          const json = XLSX.utils.sheet_to_json(ws);
          const isCorrectTemplate = json.every(
            (item) => item["SIM"] && item["GiÁ"] && item["mạng"]
          );
          if (isCorrectTemplate) {
            json.forEach((item) => {
              listPhone.push({
                phoneNumber: "0" + item["SIM"],
                price: item["GiÁ"],
                type: item["mạng"],
              });
            });
          } else {
            e.preventDefault();
            return;
          }
          setListPhone([...listPhone]);
        } else {
          e.preventDefault();
        }
      };
      reader.readAsBinaryString(f);
    }
  };

  const generateImg = (image, style, itemPhone) => {
    const canvas = document.getElementById("canvas");

    const ctx = canvas.getContext("2d");

    let img = new Image();
    img.onload = function () {
      let loadedImageWidth = img.width;
      let loadedImageHeight = img.height;
      const { previewStyle = {} } = style || {};
      const { x, y, fontSize, scale } = previewStyle;
      // Set the canvas to the same size as the image.
      canvas.width = loadedImageWidth * scale;
      canvas.height = loadedImageHeight * scale;

      // Draw the image on to the canvas.
      ctx.drawImage(
        img,
        0,
        0,
        img.naturalWidth * scale,
        img.naturalHeight * scale
      );
      if (itemPhone) {
        const { phoneNumber, price, type } = itemPhone;

        ctx.font = fontSize + " serif";
        ctx.fillStyle = "red";

        ctx.fillText(type + "-" + phoneNumber + "-" + price, x, y);
      }
    };

    img.src = image;
  };

  const generateDownloadImg = (image, style, itemPhone) => {
    const canvas = document.getElementById("canvasDownload");
    const { downloadStyle = {} } = style || {};
    const { x, y, fontSize } = downloadStyle;
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
      if (itemPhone) {
        const { phoneNumber, price, type } = itemPhone;
        ctx.font = fontSize + " serif";
        ctx.fillStyle = "red";

        ctx.fillText(type + "-" + phoneNumber + "-" + price, x, y);
        // (B3) "FORCE DOWNLOAD"
      }
    };

    img.src = image;
  };

  const onSelectItem = (item) => {
    const imageItem = listImage.find((item) => item.type == selectedImage);
    const style = textStyle.find((item) => item.type == selectedImage);
    setSelectedPhoneItem(item);
    generateImg(imageItem.image, style, item);
    generateDownloadImg(imageItem.image, style, item);
  };

  const handleChange = (event) => {
    setSelectedImage(event.target.value);
    const imageItem = listImage.find((item) => item.type == event.target.value);
    const style = textStyle.find((item) => item.type == event.target.value);
    generateImg(imageItem.image, style);
    generateDownloadImg(imageItem.image, style);
  };

  const onDownload = () => {
    const canvas = document.getElementById("canvasDownload");
    let anchor = document.createElement("a");
    anchor.href = canvas.toDataURL("image/jpeg");
    anchor.download = "image.jpeg";
    anchor.click();
    anchor.remove();
  };

  return (
    <div className="App">
      <input
        id="inputId"
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={handleUpload}
        style={{ margin: "auto" }}
      />
      <div className="container">
        <div className="listPhone">
          <p>Danh sách số điện thoại</p>
          <div className="list">
            {listPhone.length > 0 ? (
              listPhone.map((item, index) => (
                <div
                  className="itemList"
                  key={index}
                  onClick={() => onSelectItem(item)}
                >
                  {item.phoneNumber}
                </div>
              ))
            ) : (
              <div className="list"></div>
            )}
          </div>
        </div>
        <div className="listImage">
          <p>Danh sách ảnh</p>
          {listImage.map((item) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <input
                type="radio"
                name="image_select"
                value={item.type}
                onChange={(e) => handleChange(e)}
                checked={selectedImage == item.type}
              />
              <img src={item.image} className="image" />
            </div>
          ))}
        </div>
        <div className="itemFlex">
          <canvas
            id="canvas"
            width="100"
            height="100"
            style={{ objectFit: "contain" }}
          ></canvas>
          <canvas id="canvasDownload" style={{ display: "none" }} />
          <button
            className="btn btn-primary"
            onClick={() => onDownload()}
            style={{ marginTop: "10px" }}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
