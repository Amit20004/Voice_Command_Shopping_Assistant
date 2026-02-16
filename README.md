This project is a Voice-Based Shopping Assistant built using Next.js (frontend), Node.js + Express (backend), and MongoDB (database). The main goal was to allow users to manage a shopping list using voice commands instead of typing.

I used the Web Speech API for speech recognition. When the user clicks the microphone button, the app listens to their voice and converts speech into text. Then I process the text to detect actions like add, remove, update, or remove all. I also added support for both English and Hindi commands.

The frontend is built with Next.js and Tailwind CSS for a clean and responsive UI. Axios is used to send API requests to the backend. The backend handles routes like adding items, removing items, and clearing the list. MongoDB stores all items with fields like name, quantity, and category.

I also added toast notifications for better user feedback and improved the UI for mobile users.

This project helped me understand full-stack development, API handling, speech recognition, and state management.
