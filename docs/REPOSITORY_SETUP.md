# 저장소 운영 설정

작업 규칙은 [CONTRIBUTING](../CONTRIBUTING.md), 실행 명령은 [README](../README.md)를 기준으로 합니다.
이 문서는 GitHub 설정의 적용 상태와 초기 도입 절차를 관리합니다. 설정을 바꾸는 PR에서 함께 갱신합니다.

## 적용 상태

| 항목 | 운영 기준 및 확인 위치 |
| --- | --- |
| GitHub 저장소 | [Duru-Official/Duru-Frontend](https://github.com/Duru-Official/Duru-Frontend), 공개 |
| 기본 브랜치 | `dev`에서 작업 브랜치를 분기하고 PR로 통합 |
| 릴리스 브랜치 | `main`에 릴리스 PR로 반영. [원격 브랜치 목록](https://github.com/Duru-Official/Duru-Frontend/branches) |
| Ruleset | [protect-dev-and-main](https://github.com/Duru-Official/Duru-Frontend/settings/rules/26193994), Active 저장 완료 |
| CI | [GitHub Actions 실행 이력](https://github.com/Duru-Official/Duru-Frontend/actions/workflows/ci.yml)에서 브랜치와 커밋별 결과 확인 |
| 코드 리뷰 | PR을 열 때 Codex 자동 리뷰. 프로젝트별 기준은 [AGENTS.md](../AGENTS.md#code-review-rules) 참고 |
| 배포 | 서버·환경·배포 자동화 미연결 |

## 보호 정책

설정 원본: [protect-dev-and-main.json](../.github/rulesets/protect-dev-and-main.json).
이 파일을 수정하는 것만으로 GitHub 설정이 갱신되지는 않습니다. 실제 Ruleset도 함께 반영하고 확인합니다.

| 항목 | 설정·의도 |
| --- | --- |
| 대상 | refs/heads/dev, refs/heads/main |
| Enforcement | Active |
| Bypass | 없음. 관리자도 일반 병합 시 같은 조건 사용 |
| PR 필수 | 직접 push 대신 PR로 변경 |
| 필수 승인 | 0명. 개인 개발에서는 자기 검토 후 병합 가능 |
| 리뷰 대화 | 모두 해결 필요 |
| 필수 검사 | GitHub Actions의 `Frontend CI` |
| 최신 기준 검사 | 대상 브랜치의 최신 코드와 함께 검사 필요 |
| 삭제·force push | 차단 |
| 브랜치 최초 생성 | 생성 자체에는 상태 검사 요구 안 함. 기존 브랜치 갱신은 보호 |
| 선형 이력 | 요구하지 않음. 릴리스·동기화 Merge commit 허용 |

필수 검사 이름은 CI job의 표시 이름과 정확히 맞아야 합니다. 이름 변경 시 워크플로와 Ruleset을 함께 바꿉니다.
PR의 소스 브랜치 제한은 Ruleset 자체가 아니라 CI의 [정책 검사](../.github/scripts/check_pr_policy.py)가 수행합니다.

- 작업 브랜치 → dev: 허용. `feat`, `fix`, `refactor`, `test`, `docs`, `chore` 접두사 사용.
- 같은 저장소 dev → main: 릴리스 허용.
- 같은 저장소 main → dev: 동기화 허용.
- 작업 브랜치 → main, 포크의 dev → main 등: 실패.

병합 방식은 PR에서 선택합니다. 작업은 Squash, 릴리스·동기화는 Merge commit입니다.
현재 공통 Ruleset은 PR 종류별 병합 버튼을 구분해 강제하지 않으므로 병합 전에 대상을 확인합니다.

## CI 범위

[ci.yml](../.github/workflows/ci.yml)은 dev·main 대상 PR과 두 브랜치의 push에서 실행합니다.
문서 변경도 검사하며, PR 대상 변경 시 정책 검사를 다시 실행합니다.

1. PR 경로 검증
2. Node.js 24 설정과 lockfile 기반 의존성 설치
3. Oxlint
4. TypeScript 검사와 Vite 빌드

Actions는 커밋 SHA에 고정하고 저장소 권한은 읽기로 제한합니다. 배포·비밀값 접근은 포함하지 않습니다.
필수 검사에서는 경로 필터로 문서 PR을 건너뛰지 않습니다. 검사가 생성되지 않으면 PR이 계속 대기할 수 있습니다.

## 최초 업로드 순서

빈 저장소에 최초 기반을 만들 때의 절차입니다. 이후 변경은 작업 브랜치와 PR을 사용합니다.

1. 로컬 변경·비밀값 제외·검사 결과를 검토하고 기반 정비 커밋을 확정합니다.
2. 이 저장소의 origin을 연결하고 작업 브랜치의 커밋을 먼저 업로드합니다.
3. 그 커밋에서 원격 main·dev를 최초 생성합니다. 기존 브랜치를 덮어쓰지 않습니다.
4. Settings → General → Default branch를 dev로 설정합니다.
5. Merge commit·Squash merge를 사용할 수 있는지 확인합니다. 장기 브랜치를 보존하도록 Automatically delete head branches는 끕니다.
6. dev·main push로 실행된 CI 결과와 필수 검사 연결을 확인합니다.
7. dev의 Issue 폼·PR 템플릿이 표시되는지 확인하고, 이후 변경은 dev에서 분기해 PR로 보냅니다.
8. 정상 PR이 병합 가능하고 CI 실패·잘못된 대상 PR이 차단되는지 첫 PR에서 확인합니다.

최초 생성에만 상태 검사를 요구하지 않는 옵션을 사용합니다. 보호 규칙을 끄거나 관리자 우회 권한을 추가하지 않습니다.
원격 생성이 거부되면 오류 원인과 기존 브랜치 상태를 먼저 확인합니다.

## 템플릿 사용

- Issue: 작업 제안 / 버그 신고 / 릴리스 준비를 선택합니다. 필수 항목은 목적·재현·완료 조건·검증 등 유형에 맞게 다릅니다.
- 작업 PR: 기본 템플릿이 목적·검증 근거·연동 영향·완료 조건을 안내합니다.
- 릴리스 PR: `.github/PULL_REQUEST_TEMPLATE/release.md`를 사용합니다. 비교 화면 URL에 `template=release.md` 쿼리를 추가해 선택합니다.
- 동기화 PR: 기본 템플릿에 `main → dev` 이력 동기화임을 명시하고 Merge commit으로 병합합니다.

Issue 폼은 기본 브랜치에 올라간 뒤 사용합니다. 작업 폼의 유형을 바꿨다면 제목의 `[Feature]`도 해당 유형으로 고칩니다.
`Closes #번호`의 자동 종료는 기본 브랜치 병합을 기준으로 합니다. dev를 기본으로 쓰므로 구현 완료와 실제 배포 완료는 별도로 기록합니다.

## 향후 staging 도입

브랜치를 유지한 채 dev와 staging, main과 production 배포를 연결할 수 있습니다.
이때 환경별 설정·비밀값·DB·배포 권한·헬스 확인·복구 절차를 정의하고 CD를 별도 PR로 추가합니다.
현재 병합이나 버전 태그 생성만으로 서버 배포가 실행되지는 않습니다.
