# duru-frontend

둘이 함께 쓰는 지출 기록·일정 공유·목표 체크 웹앱 duru의 프론트엔드입니다.
현재는 개발 환경과 백엔드 연결 확인 화면을 준비한 단계입니다. 서비스 기능과 로그인은 아직 구현하지 않았습니다.

## 기술

React 19 · TypeScript 7 · Vite 8 · Node.js 24 · npm

## 실행

Node.js 24를 설치하고 이 저장소의 루트에서 실행합니다.

```bash
npm ci
npm run dev
```

브라우저에서 http://127.0.0.1:5173 을 엽니다. 종료는 Control + C입니다.
macOS에서는 `./scripts/dev.sh`로 실행해도 됩니다.

`/api` 요청은 Vite 개발 프록시가 `http://127.0.0.1:8080`으로 전달합니다.
백엔드 서버를 별도로 실행해야 연결 확인 버튼이 성공합니다.
프록시는 개발용이며, 운영 배포 시 웹 서버에서 API 경로를 연결해야 합니다.
개발 서버 포트는 5173으로 고정되어 있습니다.

## 검증

```bash
npm run lint
npm run build
```

빌드 결과는 `dist/`에 생성됩니다. 개발 의존성은 `package-lock.json`으로 고정합니다.

## 개발 방법

VS Code에서 이 폴더를 열고 추천 확장(Oxc·Prettier)을 설치합니다.
작업 방식과 버전 관리는 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요.
공개 저장소에 실제 지출·일정·인증 정보를 올리지 않습니다.

## 관련 프로젝트

백엔드 저장소 이름은 `duru-backend`입니다. GitHub Organization 생성 후 실제 링크를 추가합니다.
개인 개발·운영 프로젝트로 진행합니다. 배포는 기능 구현 후 시작할 계획입니다.
