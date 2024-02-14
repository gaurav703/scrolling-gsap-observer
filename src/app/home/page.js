/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useState } from "react";
import axios from "axios";
import styles from "./home.module.css";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components";
// eslint-disable-next-line @next/next/no-img-element
const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.label`
  display: block;
  margin-bottom: 1em;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 0.2em;
  box-sizing: border-box;
`;

const FileInput = styled.input`
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 0.2em;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 0.7em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default function home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [list, setList] = useState([]);
  const [imagepreview, setImagepreview] = useState([]);
  const [imagepreview1, setImagepreview1] = useState([]);

  const listimage = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users/");
      console.log("response", response);
      console.log("API response list ---- :", response.data.users);
      setList(response.data.users);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error
    }
  };

  useEffect(() => {
    listimage();
  }, []);

  const [formData, setFormData] = useState({
    // Your form fields
    name: "",
    email: "",
    file: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    console.log("image", imagepreview);
    formData.append("images", imagepreview1);
    // for (let i = 0; i < imagepreview.length; i++) {
    //   formData.append("images", imagepreview[i]);
    //   console.warn("imagepreview", imagepreview[i]);
    // }
    console.log(imagepreview.length);
    console.log("formData", formData);

    console.log("name", name);
    console.log("email", email);
    console.log("imagepreview", imagepreview);
    console.log("imagepreview1", imagepreview1);
    console.log("image", image);
    console.log("formData==================", formData);
    console.warn(imagepreview.length);
    try {
      console.log("enter in api ");
      const response = await axios.post(
        "http://localhost:5000/users/multiple/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response", response);
      console.log("API response:", response.data);
      toast.success("Images uploaded successfully");
      setEmail("");
      setName("");
      setImage(null);
      setImagepreview([]);
      listimage();
      // Handle success or redirect as needed
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error uploading images");
      // Handle error
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const files = e.target.files;
    setImage(file);
    setImagepreview1(files);
    // setImagepreview(files);

    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setImagepreview(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    // }

    if (files) {
      const imageArray = [];
      console.warn(files.length);
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();

        reader.onloadend = () => {
          imageArray.push(reader.result);

          if (imageArray.length === files.length) {
            setImagepreview(imageArray);
          }
        };

        reader.readAsDataURL(files[i]);
      }
    }
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          height: "100%",
          width: "100%",
          // backgroundColor:" #ed9999";
          backgroundColor: "#ed9999",
        }}
      >
        <ToastContainer />
        <div>
          <p
            style={{
              color: "white",
              fontSize: "50px",
              textAlign: "center",
              paddingTop: "50px",
            }}
          >
            Admin-Naariveerangana
          </p>
        </div>
        <div className={styles.main_div}>
          <div className={styles.div1}>
            <div
              style={{
                color: "white",
                fontSize: "30px",
                textAlign: "center",
                paddingTop: "50px",
                marginBottom: "50px",
              }}
            >
              Form Upload
            </div>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <span>Name:</span>
                <Input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  // value={formData.name}
                  // onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <span>Email:</span>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // value={formData.email}
                  // onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <span>Image:</span>
                <FileInput
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  //onChange={handleImagePreviewChange}
                />
              </FormGroup>
              {/* {image && (
            <div>
              <img
                src={imagepreview}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </div>
          )} */}
              {imagepreview.length > 0 && (
                <div>
                  {imagepreview.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        style={{ maxWidth: "100%", maxHeight: "200px" }}
                      />
                    </div>
                  ))}
                </div>
              )}
              <SubmitButton type="submit">Submit</SubmitButton>
            </Form>
          </div>
          <div className={styles.div2}>
            <div
              style={{
                color: "white",
                fontSize: "30px",
                textAlign: "center",
                paddingTop: "50px",
                marginBottom: "50px",
              }}
            >
              List of Photo added in databases :
            </div>
            {list
              .slice()
              .reverse()
              .map((item) => {
                return (
                  <>
                    <div key={item._id} className={styles.item}>
                      <div>Name :{item.name}</div>
                      <div>Email : {item.email}</div>
                      <div>Number of images uploaded : {item.files.length}</div>
                      {item.files.map((image, index) => (
                        <div key={index}>
                          <Image
                            // src="https://res.cloudinary.com/dqki29mbg/image/upload/v1705765273/CloudinaryDemo/bdfyfm6isxyntru6sh2o.png"
                            src={image}
                            alt="Cloudinary Demo Image"
                            width={400} // Set the desired width
                            height={400} // Set the desired height
                          />
                        </div>
                      ))}
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
