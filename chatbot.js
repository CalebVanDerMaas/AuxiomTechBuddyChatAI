document.getElementById('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (!message) return;
    addMessage('user', message);
    messageInput.value = '';
  
    // Call the ChatGPT API
    const response = await fetch("https://protected-meadow-75744-000cbdcc50e5.herokuapp.com/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message: message,
  }),
});

      const data = await response.json();
      console.log(data);
      const chatGPTResponse = data.choices[0].text.trim();
        addMessage('ai', chatGPTResponse);
        });
        
        function addMessage(sender, message) {
        const chatContent = document.getElementById('chat-content');
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatContent.appendChild(messageElement);
        chatContent.scrollTop = chatContent.scrollHeight;
        }

        addMessage('ai', 'Hello! I am Tech Buddy, your friendly IT assistant. How can I help you today?');

        