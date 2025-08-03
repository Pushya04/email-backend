
# 🌐 Portfolio Contact Form — Full Stack (Frontend + Backend)

This is a full-stack implementation of a **contact form** for a personal portfolio. The frontend is a static HTML/CSS/JS site hosted on **Netlify**, and the backend is a FastAPI-based server deployed on **Render**, responsible for sending emails securely using SMTP.

---

## 📦 Project Structure

```
portfolio
├── frontend/                 
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets/ (images, fonts, etc.)
├── backend/                   
│   ├── main.py
│   ├── requirements.txt
└── README.md
```

---

## 🚀 Live URLs

- 🌍 **Frontend**: [https://mellow-pony-32bd25.netlify.app](https://mellow-pony-32bd25.netlify.app)
- 🔗 **Backend**: [https://email-backend-b1q5.onrender.com](https://email-backend-b1q5.onrender.com)

---

## 🔧 Frontend Tech Stack

- HTML5
- CSS3 (custom fonts and responsive styles)
- JavaScript (form validation and API integration)
- Netlify (hosting + HTTPS)

### Features

- Responsive layout
- Custom fonts and transitions
- Animated contact button
- POSTs message to backend on form submit

---

## 💻 Backend Tech Stack

- FastAPI
- Pydantic (validation)
- Python Dotenv (environment config)
- Gmail SMTP (SSL)
- Render (backend deployment)

### `/send-message` Endpoint

- **Method**: `POST`
- **URL**: `/send-message`
- **Body**:
  ```json
  {
    "name": "Your Name",
    "email": "your@email.com",
    "message": "Hello!"
  }
  ```

---

## 🔐 Environment Variables (Set on Render)

| Variable Name     | Description                          |
|------------------|--------------------------------------|
| `SENDER_EMAIL`    | Gmail address used to send messages  |
| `EMAIL_PASSWORD`  | Gmail **App Password**               |
| `RECEIVER_EMAIL`  | Your email to receive portfolio queries |

> ⚠️ Generate an [App Password](https://support.google.com/accounts/answer/185833) in Gmail settings for secure SMTP access.

---

## 🛠️ Local Development

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create pushya.env
echo "SENDER_EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
RECEIVER_EMAIL=your_email@gmail.com" > pushya.env

# Run locally
uvicorn main:app --reload
```

Then visit: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### Frontend

You can open `index.html` directly in the browser or use a static server:

```bash
cd frontend
python -m http.server 8080
# Then open http://localhost:8080
```

---

## 🚀 Deployment Steps

### 🔹 Frontend on Netlify

1. Create a new Netlify project from your `frontend/` folder.
2. Connect it to GitHub or drag & drop manually.
3. Make sure your `script.js` calls the correct backend URL:
   ```js
   fetch("https://email-backend-b1q5.onrender.com/send-message", {...})
   ```

### 🔸 Backend on Render

1. Create a new Web Service (Python) in Render.
2. Connect GitHub → Select `backend/` directory if necessary.
3. Set Start Command:
   ```
   uvicorn main:app --host=0.0.0.0 --port=10000
   ```
4. Add environment variables (Render → Environment).
5. Deploy!

---

## 📃 License

MIT License © [Pushya Mithra](https://github.com/Pushya04)

---

## 🤝 Contributing

Pull requests are welcome! If you find bugs or improvements, feel free to open an issue or fork the repo.
