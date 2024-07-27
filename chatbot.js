document.getElementById('chat-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();
  if (!message) return;
  addMessage('user', message);
  messageInput.value = '';

  try {
    const response = await fetch("https://protected-meadow-75744-000cbdcc50e5.herokuapp.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let aiMessage = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data:')) {
          const data = JSON.parse(line.slice(5));
          if (data.status) {
            console.log('Status:', data.status);
          } else if (data.message) {
            aiMessage = data.message;
            updateAIMessage(aiMessage);
          }
        }
      }
    }

    if (aiMessage) {
      addMessage('ai', aiMessage);
    }
  } catch (error) {
    console.error('Error:', error);
    addMessage('ai', 'Sorry, I encountered an error. Please try again later.');
  }
});

function addMessage(sender, message) {
  const chatContent = document.getElementById('chat-content');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.textContent = message;
  chatContent.appendChild(messageElement);
  chatContent.scrollTop = chatContent.scrollHeight;
}

function updateAIMessage(message) {
  const chatContent = document.getElementById('chat-content');
  let aiMessage = chatContent.querySelector('.message.ai:last-child');
  if (!aiMessage) {
    aiMessage = document.createElement('div');
    aiMessage.classList.add('message', 'ai');
    chatContent.appendChild(aiMessage);
  }
  aiMessage.textContent = message;
  chatContent.scrollTop = chatContent.scrollHeight;
}

addMessage('ai', 'Hello! I am Tech Buddy, your friendly IT assistant. How can I help you today?');