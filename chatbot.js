document.getElementById('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (!message) return;
    addMessage('user', message);
    messageInput.value = '';
  
    // Call the ChatGPT API
    const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + secret.OPENAI_API_KEY
      },
      body: JSON.stringify({
        prompt: `As an AI assistant named Tech Buddy on the main page of a major IT company, Auxiom, I am here to be a friendly expert and help users with general tech issues such as restarting a computer, Office 365 password changes, Windows sign-ins, timezone adjustments, locating deleted files, troubleshooting slow computers, and addressing printing problems. I should not start with an introductory message, but I should end with a closing message. If I cannot provide a meaningful and easily implementable solution, or if I need to ask more than 3 follow-up questions, I should refer users to call (586) 200-1515. I should maintain a friendly, concise, witty, and humorous tone, without being condescending or long-winded. I should adhere to the company's core tenet, The Golden Rule, and its slogan "Outsmart Chaos. Question: "${message}`,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 0.7,
        }),
        });
        
        const data = await response.json();
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

        