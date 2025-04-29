# recatch-pre-test

사용자 정보 관리 애플리케이션입니다. 이 프로젝트는 Create React App을 기반으로 구축되었습니다.

## 기술 스택

-   **React**: 사용자 인터페이스 구축을 위한 프레임워크
-   **TypeScript**: 정적 타입 지원
-   **Zustand**: 상태 관리 라이브러리
-   **Styled Components**: CSS-in-JS 스타일링 솔루션
-   **Ant Design**: UI 컴포넌트 라이브러리
-   **UUID**: 고유 식별자 생성

## 실행 방법

1. 프로젝트 클론 후 디렉토리로 이동

```bash
git clone [repository-url]
cd recatch-pre-test
```

2. 패키지 설치

```bash
npm install
# 또는
pnpm install
```

3. 환경 설정
   `.env.example` 파일을 `.env`로 복사하고 필요에 따라 환경 변수를 설정합니다.

```bash
cp .env.example .env
```

-   환경 변수

-   REACT_APP_STORAGE_TYPE: 데이터 저장 방식을 설정합니다.
    -   `in-memory`: 클라이언트 상태에 데이터를 저장합니다. 페이지 새로고침 시 초기 데이터로 초기화됩니다.
    -   `local-storage`: 브라우저의 로컬 스토리지에 데이터를 저장합니다. 페이지 새로고침 후에도 데이터가 유지됩니다.

4. 애플리케이션 실행

```bash
npm start
# 또는
pnpm start
```

## 기능

-   사용자 정보 조회, 추가, 수정, 삭제
-   데이터 필터링

## 개발 명령어

### `npm start` 또는 `pnpm start`

개발 모드로 애플리케이션을 실행합니다.

### `npm build` 또는 `pnpm build`

프로덕션용 빌드를 생성합니다.
