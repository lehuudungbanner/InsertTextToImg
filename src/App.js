import logo from "./logo.svg";
import "./App.css";
import * as XLSX from "xlsx";
import God from "../src/assets/final_5.jpg";
import Final1 from "../src/assets/final_1.jpg";
import Final2 from "../src/assets/final_2.jpg";
import Final3 from "../src/assets/final_3.jpeg";
import Final4 from "../src/assets/final_4.jpg";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DEFAULT_IMG = 0;
const RED = "#DF0334";
const WHITE = "white ";
const listImage = [
  { image: God, type: 0 },
  { image: Final1, type: 1 },
  { image: Final2, type: 2 },
  { image: Final3, type: 3 },
  { image: Final4, type: 4 },
];
const textStyle = [
  {
    type: 0,
    downloadStyle: {
      phoneNumberCoor: { x: 340, y: 970, fontSize: "150px", color: RED },
      typeCoor: { x: 50, y: 150, fontSize: "90px", color: RED },
      priceCoor: { x: 1150, y: 150, fontSize: "90px", color: RED },
    },
    previewStyle: {
      phoneNumberCoor: { x: 70, y: 240, fontSize: "40px", color: RED },
      typeCoor: { x: 15, y: 40, fontSize: "28px", color: RED },
      priceCoor: { x: 270, y: 40, fontSize: "28px", color: RED },
      scale: 0.25,
    },
  },
  {
    type: 1,
    downloadStyle: {
      phoneNumberCoor: { x: 150, y: 425, fontSize: "170px", color: RED },
      typeCoor: { x: 30, y: 150, fontSize: "80px", color: "black" },
      priceCoor: { x: 1030, y: 150, fontSize: "80px", color: "black" },
    },
    previewStyle: {
      phoneNumberCoor: { x: 35, y: 127, fontSize: "55px", color: RED },
      typeCoor: { x: 10, y: 45, fontSize: "30px", color: "black" },
      priceCoor: { x: 280, y: 45, fontSize: "30px", color: "black" },
      scale: 0.3,
    },
  },
  {
    type: 2,
    downloadStyle: {
      phoneNumberCoor: { x: 220, y: 330, fontSize: "150px", color: RED },
      typeCoor: { x: 90, y: 100, fontSize: "80px", color: RED },
      priceCoor: { x: 1000, y: 100, fontSize: "80px", color: RED },
    },
    previewStyle: {
      phoneNumberCoor: { x: 50, y: 100, fontSize: "50px", color: RED },
      typeCoor: { x: 30, y: 30, fontSize: "25px", color: RED },
      priceCoor: { x: 300, y: 30, fontSize: "25px", color: RED },
      scale: 0.3,
    },
  },
  {
    type: 3,
    downloadStyle: {
      phoneNumberCoor: { x: 100, y: 930, fontSize: "150px", color: RED },
      typeCoor: { x: 30, y: 130, fontSize: "90px", color: RED },
      priceCoor: { x: 820, y: 130, fontSize: "90px", color: RED },
    },
    previewStyle: {
      phoneNumberCoor: { x: 50, y: 325, fontSize: "50px", color: RED },
      typeCoor: { x: 20, y: 40, fontSize: "32px", color: RED },
      priceCoor: { x: 290, y: 40, fontSize: "32px", color: RED },
      scale: 0.35,
    },
  },
  {
    type: 4,
    downloadStyle: {
      phoneNumberCoor: { x: 150, y: 590, fontSize: "140px", color: WHITE },
      typeCoor: { x: 30, y: 100, fontSize: "80px", color: WHITE },
      priceCoor: { x: 850, y: 100, fontSize: "80px", color: WHITE },
    },
    previewStyle: {
      phoneNumberCoor: { x: 45, y: 190, fontSize: "50px", color: WHITE },
      typeCoor: { x: 15, y: 45, fontSize: "35px", color: WHITE },
      priceCoor: { x: 260, y: 45, fontSize: "35px", color: WHITE },
      scale: 0.33,
    },
  },
];

function App() {
  const [listPhone, setListPhone] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
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
              console.log();
              listPhone.push({
                phoneNumber:
                  item["SIM"].toString().charAt(0) !== "0"
                    ? "0" + item["SIM"]
                    : item["SIM"],
                price: item["GiÁ"],
                type: item["mạng"],
              });
            });
          } else {
            alert(1);
            e.preventDefault();
            return;
          }
          setListPhone([...listPhone]);
        } else {
          alert(12);

          e.preventDefault();
        }
      };
      reader.readAsBinaryString(f);
    }
  };

  const draw = (value, item, ctx) => {
    const { x, y, fontSize, color } = item;
    if (value) {
      ctx.font = fontSize + " arial";
      ctx.fillStyle = color;
      ctx.fillText(value, x, y);
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
      const { phoneNumberCoor, typeCoor, priceCoor, scale } = previewStyle;
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

        //Draw type
        draw(type, typeCoor, ctx);
        //Draw price
        draw(price, priceCoor, ctx);
        //Draw phone number
        draw(phoneNumber, phoneNumberCoor, ctx);
      }
    };

    img.src = image;
  };

  const generateDownloadImg = (image, style, itemPhone) => {
    const canvas = document.getElementById("canvasDownload");
    const { downloadStyle = {} } = style || {};
    const { phoneNumberCoor, typeCoor, priceCoor } = downloadStyle;
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

        //Draw type
        draw(type, typeCoor, ctx);
        //Draw price
        draw(price, priceCoor, ctx);
        //Draw phone number
        draw(phoneNumber, phoneNumberCoor, ctx);
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

  const handleChange = (value) => {
    setSelectedImage(value);
    const imageItem = listImage.find((item) => item.type == value);
    const style = textStyle.find((item) => item.type == value);

    generateImg(imageItem.image, style, selectedPhoneItem);
    generateDownloadImg(imageItem.image, style, selectedPhoneItem);
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
                  style={
                    item.phoneNumber === selectedPhoneItem.phoneNumber
                      ? {
                          color: "white",
                          backgroundColor: "#94ccf5",
                          fontWeight: "bold",
                        }
                      : {}
                  }
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
          <div className="list">
            {listImage.map((item, index) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "10px",
                }}
                key={index}
                onClick={() => handleChange(item.type)}
              >
                <input
                  type="radio"
                  name="image_select"
                  value={item.type}
                  checked={selectedImage == item.type}
                />
                <img src={item.image} className="image img-thumbnail" />
              </div>
            ))}
          </div>
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
