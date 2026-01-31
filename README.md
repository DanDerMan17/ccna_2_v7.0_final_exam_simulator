# CCNA 2 v7.0 Final Exam Simulator
A full-stack web-based CCNA 2 v7.0 final exam simulator designed to help students practice and prepare for the Cisco CCNA 2 final exam using a realistic testing experience.

This application provides a responsive exam interface, randomized questions, timed tests, scoring, and progress tracking – powered by a React + Express + MongoDB stack.

# Features

## Large Question Database
- Questions sourced from [itexamanswers.net](https://itexamanswers.net/) and structured into JSON format.
- Stored in MongoDB for efficient querying and scalability.

## Real Exam Simulation
- Timed tests
- Randomized question order
- Realistic exam layout

## Instant Results & Scoring
- Immediate feedback
- Score calculation
- Pass / fail result display

## Dynamic Question Loading
- API-based question delivery from backend
- Randomized question selection per session

## Fast & Modern Frontend
- Built using React + Vite
- Partially Clean UI :))

# Database Structure:
````JSON
{
    "number": 1,
    "type": "single",
    "question": "Refer to the exhibit. What will router R1 do with a packet that has a destination IPv6 address of 2001:db8:cafe:5::1?",
    "image": "https://itexamanswers.net/wp-content/uploads/2020/01/Switching-Routing-and-Wireless-Essentials-Version-7.00-Final-Answers-1.png",
    "answers": [
      "forward the packet out GigabitEthernet0/0",
      "drop the packet",
      "forward the packet out GigabitEthernet0/1",
      "forward the packet out Serial0/0/0"
    ],
    "correctAnswers": [
      "forward the packet out Serial0/0/0"
    ],
    "matchPairs": []
  }
````

## Installation & Setup
1. Clone the Repository
````bash
git clone https://github.com/yourusername/ccna_2_v7.0_final_exam_simulator.git
cd ccna_2_v7.0_final_exam_simulator
````

2️. Backend Setup
````bash
cd backend
npm install
````

3. Create a .env file:
````
# Environment variables
PORT=3000
MONGO_URI=mongodb://localhost:27017/ccna
````

4. Start backend server:
````bash
cd backend
npm run dev_BE
````

5. Frontend Setup
````
cd frontend
npm install
npm run dev_FE
````

6. Open in Browser
[http://localhost:5173](http://localhost:5173/)
