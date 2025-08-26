import { useState, useEffect } from 'react'
import './App.css'

interface PasswordOptions {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
}

interface PasswordHistory {
  password: string
  timestamp: number
  strength: number
  copied?: boolean
}

function App() {
  const [password, setPassword] = useState<string>('')
  const [copied, setCopied] = useState<boolean>(false)
  const [showHistory, setShowHistory] = useState<boolean>(false)
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [passwordHistory, setPasswordHistory] = useState<PasswordHistory[]>([])
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true
  })

  // ローカルストレージから履歴を読み込み
  useEffect(() => {
    const savedHistory = localStorage.getItem('passwordHistory')
    if (savedHistory) {
      setPasswordHistory(JSON.parse(savedHistory))
    }
  }, [])

  // パスワード強度を計算
  const calculateStrength = (password: string): number => {
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    return strength
  }

  // パスワードを生成
  const generatePassword = () => {
    const { length, includeUppercase, includeLowercase, includeNumbers, includeSymbols } = options
    
    let charset = ''
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeNumbers) charset += '0123456789'
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    
    if (charset === '') {
      alert('少なくとも1つの文字種を選択してください')
      return
    }
    
    let result = ''
    const array = new Uint8Array(length)
    crypto.getRandomValues(array)
    
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length]
    }
    
    setPassword(result)
    setCopied(false)

    // 履歴に追加
    const newHistory = [
      { password: result, timestamp: Date.now(), strength: calculateStrength(result) },
      ...passwordHistory.slice(0, 9) // 最新10件まで保持
    ]
    setPasswordHistory(newHistory)
    localStorage.setItem('passwordHistory', JSON.stringify(newHistory))
  }

  // パスワードをクリップボードにコピー
  const copyToClipboard = async (text?: string, historyIndex?: number) => {
    const passwordToCopy = text || password
    if (passwordToCopy) {
      try {
        await navigator.clipboard.writeText(passwordToCopy)
        
        if (historyIndex !== undefined) {
          // 履歴のコピーボタンの場合
          const newHistory = [...passwordHistory]
          newHistory[historyIndex].copied = true
          setPasswordHistory(newHistory)
          localStorage.setItem('passwordHistory', JSON.stringify(newHistory))
          
          setTimeout(() => {
            const resetHistory = [...passwordHistory]
            resetHistory[historyIndex].copied = false
            setPasswordHistory(resetHistory)
            localStorage.setItem('passwordHistory', JSON.stringify(resetHistory))
          }, 2000)
        } else {
          // メインのコピーボタンの場合
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }
      } catch (err) {
        console.error('クリップボードへのコピーに失敗しました:', err)
      }
    }
  }

  // 履歴からパスワードを削除
  const removeFromHistory = (index: number) => {
    const newHistory = passwordHistory.filter((_: PasswordHistory, i: number) => i !== index)
    setPasswordHistory(newHistory)
    localStorage.setItem('passwordHistory', JSON.stringify(newHistory))
  }

  // 履歴をクリア
  const clearHistory = () => {
    setPasswordHistory([])
    localStorage.removeItem('passwordHistory')
  }

  // 初期パスワードを生成
  useEffect(() => {
    generatePassword()
  }, [])

  const strength = calculateStrength(password)
  const strengthText = ['弱い', '普通', '強い', 'とても強い', '最強'][strength - 1] || '弱い'
  const strengthColor = ['#ff4444', '#ffaa00', '#ffff00', '#00ff00', '#00ff00'][strength - 1] || '#ff4444'

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔐 PWA Password Generator</h1>
        <p>セキュアなパスワードを生成します</p>
      </header>

      <main className="password-container">
        <div className="password-display">
          <input
            type="text"
            value={password}
            readOnly
            className="password-input"
            placeholder="パスワードがここに表示されます"
          />
          <button 
            onClick={() => copyToClipboard()}
            className={`copy-button ${copied ? 'copied' : ''}`}
            disabled={!password}
          >
            {copied ? '✓ コピー済み' : '📋 コピー'}
          </button>
        </div>

        <div className="strength-meter">
          <div className="strength-bar">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`strength-segment ${level <= strength ? 'active' : ''}`}
                style={{ backgroundColor: level <= strength ? strengthColor : '#ddd' }}
              />
            ))}
          </div>
          <span className="strength-text">強度: {strengthText}</span>
        </div>

        <div className="options-container">
          <div className="options-header">
            <h3>⚙️ パスワード設定</h3>
            <button 
              onClick={() => setShowOptions(!showOptions)}
              className="toggle-options-button"
            >
              {showOptions ? '▼ 隠す' : '▶ 表示'}
            </button>
          </div>
          
          {showOptions && (
            <>
              <div className="option-group">
                <label className="option-label">
                  <span>パスワードの長さ: {options.length}</span>
                  <input
                    type="range"
                    min="8"
                    max="64"
                    value={options.length}
                    onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
                    className="length-slider"
                  />
                </label>
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={options.includeUppercase}
                    onChange={(e) => setOptions({ ...options, includeUppercase: e.target.checked })}
                  />
                  <span>大文字 (A-Z)</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={options.includeLowercase}
                    onChange={(e) => setOptions({ ...options, includeLowercase: e.target.checked })}
                  />
                  <span>小文字 (a-z)</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={options.includeNumbers}
                    onChange={(e) => setOptions({ ...options, includeNumbers: e.target.checked })}
                  />
                  <span>数字 (0-9)</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={options.includeSymbols}
                    onChange={(e) => setOptions({ ...options, includeSymbols: e.target.checked })}
                  />
                  <span>記号 (!@#$%^&*)</span>
                </label>
              </div>
            </>
          )}
        </div>

        <button onClick={generatePassword} className="generate-button">
          🔄 新しいパスワードを生成
        </button>

        {/* パスワード履歴 */}
        {passwordHistory.length > 0 && (
          <div className="history-container">
            <div className="history-header">
              <h3>📋 パスワード履歴</h3>
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className="toggle-history-button"
              >
                {showHistory ? '▼ 隠す' : '▶ 表示'}
              </button>
            </div>
            
            {showHistory && (
              <div className="history-list">
                {passwordHistory.map((item, index) => (
                  <div key={index} className="history-item">
                    <div className="history-password">
                      <span className="password-text">{item.password}</span>
                      <span className="password-time">
                        {new Date(item.timestamp).toLocaleString('ja-JP')}
                      </span>
                    </div>
                    <div className="history-actions">
                      <button 
                        onClick={() => copyToClipboard(item.password, index)}
                        className={`history-copy-button ${item.copied ? 'copied' : ''}`}
                      >
                        {item.copied ? '✓' : '📋'}
                      </button>
                      <button 
                        onClick={() => removeFromHistory(index)}
                        className="history-delete-button"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={clearHistory}
                  className="clear-history-button"
                >
                  🗑️ 履歴をクリア
                </button>
              </div>
            )}
          </div>
        )}

        <div className="info">
          <p>💡 このアプリはWebCrypto APIを使用してセキュアな乱数を生成します</p>
          <p>📱 PWA対応でオフラインでも使用可能です</p>
          <p>🔒 パスワード履歴はローカルに保存され、外部に送信されることはありません</p>
        </div>
      </main>
    </div>
  )
}

export default App 