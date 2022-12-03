import React, { useRef, useEffect } from "react";
import axios from "axios";

export default function Gallery(props) {
  const [imgUrls, setImgUrls] = React.useState([]);

  function preventPageScroll(e) {
    e.preventDefault();
  }
  const imageBox = useRef(null);
  useEffect(() => {
    const element = imageBox.current;

    element.addEventListener("mouseover", function (e) {
      element.addEventListener("wheel", function (e) {
        if (e.deltaY > 0) element.scrollLeft += 100;
        else element.scrollLeft -= 100;
      });

      props.home.current.addEventListener("wheel", preventPageScroll);
    });

    element.addEventListener("mouseleave", function (e) {
      props.home.current.removeEventListener("wheel", preventPageScroll);
    });
  }, []);

  function galleryFetch() {
    axios.get("https://api.trello.com/1/lists/6388e4b5f0c86d00297821b7/cards?attachments=true").then((response) => {
      console.log(response.data);
      response.data[0].attachments.map((attachment) => {
        setImgUrls((prev) => [...prev, attachment.url]);
      });
    });
  }
  useEffect(() => {
    galleryFetch();
    let inverted = imgUrls.reverse();
    setImgUrls(inverted);
    console.log(imgUrls);
  }, []);

  return (
    <div style={{ display: "flex", width: "100%", height: "100%", overflowX: "auto" }} ref={imageBox}>
      {imgUrls.map((url) => (
        <div style={{ background: "linear-gradient(180deg, rgba(9, 1, 59, 1) 51%, rgba(54, 36, 98, 1) 100%)", marginInline: "1vw", borderRadius: "12px" }}>
          <img
            key={url}
            src={url}
            style={{
              height: "100%",
              objectFit: "contain",
              borderRadius: "12px",
            }}
          />
        </div>
      ))}
    </div>
  );
}
