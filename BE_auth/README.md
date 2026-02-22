# BE_auth

`auth` ?„ë¡ ??UI)??ê·¸ë?ë¡??ê³ , ì¿ í‚¤+?¸ì…˜ ê¸°ë°˜ ?¸ì¦ APIë§?ë¶„ë¦¬????Node.js ë°±ì—”?œì…?ˆë‹¤.

## 1) ?¤í–‰

```bash
cd auth/BE_auth
npm install
cp .env.example .env
npm run dev
```

Windows PowerShell:

```powershell
cd auth\BE_auth
npm install
Copy-Item .env.example .env
npm run dev
```

## 2) ê¸°ë³¸ ì£¼ì†Œ

- API ?œë²„: `http://localhost:5123`
- Swagger UI: `http://localhost:5123/api-docs`
- ?¬ìŠ¤ì²´í¬: `GET /health`

## 3) ?¸ì¦ ë°©ì‹

- `express-session` + ë¸Œë¼?°ì? ì¿ í‚¤(`sid`) ?¬ìš©
- ?„ì¬??ë©”ëª¨ë¦??€?¥ì†Œ ê¸°ë°˜(ê°œë°œ??
- ?¸ì…˜ ë§Œë£Œ: 24?œê°„

## 4) API ?”ì•½

- `POST /api/auth/signup`
  - body: `{ email, password, confirmPassword }`
- `POST /api/auth/login`
  - body: `{ email, password }`
- `GET /api/auth/me`
  - ?¸ì…˜ ?¬ìš©??ì¡°íšŒ
- `POST /api/auth/logout`
  - ?¸ì…˜ ì¢…ë£Œ

## 5) ?„ë¡ ???°ë™ ??ì£¼ì˜

- fetch/axios?ì„œ `credentials: "include"` ?¤ì • ?„ìš”
- `FRONTEND_ORIGIN` ê°’ì„ ?„ë¡ ??ì£¼ì†Œ?€ ?™ì¼?˜ê²Œ ë§ì¶°??CORS + ì¿ í‚¤ ?™ì‘
