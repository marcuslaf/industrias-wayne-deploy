# ============================================================
# Flask Backend Dockerfile
# ============================================================

FROM python:3.12-slim AS builder
WORKDIR /app/backend
COPY backend/requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

FROM python:3.12-slim AS runner
WORKDIR /app
COPY --from=builder /install /usr/local
COPY backend/ ./backend/
EXPOSE 5000
WORKDIR /app/backend
CMD ["python", "app.py"]
