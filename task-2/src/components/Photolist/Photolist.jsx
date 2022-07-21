import React, { useEffect, useState } from "react";
import cl from "./Photolist.module.css";
import f1 from "../../images/1.jpg";
import f2 from "../../images/2.jpg";
import f3 from "../../images/3.jpg";
import f4 from "../../images/4.jpg";
import f5 from "../../images/5.jpg";
import f6 from "../../images/6.jpg";
import f7 from "../../images/7.jpg";
import f8 from "../../images/8.jpg";
import f9 from "../../images/9.jpg";
import f10 from "../../images/10.jpg";
import f11 from "../../images/11.jpg";
import f12 from "../../images/12.jpg";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

const Photolist = () => {
  let removedImages = JSON.parse(localStorage.getItem("removed")) || [];
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState("");
  const allImages = [
    { image: f1, id: 1 },
    { image: f2, id: 2 },
    { image: f3, id: 3 },
    { image: f4, id: 4 },
    { image: f5, id: 5 },
    { image: f6, id: 6 },
    { image: f7, id: 7 },
    { image: f8, id: 8 },
    { image: f9, id: 9 },
    { image: f10, id: 10 },
    { image: f11, id: 11 },
    { image: f12, id: 12 },
  ];

  useEffect(() => {
    let interval = setInterval(changeTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const changeTime = () => {
    let currentDate = new Date();
    setDate(
      `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`
    );
  };

  useEffect(() => {
    if (removedImages.length > 0) {
      setImages([...allImages.filter(checkImage)]);
    } else {
      setImages(allImages);
    }
  }, []);

  const checkImage = (value) => {
    let isExist = false;
    for (let i = 0; i < removedImages.length; i++) {
      if (value.id === removedImages[i]) {
        isExist = true;
      }
    }
    if (!isExist) {
      return value;
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const removeImage = (img) => {
    removedImages.push(img.id);
    localStorage.setItem("removed", JSON.stringify(removedImages));
    setImages([...images.filter((image) => image !== img)]);
  };

  return (
    <div>
      <div className={cl.header}>
        <p>
          Image count: {images.length}, Date: {date}
        </p>
      </div>
      <div className={cl.container}>
        {images.map((image, index) => (
          <div className={cl.image_content} key={index}>
            <div
              className={cl.image}
              onClick={() => {
                setSelectedImage(image);
                setModalVisible(true);
              }}
            >
              <img src={image.image} alt="" />
            </div>
            <p
              className={cl.closeBtn}
              onClick={() => {
                removeImage(image);
              }}
            >
              &#10006;
            </p>
          </div>
        ))}
      </div>
      <div className={cl.footer}>
        <Button
          onClick={() => {
            localStorage.removeItem("removed");
            setImages([...allImages]);
          }}
        >
          Reset
        </Button>
      </div>
      <Modal close={closeModal} visible={modalVisible}>
        {selectedImage ? selectedImage.image : ""}
      </Modal>
    </div>
  );
};

export default Photolist;
