# 베이스 이미지
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 의존성 설치 캐싱을 위해 package.json 파일 먼저 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 전체 복사
COPY . .

# Vite 개발 서버가 사용하는 포트 노출
EXPOSE 5173

# 컨테이너 실행 시 기본 명령어
CMD ["npm", "run", "dev"]
