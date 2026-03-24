# geo-news-ai 🌐

ქართული ახალი ამბების ხელოვნური ინტელექტით მართული ანალიზი. პროექტი საშუალებას იძლევა ქართული მედიის სტატიების დათვალიერება, ძიება, კატეგორიზაცია და AI-ანალიზი.

🌍 გაშვებული ვერსია: [არ არის გაშვებული]

## ✨ ფუნქციონალი

**Client (front):** ქართული ახალი ამბების დათვალიერება, ძიება, პაგინაცია, დეტალური გვერდები თითოეული პოსტისთვის, კალათის/ფილტრაციის ფუნქციები (კატეგორიების მიხედვით ფილტრაცია).

**Backend (back):** REST API FastAPI-ზე, API Key დაცვა ადმინისტრატორის როუტებისთვის, სერვისების ინტეგრაცია (ML და Scraper), ადმინისტრატორის როუტები სტატისტიკისა და მონაცემთა მართვისთვის, PostgreSQL მონაცემთა ბაზა.

**ML (ml):** სენტიმენტის ანალიზი (Hugging Face `Arseniy-Sandalov/GeorgianBert-Sent`), შინაარსის შეჯამება (OpenRouter), თემის ექსტრაქტორი (10k პოსტზე გაწვრთნილი მოდელი Scikit-learn-ით).

**Scraper (scraper):** ქართული საიტებიდან პოსტების გადმოტანა Selenium-ით, JSON ფორმატში შენახვა ან დაბრუნება.

## 🛠 ტექნოლოგიები

Frontend: React, TypeScript, Vite, Mantine, Redux Toolkit, React Router, Tailwind CSS, Lucide Icons.

Backend: FastAPI, SQLAlchemy, PostgreSQL, Redis, Celery, Pydantic.

ML: Scikit-learn, Transformers, Requests, OpenRouter API.

Scraper: Selenium, ChromeDriver.

Shared: Pydantic.

## ⚙️ ლოკალური გაშვების ინსტრუქცია

1. **დაკლონეთ რეპოზიტორია:**

   ```
   git clone https://github.com/your-repo/geo-news-ai.git
   cd geo-news-ai
   ```

2. **გარემოს მომზადება:**
   - დააინსტალირეთ Python 3.10+, Node.js 18+, PostgreSQL, Redis.
   - შექმენით ვირტუალური გარემოები თითოეული ფოლდერისთვის.

3. **Backend:**
   - `cd backend`
   - `pip install -e .`
   - შექმენით `.env` ფაილი:
     ```
     POSTGRES_USER=your_user
     POSTGRES_PASSWORD=your_password
     POSTGRES_DB=geo_news_ai
     POSTGRES_HOST=localhost
     POSTGRES_PORT=5432
     REDIS_HOST=localhost
     REDIS_PORT=6379
     API_KEY=your_admin_api_key
     ```
   - გაუშვით PostgreSQL და შექმენით ბაზა.
   - `python -m backend.main` (FastAPI სერვერი).

4. **Frontend:**
   - `cd frontend`
   - `npm install`
   - შექმენით `.env` ფაილი:
     ```
     VITE_PRODUCTS_URL=http://localhost:8000/posts
     VITE_ANALYZE_URL=http://localhost:8000/analyze
     VITE_ANALYZE_RES_URL=http://localhost:8000/analyze/status
     VITE_SAVED_ANALYZE_GET_URL=http://localhost:8000/posts/analyze
     VITE_VERIFY_KEY_URL=http://localhost:8000/admin/verify
     VITE_STATS_URL=http://localhost:8000/admin/stats
     VITE_ADMIN_POSTS_URL=http://localhost:8000/admin/posts
     VITE_POST_DELETE_URL=http://localhost:8000/admin/delete/post
     VITE_ANALYZE_DELETE_URL=http://localhost:8000/admin/delete/analyze
     VITE_ANALYZE_CHANGE_URL=http://localhost:8000/admin/change/analyze
     ```
   - `npm run dev` (Vite დეველოპმენტ სერვერი).

5. **ML:**
   - `cd ml-folder`
   - `pip install -e .`
   - შექმენით `.env` ფაილი:
     ```
     INPUT_PATH=input
     MODELS_PATH=models
     SENTIMENT_MODEL=Arseniy-Sandalov/GeorgianBert-Sent
     API_TOKEN=your_openrouter_api_token
     ```

6. **Scraper:**
   - `cd scraper`
   - `pip install -e .`
   - შექმენით `.env` ფაილი (თუ საჭირო).
   - ChromeDriver უნდა იყოს `scraper/` ფოლდერში.

7. **Shared:**
   - `cd shared`
   - `pip install -e .`

8. **გაშვება:**
   - Backend: `uvicorn backend.main:app --reload`
   - Frontend: `npm run dev`
   - Celery Worker: `celery -A backend.storage.celery_app worker --loglevel=info` (ML და Scraper სერვისებისთვის).
   - Celery Beat: `celery -A backend.storage.celery_app beat --loglevel=info` (Scraper სერვისის ვორკერის გამოძახება ყოველ 1სთ.).
   - Scraper: `python scraper/scraper/run.py` (თუ საჭიროა ხელით გაშვება).

## 🔑 კონფიგურაცია

- **.env ფაილები:** თითოეული ფოლდერისთვის (.env) გასაღებები, მონაცემთა ბაზის კონფიგურაცია, API ტოკენები.
- **მონაცემთა ბაზა:** PostgreSQL, Redis.
- **API გასაღებები:** OpenRouter API ტოკენი ML-სთვის, ადმინისტრატორის API გასაღები backend-ში.

## 📌 შენიშვნები

ეს არის სასწავლო პროექტი და არ არის production-ready. არ არის გადახდის სისტემა, ML და Scraper სერვისები დამოუკიდებლად არ უნდა გაიშვას – ისინი backend-ის მიერ გამოიყენება. პროექტი ეხება ქართულ ახალ ამბებს და იყენებს ხელოვნურ ინტელექტს ანალიზისთვის.
