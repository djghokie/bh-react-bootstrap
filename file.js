import React from "react";

import {
    Button,
    Row, Col
} from "reactstrap";

import { IconButton } from "./button";

// import defaultImage from "assets/img/image_placeholder.jpg";
// import defaultAvatar from "assets/img/placeholder.jpg";

/**
 * WIP: copied directly from theme and not refactored
 */
export function ImageUpload({
        avatar,
        addBtnColor,
        addBtnClasses,
        changeBtnColor,
        changeBtnClasses,
        removeBtnColor,
        removeBtnClasses
    }) {

  const [file, setFile] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    avatar ? defaultAvatar : defaultImage
  );
  const fileInput = React.useRef(null);
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  // eslint-disable-next-line
  const handleSubmit = (e) => {
    e.preventDefault();
    // file is the file/image uploaded
    // in this function you can save the image (file) on form submit
    // you have to call it yourself
  };
  const handleClick = () => {
    fileInput.current.click();
  };
  const handleRemove = () => {
    setFile(null);
    setImagePreviewUrl(avatar ? defaultAvatar : defaultImage);
    fileInput.current.value = null;
  };
  return (
    <div className="fileinput text-center">
      <input type="file" onChange={handleImageChange} ref={fileInput} />
      <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
        <img src={imagePreviewUrl} alt="..." />
      </div>
      <div>
        {file === null ? (
          <Button
            color={addBtnColor}
            className={addBtnClasses}
            onClick={() => handleClick()}
          >
            {avatar ? "Add Photo" : "Select image"}
          </Button>
        ) : (
          <span>
            <Button
              color={changeBtnColor}
              className={changeBtnClasses}
              onClick={() => handleClick()}
            >
              Change
            </Button>
            {avatar ? <br /> : null}
            <Button
              color={removeBtnColor}
              className={removeBtnClasses}
              onClick={() => handleRemove()}
            >
              <i className="fa fa-times" /> Remove
            </Button>
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * WIP: this hasn't yet been tested
 */
export function FileUpload({ onUpload }) {
    const [file, setFile] = React.useState();
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState();

    const fileInput = React.useRef(null);

    function onFileSelect(e) {
        e.preventDefault();

        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setFile(file);
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    }

	function handleUpload(e) {
		e.preventDefault();

		let fd = new FormData();
		fd.append('file', file);

		onUpload(fd);
	}

    return (
        <div>
          <Row>
            <Col lg={6} className="fileinput text-center">
              <input type="file" onChange={onFileSelect} ref={fileInput} />
              <p className="my-3">
                <i className={file ? "fa-4x fas fa-file-import" : "fa-4x fas fa-file-circle-question"}></i>
              </p>
              <div className="d-flex justify-content-center">
                <IconButton id="changefile" icon="fas fa-laptop-file" color={file ? "success" : "primary"}
                    tooltip={file ? 'Change file' : 'Select file'}
                    onClick={z => fileInput.current.click()}
                    />
                <IconButton id="uploadfile" icon="fas fa-file-arrow-up" color={file ? "primary" : "secondary"}
                    tooltip="Upload file"
                    onClick={handleUpload}
                    />
                <IconButton id="remove" icon="fas fa-xmark" color="danger"
                    disabled={!file}
                    tooltip="Remove"
                    onClick={z => setFile()}
                    />
              </div>
            </Col>
            <Col lg={6} className="small text-white">
              <dl>
                <dt className="col-sm-4">Name</dt>
			    <dd className="col-sm-8">{file && file.name}</dd>
                <dt className="col-sm-4">Type</dt>
			    <dd className="col-sm-8">{file && file.type}</dd>
                <dt className="col-sm-4">Size</dt>
			    <dd className="col-sm-8">{file && file.size}</dd>
                <dt className="col-sm-4">Last Modified</dt>
			    <dd className="col-sm-8">{file && new Date(file.lastModified).toLocaleString()}</dd>
              </dl>
            </Col>
          </Row>
        </div>
    )
}