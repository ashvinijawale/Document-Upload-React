import React, { useState, useRef, useEffect } from 'react';
import './App.css'; 

function Component() {

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileHistoryRef = useRef(null);

  useEffect(() => {
    scrollToTop(); 
  }, [uploadedFiles]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.name.split('.').pop().toLowerCase();
      const allowedFormats = ['doc', 'docx', 'jpg', 'jpeg', 'png', 'pdf', 'mp4', 'mov'];
      if (allowedFormats.includes(fileType)) {
        const newUploadedFiles = [...uploadedFiles, { file: selectedFile, uploadDate: new Date() }];
        setUploadedFiles(newUploadedFiles.sort((a, b) => b.uploadDate - a.uploadDate)); // Sort files in descending order of upload time
        console.log('Selected file:', selectedFile.name);
      } else {
        alert('INVALID FILE FORMAT.');
      }
    }
  };


  const handleDeleteFile = (index) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
  };

  const scrollToTop = () => {
    if (fileHistoryRef.current) {
      fileHistoryRef.current.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (

     <div className="container">
        <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <h2 className="upload-text1">Upload Files</h2>
      <p className="upload-text2">Upload documents you want to share with your team</p>
    
      <div className="file-upload-container">
        <div className="upload-icon-container">
          <img src="https://cdn-icons-png.flaticon.com/128/8317/8317003.png" alt="Upload Icon" className="upload-icon" />
        </div>
        <button className="upload-button">
          Upload File
          <input
            type="file"
            className="file-input"
            onChange={handleFileChange}
            accept=".doc, .docx, .jpg, .jpeg, .png, .pdf, .mp4, .mov" 
          />
          </button>

          <div className="file-history-container" ref={fileHistoryRef}>
          <div className="file-history">
            {uploadedFiles.map((fileObj, index) => (
              <FileEntry key={index} file={fileObj.file} uploadDate={fileObj.uploadDate} onDelete={() => handleDeleteFile(index)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  
  );
}


function FileEntry({ file, uploadDate, onDelete }) {
  const formattedDate = uploadDate.toLocaleString();

  const handleHover = (event) => {
    event.target.classList.toggle('zoom-in-out');
  };



  const svgIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" 
    x="0px" 
    y="0px" 
    width="100" 
    height="100" 
    viewBox="0 0 48 48"
    onClick={onDelete}
    className="logo"
    onMouseEnter={handleHover}
    onMouseLeave={handleHover}
    >
    <linearGradient id="Z1feGKk0fhwRayMlCOG9Ha_heybTkWFZ8KQ_gr1" x1="-9.533" x2="67.842" y1="46.516" y2="1.843" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#262626" stop-opacity="0"></stop><stop offset="1" stop-color="#262626" stop-opacity=".8"></stop></linearGradient><path fill="url(#Z1feGKk0fhwRayMlCOG9Ha_heybTkWFZ8KQ_gr1)" d="M39,11.87V40c0,2.21-1.79,4-4,4H9V12h29C38.35,12,38.68,11.96,39,11.87z"></path><linearGradient id="Z1feGKk0fhwRayMlCOG9Hb_heybTkWFZ8KQ_gr2" x1="24" x2="24" y1="-19.323" y2="10.755" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#262626" stop-opacity="0"></stop><stop offset="1" stop-color="#262626" stop-opacity=".8"></stop></linearGradient><path fill="url(#Z1feGKk0fhwRayMlCOG9Hb_heybTkWFZ8KQ_gr2)" d="M30,7H18V5c0-1.657,1.343-3,3-3h9V7z"></path><linearGradient id="Z1feGKk0fhwRayMlCOG9Hc_heybTkWFZ8KQ_gr3" x1="24" x2="24" y1=".595" y2="59.394" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#262626" stop-opacity="0"></stop><stop offset="1" stop-color="#262626" stop-opacity=".8"></stop></linearGradient><path fill="url(#Z1feGKk0fhwRayMlCOG9Hc_heybTkWFZ8KQ_gr3)" d="M26,40h-4V18c0-1.105,0.895-2,2-2h0c1.105,0,2,0.895,2,2V40z M34,18c0-1.105-0.895-2-2-2h0	c-1.105,0-2,0.895-2,2v22h4V18z M18,18c0-1.105-0.895-2-2-2h0c-1.105,0-2,0.895-2,2v22h4V18z"></path><linearGradient id="Z1feGKk0fhwRayMlCOG9Hd_heybTkWFZ8KQ_gr4" x1="-2.683" x2="35.509" y1="-36.716" y2="29.435" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#262626" stop-opacity="0"></stop><stop offset="1" stop-color="#262626" stop-opacity=".8"></stop></linearGradient><path fill="url(#Z1feGKk0fhwRayMlCOG9Hd_heybTkWFZ8KQ_gr4)" d="M38,12H6v-1c0-2.209,1.791-4,4-4h32v1C42,10.209,40.209,12,38,12z"></path>
    </svg>
      
  );

  return (
    <div className="file-entry">
      <div className="file-info">
        <p>{file.name}</p>
        <p className="file-date">{formattedDate}</p>
      </div>
      {svgIcon}
    </div>
  );
}

  
function RatingPopup({ onClose }) {
  const [rating, setRating] = useState(0); //store the rating

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    onClose();
  };

  return (
    <div className="rating-popup">
      <h2>How would you rate your <br /> <span style={{display: 'block', textAlign: 'center'}}>today's experience?</span></h2>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={value}>
            <input
              type="radio"
              name="rating"
              value={value}
              onClick={() => handleRatingChange(value)}
            />
            <span className={value <= rating ? 'checked' : ''}>&#9733;</span>
          </label>
        ))}
      </div>
      <div className="submit-button-container">
      <button className="submit-button" onClick={ handleSubmit }>Submit</button>
    </div>
    </div>
    
  );
}




function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMessageChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const userMessage = {
        text: inputValue,
        sender: 'user',
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, userMessage]);
      setInputValue('');
      setTimeout(() => {
        const botResponse = {
          text: 'Bot Response.',
          sender: 'bot',
          time: new Date().toLocaleTimeString(),
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 500);
    }
  };

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessages([]);
      setTimeout(() => {
        setShowWelcomeMessage(true);
      }, 1000);
    } else {
      setShowWelcomeMessage(false);
      setShowRatingPopup(true);
    }
  };

  const handleRatingPopupClose = () => {
    setShowRatingPopup(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };
  

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-popup">
          <div className="chatbot-window" ref={chatWindowRef}>
            {showWelcomeMessage && (
              <div className={`welcome-message ${showWelcomeMessage ? 'show' : ''}`}>
                <h2>Got a question? We would love to help you! 😊</h2>
              </div>
            )}
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <div className="message-content">
                  {message.sender === 'user' ? (
                    <div className="user-message">
                      <div className="user-message-content">{message.text}</div>
                      <div className="user-message-time">{message.time}</div> 
                    </div>
                  ) : (
                    <div className="bot-response">
                      <div className="bot-content">
                        <div className="bot-icon">
                          <img src="https://img.icons8.com/?size=96&id=F2amVDi05OBH&format=png" alt="Bot Logo" className="bot-logo" />
                        </div>
                        <div className="bot-message-container">
                          <div className="bot-message">{message.text}</div>
                          <div className="bot-message-time">{message.time}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Write your message..."
              value={inputValue}
              onChange={handleMessageChange}
              onKeyDown={handleKeyDown}
              
            />
            <img
              src="https://img.icons8.com/?size=48&id=Ug0YPkqaeYdy&format=png"
              alt="Send Icon"
              className={`send-icon zoom-effect`}
              onClick={handleSendMessage}
            />
          </div>
        </div>
      )}
      <div className={`chatbot-icon ${isOpen ? 'open' : 'closed'}`} onClick={toggleChatWindow}>
        {isOpen ? (
          <img src="https://img.icons8.com/?size=96&id=Ul3IIMUVd9LI&format=png" alt="Close Icon" className="icon-img1" />
        ) : (
          <img src="https://img.icons8.com/?size=96&id=UPjJcVmtL2es&format=png" alt="Open Icon" className="icon-img2" />
        )}
      </div>
      {showRatingPopup && <RatingPopup onClose={handleRatingPopupClose} />}
    </div>
  );
}


export { Component, FileEntry, RatingPopup, Chatbot };
