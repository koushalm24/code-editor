import React, { useRef, useState } from 'react'

function Main() {
    const iframeRef = useRef(null);
    const [message, setMessage] = useState('');



    const handleKey = (e) => {
        const iframeWindow = iframeRef.current.contentWindow;
        let htmlCode = document.getElementById('htmlTab').value;
        let cssCode = document.getElementById('cssTab').value;
        let jsCode = document.getElementById('jsTab').value;


        setMessage(htmlCode + "<style>" + cssCode + "</style>");
        if (iframeWindow) {
            try {
                // Execute JavaScript code in the iframe's content window
                iframeWindow.eval(jsCode);
            } catch (error) {
                console.error('Error executing code in iframe:', error);
            }
        } else {
            console.error('Iframe contentWindow is not accessible.');
        }
    }
    return (
        <div className='main'>
            <h1>Code Editor</h1>
            <div className="framework">
            <div className="left">
                <div>
                    <label htmlFor="htmlTab"><i class="fa-brands fa-html5"></i>HTML</label>
                    <textarea className='textArea' type="text" id='htmlTab' onKeyUp={handleKey}></textarea>
                </div>
                <div>
                    <label htmlFor="cssTab"><i class="fa-brands fa-css3-alt"></i>CSS</label>
                    <textarea className='textArea' type="text" id='cssTab' onKeyUp={handleKey}></textarea>
                </div>
                <div>
                    <label htmlFor="jsTab"><i class="fa-brands fa-js"></i>JS</label>
                    <textarea className='textArea' type="text" id='jsTab' onKeyUp={handleKey}></textarea>
                </div>
            </div>
            <div className="right">

                <div>
                    <label htmlFor=""><i class="fa-solid fa-play"></i>Output</label>
                    <iframe ref={iframeRef}
                        title='Output'
                        id="outputTab"
                        srcDoc={message}></iframe>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Main
