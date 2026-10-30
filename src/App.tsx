import { useState } from 'react'
import './App.css'

type Connection = 'idle' | 'loading' | 'connected' | 'error'

function App() {
  const [connection, setConnection] = useState<Connection>('idle')
  const [message, setMessage] = useState('버튼을 눌러 Spring Boot 서버와 연결해 보세요.')

  async function checkConnection() {
    setConnection('loading')
    setMessage('서버에 연결하고 있어요…')
    try {
      const response = await fetch('/api/health', { signal: AbortSignal.timeout(5000) })
      if (!response.ok) throw new Error('Server response failed')
      const data: unknown = await response.json()
      if (typeof data !== 'object' || data === null || !('status' in data) || data.status !== 'UP') {
        throw new Error('Unexpected health response')
      }
      setConnection('connected')
      setMessage('연결 성공! 프론트와 백엔드가 함께 동작하고 있어요.')
    } catch {
      setConnection('error')
      setMessage('연결할 수 없어요. 백엔드를 실행한 뒤 다시 확인해 주세요.')
    }
  }

  return (
    <main className="shell">
      <header><a className="brand" href="/" aria-label="duru 홈">duru<span>✳</span></a><span className="badge">우리의 작은 시작</span></header>
      <section className="intro">
        <p className="eyebrow">TOGETHER, EVERY DAY</p>
        <h1>둘이 함께,<br />하루를 두루.</h1>
        <p className="description">함께 쓴 돈도, 기다리는 날도, 이루고 싶은 일도.<br />우리의 일상을 한곳에 차곡차곡 모을 거예요.</p>
      </section>
      <section className="features" aria-label="앞으로 만들 기능">
        <article><span className="number">01</span><h2>지출 기록</h2><p>무엇에 썼는지 간단히 적고<br />필수·비필수 지출을 한눈에.</p><span className="soon">만들 예정</span></article>
        <article><span className="number">02</span><h2>공유 캘린더</h2><p>둘의 일정을 함께 보며<br />다음 만남을 기다리는 공간.</p><span className="soon">만들 예정</span></article>
        <article><span className="number">03</span><h2>함께하는 목표</h2><p>오늘, 이번 주, 이번 달.<br />작은 약속을 하나씩 체크.</p><span className="soon">만들 예정</span></article>
      </section>
      <section className="connection" aria-labelledby="connection-title">
        <div><h2 id="connection-title">개발 준비 확인</h2><p role="status" className={connection}>{message}</p></div>
        <button onClick={checkConnection} disabled={connection === 'loading'}>{connection === 'loading' ? '확인 중…' : '서버 연결 확인'}<span aria-hidden="true"> ↗</span></button>
      </section>
      <footer>우리의 일상을 위한 duru · 기본 프로젝트</footer>
    </main>
  )
}

export default App
