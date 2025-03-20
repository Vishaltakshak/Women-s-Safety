import React, { useState } from "react";
import { Send } from "lucide-react";
import Header from "../Components/Header";

const AlertContactsPage = () => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Sample contacts array
  const contacts = [
    { id: 1, name: "John Doe", phone: "+1234567890" },
    { id: 2, name: "Jane Smith", phone: "+0987654321" },
    { id: 3, name: "Alice Brown", phone: "+1122334455" }
  ];

  // Handle message input
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle sending the alert
  const handleSendAlert = async () => {
    if (!message.trim()) {
      alert("Please enter a message before sending.");
      return;
    }

    setSending(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      contacts.forEach((contact) => {
        console.log(`Alert sent to ${contact.name} (${contact.phone}): ${message}`);
      });

      setShowSuccess(true);
      setMessage("");
      setTimeout(() => setShowSuccess(false), 3000);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Alert Contacts</h1>

          {showSuccess && (
            <div className="mb-6 p-3 bg-green-100 text-green-700 rounded-lg text-center text-sm">
              Alert sent successfully to all contacts!
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              Alert Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={handleMessageChange}
              placeholder="Enter your alert message here"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              rows="5"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-3">Contacts:</h2>
            <ul className="space-y-3 bg-gray-50 p-4 rounded-lg">
              {contacts.map((contact) => (
                <li key={contact.id} className="flex items-center justify-between text-gray-800 p-2 hover:bg-white rounded transition-colors duration-150">
                  <span className="font-medium">{contact.name}</span>
                  <span className="text-gray-600 text-sm">{contact.phone}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleSendAlert}
            disabled={sending || !message.trim()}
            className={`w-full flex items-center justify-center px-4 py-3 rounded-lg ${
              sending || !message.trim()
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-medium transition-colors duration-150`}
          >
            {sending ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Sending...
              </div>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Alert
              </>
            )}
          </button>
        </div>
      </main>

      <footer className="bg-gray-900 text-white mt-auto py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 SafeGuard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AlertContactsPage;