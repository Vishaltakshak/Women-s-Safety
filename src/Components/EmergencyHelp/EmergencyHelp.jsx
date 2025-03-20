// import React, { useEffect, useState } from "react";
// import { AlertCircle, Mic, Volume2 } from "lucide-react";

// const EmergencyButton = ({ onActivate }) => {
//   const [isPressed, setIsPressed] = useState(false);

//   const handlePress = () => {
//     setIsPressed(true);
//     onActivate();
//   };

//   return (
//     <button
//       onClick={handlePress}
//       className={`w-48 h-48 rounded-full ${
//         isPressed ? "bg-red-700" : "bg-red-600"
//       } text-white font-bold transform transition-transform duration-200 ${
//         isPressed ? "scale-95" : "hover:scale-105"
//       } flex flex-col items-center justify-center shadow-lg hover:shadow-xl`}
//     >
//       <AlertCircle className="h-16 w-16 mb-2" />
//       <span className="text-xl">EMERGENCY</span>
//       <span className="text-sm mt-1">Press for Help</span>
//     </button>
//   );
// };

// const EmergencyPage = () => {
//   const [isMicActive, setIsMicActive] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const [distressDetected, setDistressDetected] = useState(false);
//   const [recognition, setRecognition] = useState(null);
  
//   // Enhanced distress keywords including Hindi words
//   const distressKeywords = [
//     "help", "stop", "danger", "no", "leave me alone", "scared", "afraid",
//     "मदद", "बचाओ", "रुको", "नहीं", "छोड़ो", "डर", "भयभीत"
//   ];

//   useEffect(() => {
//     // Initialize speech recognition
//     if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
//       alert('Speech recognition is not supported in your browser.');
//       return;
//     }
    
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognitionInstance = new SpeechRecognition();
    
//     // Configure recognition
//     recognitionInstance.continuous = true;
//     recognitionInstance.interimResults = true;
//     recognitionInstance.lang = 'en-IN'; // English (India)
//     recognitionInstance.maxAlternatives = 3; // Get multiple alternatives for noisy environments
    
//     // Handle recognition results
//     recognitionInstance.onresult = (event) => {
//       let currentTranscript = '';
      
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         if (event.results[i].isFinal) {
//           currentTranscript += event.results[i][0].transcript + ' ';
//         }
//       }
      
//       if (currentTranscript) {
//         setTranscript(prev => {
//           const newTranscript = prev + currentTranscript;
//           checkForDistress(newTranscript);
//           return newTranscript;
//         });
//       }
//     };
    
//     // Handle errors - important for noisy environments
//     recognitionInstance.onerror = (event) => {
//       console.error('Speech recognition error:', event.error);
      
//       // For no-speech errors, restart recognition to handle noisy environments
//       if (event.error === 'no-speech' && isMicActive) {
//         recognitionInstance.stop();
//         setTimeout(() => {
//           if (isMicActive) recognitionInstance.start();
//         }, 100);
//       }
//     };
    
//     // Automatically restart recognition if it ends but is still active
//     recognitionInstance.onend = () => {
//       if (isMicActive) {
//         recognitionInstance.start();
//       }
//     };
    
//     setRecognition(recognitionInstance);
    
//     return () => {
//       if (recognitionInstance) {
//         recognitionInstance.stop();
//       }
//     };
//   }, [isMicActive]);

//   const startListening = () => {
//     setIsMicActive(true);
//     setTranscript("");
//     setDistressDetected(false);
    
//     if (recognition) {
//       recognition.start();
//     }
//   };

//   const stopListening = () => {
//     setIsMicActive(false);
    
//     if (recognition) {
//       recognition.stop();
//     }
//   };

//   const checkForDistress = (text) => {
//     if (!text) return;
    
//     const textLower = text.toLowerCase();
    
//     // Check for individual keywords
//     const foundKeywords = distressKeywords.filter(keyword => 
//       textLower.includes(keyword.toLowerCase())
//     );
    
//     // Check for distress patterns
//     const distressPatterns = [
//       /help\s*me/i,
//       /stop\s*(?:it|that)/i,
//       /leave\s*me\s*alone/i,
//       /get\s*away/i,
//       /मदद\s*करो/i,
//       /बचाओ/i,
//       /छोड़\s*दो/i
//     ];
    
//     const patternMatch = distressPatterns.some(pattern => pattern.test(textLower));
    
//     // Determine confidence level based on number of matches
//     const confidenceScore = foundKeywords.length * 0.2 + (patternMatch ? 0.5 : 0);
    
//     if (foundKeywords.length > 0 || patternMatch) {
//       console.log("Potential distress detected:", {
//         keywords: foundKeywords,
//         patternMatch,
//         confidenceScore
//       });
      
//       // Only alert if we have high confidence or multiple matches
//       if (confidenceScore > 0.3 && !distressDetected) {
//         setDistressDetected(true);
//         triggerSafetyResponse(text, foundKeywords);
//       }
//     }
//   };
  
//   const triggerSafetyResponse = (text, keywords) => {
//     // Alert UI for demonstration
//     alert(`Distress detected! Keywords: ${keywords.join(', ')}. Triggering safety response...`);
    
//     // Here you would typically:
//     // 1. Send an alert to your backend
//     // 2. Notify emergency contacts
//     // 3. Share location if available
    
//     // Example of sending to backend (replace with actual implementation)
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const alertData = {
//             transcript: text,
//             keywords: keywords,
//             location: {
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude
//             },
//             timestamp: new Date().toISOString()
//           };
          
//           // Send data to your backend
//           console.log("Sending alert data:", alertData);
//           // fetch('/api/emergency-alert', {
//           //   method: 'POST',
//           //   headers: { 'Content-Type': 'application/json' },
//           //   body: JSON.stringify(alertData)
//           // });
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           // Send alert without location
//           const alertData = {
//             transcript: text,
//             keywords: keywords,
//             timestamp: new Date().toISOString()
//           };
          
//           console.log("Sending alert data without location:", alertData);
//           // fetch('/api/emergency-alert', {...});
//         }
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <main className="flex-grow container mx-auto px-4 py-8">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Help</h1>
//           <p className="text-gray-600">Press the button below for immediate assistance</p>
//         </div>

//         <div className="flex justify-center mb-8">
//           <EmergencyButton onActivate={startListening} />
//         </div>

//         {/* Microphone Status */}
//         <div className={`max-w-md mx-auto mt-4 p-3 rounded-lg flex items-center ${
//           isMicActive ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-500"
//         }`}>
//           <Mic className={`h-5 w-5 mr-2 ${isMicActive ? "animate-pulse text-red-600" : ""}`} />
//           <span className="font-medium">{isMicActive ? "Microphone is active and listening" : "Microphone is inactive"}</span>
//           {isMicActive && (
//             <button onClick={stopListening} className="ml-auto bg-red-600 text-white px-2 py-1 rounded text-sm">
//               Stop
//             </button>
//           )}
//         </div>

//         {/* Distress Alert Banner */}
//         {distressDetected && (
//           <div className="max-w-md mx-auto mt-4 p-3 rounded-lg bg-red-100 border border-red-300 text-red-700 flex items-center">
//             <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
//             <span className="font-medium">Distress detected! Safety response triggered.</span>
//           </div>
//         )}

//         {/* Transcription */}
//         <div className="max-w-md mx-auto mt-4 p-4 bg-white rounded-lg shadow">
//           <h3 className="font-medium mb-2 flex items-center">
//             <Volume2 className="h-4 w-4 mr-2" /> Detected Speech:
//           </h3>
//           <div className="bg-gray-50 p-3 rounded min-h-16 border border-gray-200">
//             {transcript ? <p className="text-gray-700">{transcript}</p> : <p className="text-gray-400 italic">Waiting for speech...</p>}
//           </div>
//           {transcript && (
//             <button 
//               onClick={() => setTranscript("")} 
//               className="mt-2 text-sm text-gray-500 hover:text-gray-700"
//             >
//               Clear transcript
//             </button>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default EmergencyPage;



import React, { useEffect, useState, useRef } from "react";
import { AlertCircle, Mic, Volume2, WifiOff } from "lucide-react";

const EmergencyButton = ({ onActivate }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    onActivate();
  };

  return (
    <button
      onClick={handlePress}
      className={`w-48 h-48 rounded-full ${
        isPressed ? "bg-red-700" : "bg-red-600"
      } text-white font-bold transform transition-transform duration-200 ${
        isPressed ? "scale-95" : "hover:scale-105"
      } flex flex-col items-center justify-center shadow-lg hover:shadow-xl`}
    >
      <AlertCircle className="h-16 w-16 mb-2" />
      <span className="text-xl">EMERGENCY</span>
      <span className="text-sm mt-1">Press for Help</span>
    </button>
  );
};

const EmergencyPage = () => {
  const [isMicActive, setIsMicActive] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [distressDetected, setDistressDetected] = useState(false);
  const [recognitionError, setRecognitionError] = useState(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  
  const recognitionRef = useRef(null);
  const reconnectTimerRef = useRef(null);
  
  // Enhanced distress keywords including Hindi words
  const distressKeywords = [
    "help", "stop", "danger", "no", "leave me alone", "scared", "afraid",
    "मदद", "बचाओ", "रुको", "नहीं", "छोड़ो", "डर", "भयभीत"
  ];

  // Function to initialize speech recognition
  const initSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setRecognitionError("Speech recognition is not supported in your browser.");
      return false;
    }
    
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      // Configure recognition
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-IN'; // English (India)
      recognitionInstance.maxAlternatives = 3; // Get multiple alternatives for noisy environments
      
      // Handle recognition results
      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        let currentInterimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            currentInterimTranscript += transcript;
          }
        }
        
        // Update interim transcript for live feedback
        setInterimTranscript(currentInterimTranscript);
        
        // Update final transcript when available
        if (finalTranscript) {
          setTranscript(prev => {
            const newTranscript = prev + finalTranscript;
            checkForDistress(newTranscript);
            return newTranscript;
          });
        }
        
        // Clear error state if we're getting results
        if (recognitionError) {
          setRecognitionError(null);
          setReconnectAttempts(0);
        }
      };
      
      // Handle errors
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        
        if (event.error === 'network') {
          setRecognitionError("Network error. Check your internet connection.");
          
          // Attempt to reconnect with increasing delay
          const delay = Math.min(2000 * (reconnectAttempts + 1), 10000);
          
          if (reconnectTimerRef.current) {
            clearTimeout(reconnectTimerRef.current);
          }
          
          if (reconnectAttempts < 5 && isMicActive) {
            setRecognitionError(`Network error. Reconnecting in ${delay/1000} seconds...`);
            
            reconnectTimerRef.current = setTimeout(() => {
              setReconnectAttempts(prev => prev + 1);
              
              try {
                recognitionInstance.stop();
              } catch (err) {
                console.log("Error stopping during reconnect:", err);
              }
              
              setTimeout(() => {
                if (isMicActive) {
                  try {
                    recognitionInstance.start();
                    setRecognitionError("Reconnecting...");
                  } catch (err) {
                    console.error("Error restarting recognition:", err);
                    setRecognitionError("Failed to reconnect. Please try again.");
                  }
                }
              }, 100);
              
            }, delay);
          }
        } else if (event.error === 'no-speech') {
          // For no-speech errors in noisy environments, just restart
          if (isMicActive) {
            try {
              recognitionInstance.stop();
              setTimeout(() => {
                if (isMicActive) {
                  recognitionInstance.start();
                }
              }, 100);
            } catch (err) {
              console.error("Error during no-speech recovery:", err);
            }
          }
        } else if (event.error === 'aborted' || event.error === 'audio-capture') {
          setRecognitionError(`Microphone error: ${event.error}. Please check your microphone.`);
        } else {
          setRecognitionError(`Recognition error: ${event.error}`);
        }
      };
      
      // Automatically restart recognition if it ends but is still active
      recognitionInstance.onend = () => {
        console.log("Recognition ended, active:", isMicActive);
        
        if (isMicActive && !recognitionError) {
          try {
            recognitionInstance.start();
            console.log("Restarted recognition");
          } catch (err) {
            console.error("Error restarting recognition:", err);
            setRecognitionError("Failed to restart speech recognition.");
          }
        }
      };
      
      recognitionRef.current = recognitionInstance;
      return true;
      
    } catch (err) {
      console.error("Error initializing speech recognition:", err);
      setRecognitionError("Failed to initialize speech recognition.");
      return false;
    }
  };

  useEffect(() => {
    // Initialize speech recognition
    const success = initSpeechRecognition();
    
    // Cleanup on component unmount
    return () => {
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }
      
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          console.error("Error stopping recognition during cleanup:", err);
        }
      }
    };
  }, [reconnectAttempts]);

  const startListening = () => {
    // Reset states
    setIsMicActive(true);
    setTranscript("");
    setInterimTranscript("");
    setDistressDetected(false);
    setRecognitionError(null);
    setReconnectAttempts(0);
    
    // If recognition isn't initialized, try to initialize it
    if (!recognitionRef.current) {
      const success = initSpeechRecognition();
      if (!success) return;
    }
    
    // Start recognition
    try {
      recognitionRef.current.start();
    } catch (err) {
      console.error("Error starting recognition:", err);
      
      // If already started, stop and restart
      if (err.message && err.message.includes('already started')) {
        try {
          recognitionRef.current.stop();
          setTimeout(() => {
            recognitionRef.current.start();
          }, 100);
        } catch (stopErr) {
          console.error("Error stopping already started recognition:", stopErr);
          setRecognitionError("Error managing speech recognition. Please refresh the page.");
        }
      } else {
        setRecognitionError("Failed to start speech recognition.");
      }
    }
  };

  const stopListening = () => {
    setIsMicActive(false);
    setInterimTranscript("");
    setRecognitionError(null);
    
    // Clear any reconnect timers
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
    }
    
    // Stop recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error("Error stopping recognition:", err);
      }
    }
  };

  const restartRecognition = () => {
    stopListening();
    setTimeout(() => {
      startListening();
    }, 500);
  };

  const checkForDistress = (text) => {
    if (!text) return;
    
    const textLower = text.toLowerCase();
    
    // Check for individual keywords
    const foundKeywords = distressKeywords.filter(keyword => 
      textLower.includes(keyword.toLowerCase())
    );
    
    // Check for distress patterns
    const distressPatterns = [
      /help\s*me/i,
      /stop\s*(?:it|that)/i,
      /leave\s*me\s*alone/i,
      /get\s*away/i,
      /मदद\s*करो/i,
      /बचाओ/i,
      /छोड़\s*दो/i
    ];
    
    const patternMatch = distressPatterns.some(pattern => pattern.test(textLower));
    
    // Determine confidence level based on number of matches
    const confidenceScore = foundKeywords.length * 0.2 + (patternMatch ? 0.5 : 0);
    
    if (foundKeywords.length > 0 || patternMatch) {
      console.log("Potential distress detected:", {
        keywords: foundKeywords,
        patternMatch,
        confidenceScore
      });
      
      // Only alert if we have high confidence or multiple matches
      if (confidenceScore > 0.3 && !distressDetected) {
        setDistressDetected(true);
        triggerSafetyResponse(text, foundKeywords);
      }
    }
  };
  
  const triggerSafetyResponse = (text, keywords) => {
    // Alert UI for demonstration
    alert(`Distress detected! Keywords: ${keywords.join(', ')}. Triggering safety response...`);
    
    // Here you would typically:
    // 1. Send an alert to your backend
    // 2. Notify emergency contacts
    // 3. Share location if available
    
    // Example of sending to backend (replace with actual implementation)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const alertData = {
            transcript: text,
            keywords: keywords,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            timestamp: new Date().toISOString()
          };
          
          // Send data to your backend
          console.log("Sending alert data:", alertData);
          // fetch('/api/emergency-alert', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(alertData)
          // });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Send alert without location
          const alertData = {
            transcript: text,
            keywords: keywords,
            timestamp: new Date().toISOString()
          };
          
          console.log("Sending alert data without location:", alertData);
          // fetch('/api/emergency-alert', {...});
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Help</h1>
          <p className="text-gray-600">Press the button below for immediate assistance</p>
        </div>

        <div className="flex justify-center mb-8">
          <EmergencyButton onActivate={startListening} />
        </div>

        {/* Microphone Status */}
        <div className={`max-w-md mx-auto mt-4 p-3 rounded-lg flex items-center ${
          isMicActive 
            ? recognitionError 
              ? "bg-yellow-100 text-yellow-700" 
              : "bg-red-100 text-red-700" 
            : "bg-gray-100 text-gray-500"
        }`}>
          <Mic className={`h-5 w-5 mr-2 ${isMicActive && !recognitionError ? "animate-pulse text-red-600" : ""}`} />
          <span className="font-medium">
            {isMicActive 
              ? recognitionError 
                ? "Microphone issue detected" 
                : "Microphone is active and listening" 
              : "Microphone is inactive"}
          </span>
          {isMicActive && (
            <button onClick={stopListening} className="ml-auto bg-red-600 text-white px-2 py-1 rounded text-sm">
              Stop
            </button>
          )}
        </div>

        {/* Error Messages */}
        {recognitionError && (
          <div className="max-w-md mx-auto mt-4 p-3 rounded-lg bg-yellow-50 border border-yellow-300 text-yellow-800 flex items-center">
            <WifiOff className="h-5 w-5 mr-2 text-yellow-600" />
            <div className="flex-grow">
              <span className="font-medium">{recognitionError}</span>
            </div>
            <button 
              onClick={restartRecognition} 
              className="ml-2 bg-yellow-600 text-white px-2 py-1 rounded text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {/* Live Speech Feedback */}
        {isMicActive && !recognitionError && (
          <div className="max-w-md mx-auto mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
            <h3 className="font-medium mb-1 flex items-center text-blue-700">
              <Volume2 className="h-4 w-4 mr-2" /> Currently hearing:
            </h3>
            <div className="bg-white p-2 rounded border border-blue-100 min-h-8">
              {interimTranscript ? (
                <p className="text-blue-700">{interimTranscript}</p>
              ) : (
                <p className="text-gray-400 italic">Waiting for speech...</p>
              )}
            </div>
          </div>
        )}

        {/* Distress Alert Banner */}
        {distressDetected && (
          <div className="max-w-md mx-auto mt-4 p-3 rounded-lg bg-red-100 border border-red-300 text-red-700 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
            <span className="font-medium">Distress detected! Safety response triggered.</span>
          </div>
        )}

        {/* Final Transcription */}
        <div className="max-w-md mx-auto mt-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium mb-2 flex items-center">
            <Volume2 className="h-4 w-4 mr-2" /> Recorded Speech:
          </h3>
          <div className="bg-gray-50 p-3 rounded min-h-16 border border-gray-200">
            {transcript ? <p className="text-gray-700">{transcript}</p> : <p className="text-gray-400 italic">No speech recorded yet...</p>}
          </div>
          {transcript && (
            <button 
              onClick={() => setTranscript("")} 
              className="mt-2 text-sm text-gray-500 hover:text-gray-700"
            >
              Clear transcript
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default EmergencyPage;