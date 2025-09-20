let messageInput = document.getElementById('message-input'); 
let sendButton = document.getElementById('send-button'); 
let chatBox = document.querySelector('.chat-box');

sendButton?.addEventListener('click', function() { 
let message = messageInput.value; 
if (message !== '') {
let newMessage = document.createElement('div'); 
newMessage.classList.add('message'); 
newMessage.innerHTML = `<p>${message}</p> <span>${new Date().toLocaleTimeString()}</span>`;
 chatBox.appendChild(newMessage); 
 chatBox.scrollTop = chatBox.scrollHeight;
  messageInput.value = '';
 } 
});

// Problem और Feedback के लिए 
let problemInput = document.getElementById('problem');
let feedbackInput = document.getElementById('feedback');

if (problemInput && feedbackInput) {
 let submitButton = document.createElement('button'); 
 submitButton.textContent = 'Submit'; submitButton.style.marginTop = '10px'; 
 problemInput.parentNode.appendChild(submitButton);
 submitButton.addEventListener('click', function() { 
	let problem = problemInput.value; 
	let feedback = feedbackInput.value; 
	let experience = document.querySelector('input[name="experience"]:checked'); 
	if (experience) {
		 console.log('Problem:', problem); 
		 console.log('Feedback:', feedback);
		 console.log('Experience:', experience.value); 
		} else { 
		console.log('Problem:', problem); 
		console.log('Feedback:', feedback);
	    console.log('Experience: Not selected'); 
	}
 });
 }

// Corrected Search Bar Code (Only this part adjusted)
 document.getElementById("searchForm")?.addEventListener("submit", function(e) {
   e.preventDefault(); 
   const query = document.getElementById("searchInput").value.trim();
   if (query) { 
	window.location.href = "/search?keyword=" + encodeURIComponent(query); 
 }
});

// ======== Fetching Search Results in result.html ========
 if (window.location.pathname === '/search') { 
	const urlParams = new URLSearchParams(window.location.search); 
	const query = urlParams.get('keyword'); 
	if (query) { 
		fetch(`/api/fetch_data?keyword=${encodeURIComponent(query)}`) 
		.then(response => response.json())
	    .then(data => {
		 const resultsContainer = document.getElementById('searchResults'); 
		 if (data.length > 0) {
		  resultsContainer.innerHTML = data.map(item => (
			`<div class='result-item'>
		     <h3>${item.title}</h3> 
		     <p>${item.description}</p> 
		   </div>`
		  )).join(''); 
		} else {
			 document.getElementById('noResults').style.display = 'block'; 
			}
		 })
		.catch(error => {
		 console.error('Error fetching search results:', error); 
		 document.getElementById('noResults').style.display = 'block'; 
		});
	 }
 }
 const searchInput = document.getElementById("searchInput");
const suggestionBox = document.getElementById("suggestions");

searchInput.addEventListener("input", async () => {
  const query = searchInput.value.trim();
  if (query.length > 0) {
    const res = await fetch(`/api/suggestions?q=${encodeURIComponent(query)}`);
    const suggestions = await res.json();

    suggestionBox.innerHTML = "";
    suggestions.forEach(text => {
      const item = document.createElement("div");
      item.className = "suggestion-item";
      item.innerText = text;
      item.onclick = () => {
        searchInput.value = text;
        suggestionBox.innerHTML = "";
      };
      suggestionBox.appendChild(item);
    });
  } else {
    suggestionBox.innerHTML = "";
  }
});