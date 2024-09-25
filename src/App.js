import logo from "./logo.svg";
import "./App.css";
import * as XLSX from "xlsx";
import God from "../src/assets/img_6.jpg";
import Final1 from "../src/assets/img_7.jpg";
import Final2 from "../src/assets/img_8.jpg";
import Final3 from "../src/assets/img_9.jpg";
import Final4 from "../src/assets/img_10.jpg";
import Image11 from "../src/assets/img_11.jpg";
import Image12 from "../src/assets/img_12.jpg";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import JSZip from "jszip";

const DEFAULT_IMG = 0;
const SPECIAL_IMG = 2;
const SPECIAL_IMG_2 = 4;

const RED = "#DF0334";
const RED_2 = "#dd000d";
const YELLOW_2 = "#fcda4c";
const WHITE = "white ";
const YELLOW = "#fdf905";

const listImage = [
  { image: God, type: 0 },
  { image: Final1, type: 1 },
  { image: Final2, type: 2 },
  { image: Final3, type: 3 },
  { image: Final4, type: 4 },
  { image: Image11, type: 5 },
  { image: Image12, type: 6 },
];
const textStyle = [
  {
    type: 0,
    downloadStyle: {
      phoneNumberCoor: { x: 100, y: 630, fontSize: "90px", color: RED },
      typeCoor: { x: 50, y: 150, fontSize: "90px", color: RED },
      priceCoor: { x: 132, y: 496, fontSize: "43px", color: RED },
    },
    previewStyle: {
      phoneNumberCoor: { x: 70, y: 315, fontSize: "40px", color: RED },
      typeCoor: { x: 15, y: 0, fontSize: "28px", color: RED },
      priceCoor: { x: 65, y: 248, fontSize: "21px", color: RED },
      scale: 0.5,
    },
  },
  {
    type: 1,
    downloadStyle: {
      phoneNumberCoor: { x: 150, y: 500, fontSize: "90px", color: RED },
      typeCoor: { x: 30, y: 150, fontSize: "100px", color: RED },
      priceCoor: { x: 485, y: 303, fontSize: "43.5px", color: RED },
    },
    previewStyle: {
      phoneNumberCoor: { x: 35, y: 250, fontSize: "45px", color: RED },
      typeCoor: { x: 10, y: 45, fontSize: "30px", color: RED },
      priceCoor: { x: 241, y: 151, fontSize: "22px", color: RED },
      scale: 0.5,
    },
  },
  {
    type: 2,
    downloadStyle: {
      phoneNumberCoor: { x: 0, y: 905, fontSize: "130px", color: RED },
      typeCoor: { x: 90, y: 100, fontSize: "80px", color: RED },
      priceCoor: { x: 390, y: 1284, fontSize: "70px", color: RED },
    },
    previewStyle: {
      phoneNumberCoor: {
        x: 10,
        y: 225,
        fontSize: "30px",
        color: RED,
      },
      typeCoor: { x: 30, y: 30, fontSize: "25px", color: RED },
      priceCoor: { x: 94, y: 322, fontSize: "19px", color: RED },
      scale: 0.25,
    },
  },
  {
    type: 3,
    downloadStyle: {
      phoneNumberCoor: { x: 100, y: 450, fontSize: "70px", color: RED },
      typeCoor: { x: 30, y: 750, fontSize: "85px", color: RED },
      priceCoor: { x: 533, y: 544, fontSize: "46.5px", color: RED },
    },
    previewStyle: {
      phoneNumberCoor: { x: 30, y: 180, fontSize: "30px", color: RED },
      typeCoor: { x: 20, y: 265, fontSize: "32px", color: RED },
      priceCoor: { x: 213, y: 218, fontSize: "19px", color: RED },
      scale: 0.4,
    },
  },
  {
    type: 4,
    downloadStyle: {
      phoneNumberCoor: { x: 150, y: 565, fontSize: "105px", color: RED },
      typeCoor: { x: 30, y: 100, fontSize: "80px", color: RED },
      priceCoor: { x: 279, y: 810, fontSize: "57px", color: RED },
    },
    previewStyle: {
      phoneNumberCoor: { x: 145, y: 225, fontSize: "42px", color: RED },
      typeCoor: { x: 15, y: 45, fontSize: "35px", color: RED },
      priceCoor: { x: 112, y: 325, fontSize: "23px", color: RED },
      scale: 0.4,
    },
  },
  {
    type: 5,
    downloadStyle: {
      phoneNumberCoor: { x: 150, y: 365, fontSize: "110px", color: YELLOW },
      typeCoor: { x: 30, y: 100, fontSize: "80px", color: YELLOW },
      priceCoor: { x: 510, y: 470, fontSize: "47px", color: YELLOW },
    },
    previewStyle: {
      phoneNumberCoor: { x: 145, y: 147, fontSize: "45px", color: YELLOW },
      typeCoor: { x: 15, y: 45, fontSize: "35px", color: YELLOW },
      priceCoor: { x: 205, y: 188, fontSize: "19px", color: YELLOW },
      scale: 0.4,
    },
  },
  {
    type: 6,
    downloadStyle: {
      phoneNumberCoor: { x: 150, y: 350, fontSize: "140px", color: YELLOW_2 },
      typeCoor: { x: 30, y: 100, fontSize: "80px", color: YELLOW_2 },
      priceCoor: { x: 530, y: 433, fontSize: "45px", color: RED_2 },
    },
    previewStyle: {
      phoneNumberCoor: { x: 145, y: 138, fontSize: "53px", color: YELLOW_2 },
      typeCoor: { x: 15, y: 45, fontSize: "35px", color: YELLOW_2 },
      priceCoor: { x: 210, y: 173, fontSize: "18px", color: RED_2 },
      scale: 0.4,
    },
  },
];
function App() {
  const [listPhone, setListPhone] = useState([]);
  const [selectedImage, setSelectedImage] = useState(DEFAULT_IMG);
  const [selectedPhoneItem, setSelectedPhoneItem] = useState({});
  const [listImages, setListImages] = useState([]);
  const [isDownload, setIsDownload] = useState(false);

  useEffect(() => {
    setDefaultState();
  }, []);

  useEffect(() => {
    if (
      listImages.length === listPhone.length &&
      listPhone.length > 0 &&
      listImages.length > 0 &&
      isDownload
    ) {
      createZip(listImages);
      setDefaultState();
    }
  }, [listImages]);

  useEffect(() => {
    const imageItem = listImage.find((item) => item.type == selectedImage);
    const style = textStyle.find((item) => item.type == selectedImage);

    generateImg(imageItem.image, style, selectedPhoneItem);
    generateDownloadImg(imageItem.image, style, selectedPhoneItem);
  }, [selectedImage, selectedPhoneItem]);

  const setDefaultState = () => {
    const imageItem = listImage.find((item) => item.type == DEFAULT_IMG);
    const style = textStyle.find((item) => item.type == DEFAULT_IMG);
    generateImg(imageItem.image, style);
    setSelectedPhoneItem({});
    setSelectedImage(DEFAULT_IMG);
    setListImages([]);
    const myDiv = document.getElementById("listTelephone");
    myDiv.scroll({ top: 0, behavior: "smooth" });
    setIsDownload(false);
  };

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
          const headers = XLSX.utils.sheet_to_json(ws, { header: 1 })[0];
          const isCorrectTemplate =
            headers.length === 2 &&
            headers[0]?.toString()?.toUpperCase() === "SIM" &&
            headers[1]?.toString()?.toUpperCase() === "GIÁ";
          //&&
          //  headers[2]?.toString()?.toUpperCase() === "MẠNG";
          if (isCorrectTemplate) {
            const tempList = [];
            json.forEach((item) => {
              const price = item["GIÁ"]?.replace(/ /g, "")?.toLowerCase();
              //              const beforeText = price?.length > 4 ? "" : "  ";
              tempList.push({
                phoneNumber: item["SIM"],
                price:
                  //  beforeText +
                  "Giá: " + price,
                // type: item["MẠNG"],
              });
            });
            setListPhone([...tempList]);
            setDefaultState();
          } else {
            alert("Sai format file !");
            e.preventDefault();
            return;
          }
        } else {
          e.preventDefault();
        }
      };
      reader.readAsBinaryString(f);
    }
  };

  const fillTextToCanvas = (value, item, ctx, canvas, isPhone, specialVal) => {
    const { x, y, fontSize, color } = item;

    if (value) {
      ctx.font = fontSize + " arial ";
      ctx.fillStyle = color;
      const textWidth = ctx.measureText(value).width;

      const isCenter = selectedImage === 5 || selectedImage === 6;
      ctx.fillText(
        value,
        isPhone || isCenter ? canvas.width / 2 - textWidth / 2 + specialVal : x,
        y
      );
    }
  };

  const draw = (value, item, ctx, canvas, isPhone) => {
    let specialVal = 0;
    if (selectedImage === SPECIAL_IMG) {
      specialVal = -20;
    } else if (selectedImage === SPECIAL_IMG_2) {
      specialVal = 10;
    }
    fillTextToCanvas(value, item, ctx, canvas, isPhone, specialVal);
  };

  const drawDL = (value, item, ctx, canvas, isPhone) => {
    let specialVal = 0;
    if (selectedImage === SPECIAL_IMG) {
      specialVal = -85;
    } else if (selectedImage === SPECIAL_IMG_2) {
      specialVal = 20;
    }
    fillTextToCanvas(value, item, ctx, canvas, isPhone, specialVal);
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
        draw(type, typeCoor, ctx, canvas);
        //Draw price
        draw(price, priceCoor, ctx, canvas);
        //Draw phone number
        draw(phoneNumber, phoneNumberCoor, ctx, canvas, true);
      }
    };

    img.src = image;
  };

  const generateDownloadImg = (image, style, itemPhone, isDownloadAll) => {
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
        drawDL(type, typeCoor, ctx, canvas);
        //Draw price
        drawDL(price, priceCoor, ctx, canvas);
        //Draw phone number
        drawDL(phoneNumber, phoneNumberCoor, ctx, canvas, true);
        // (B3) "FORCE DOWNLOAD"
        if (isDownloadAll) onDownload(isDownloadAll);
      }
    };
    img.src = image;
  };

  const onSelectItem = (item) => {
    setSelectedPhoneItem(item);
  };

  const handleChange = (value) => {
    setSelectedImage(value);
  };

  const onDownload = (isDownloadAll) => {
    const canvas = document.getElementById("canvasDownload");
    if (isDownloadAll) {
      const imageData = canvas.toDataURL("image/png");
      const img = document.createElement("img");
      img.src = imageData;
      listImages.push(img);
      setListImages([...listImages]);
    } else {
      let anchor = document.createElement("a");
      anchor.href = canvas.toDataURL("image/jpeg");
      anchor.download = "image.jpeg";
      anchor.click();
      anchor.remove();
    }
  };

  const onDownloadAll = () => {
    setIsDownload(true);
    setListImages([]);
    const style = textStyle.find((item) => item.type == selectedImage);
    const imageItem = listImage.find((item) => item.type == selectedImage);
    listPhone.forEach((itemPhone) => {
      generateDownloadImg(imageItem.image, style, itemPhone, true);
    });
  };

  const createZip = (images) => {
    const zip = new JSZip();
    setIsDownload(true);
    images.forEach((img, index) => {
      zip.file(`image_${index + 1}.png`, img.currentSrc.split("base64,")[1], {
        base64: true,
      });
    });

    zip.generateAsync({ type: "blob" }).then(function (content) {
      let anchor = document.createElement("a");
      anchor.href = URL.createObjectURL(content);
      anchor.download = "images.zip";
      anchor.click();
      anchor.remove();
    });
  };

  return (
    <div className="App">
      {isDownload && (
        <h1 style={{ display: "block", color: "red" }}>Đang download .....</h1>
      )}

      <input
        id="inputId"
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={handleUpload}
        style={{ margin: "auto" }}
        onClick={(e) => (e.target.value = "")}
      />
      <div className="container">
        <div className="listPhone">
          <p>Danh sách số điện thoại</p>
          <div className="list" id="listTelephone">
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
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <button
              className="btn btn-primary"
              onClick={() => onDownload()}
              style={{ marginTop: "10px" }}
              disabled={listPhone.length === 0}
            >
              Download
            </button>
            <button
              className="btn btn-primary"
              onClick={() => onDownloadAll()}
              style={{ marginTop: "10px" }}
              disabled={listPhone.length === 0}
            >
              Download All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
