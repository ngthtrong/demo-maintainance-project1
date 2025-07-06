import React, { useState } from 'react'
import './HotfixDemo.css'

const HotfixDemo = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Tạo nhánh hotfix từ main",
      description: "Chuyển về nhánh main và tạo nhánh hotfix mới",
      commands: [
        "git checkout main",
        "git pull origin main",
        "git checkout -b hotfix/fix-login-error"
      ],
      explanation: "Bước đầu tiên là tạo một nhánh hotfix từ nhánh main để sửa lỗi khẩn cấp mà không ảnh hưởng đến nhánh develop."
    },
    {
      title: "Sửa lỗi và commit",
      description: "Thực hiện sửa lỗi và commit thay đổi",
      commands: [
        "git add src/login.js",
        "git commit -m \"Hotfix: Fix critical bug preventing user login\""
      ],
      explanation: "Sau khi sửa lỗi trong file login.js, chúng ta add file vào staging area và commit với thông điệp rõ ràng."
    },
    {
      title: "Hợp nhất hotfix vào main và develop",
      description: "Merge hotfix vào cả hai nhánh chính",
      commands: [
        "git checkout main",
        "git merge --no-ff hotfix/fix-login-error",
        "git checkout develop", 
        "git merge --no-ff hotfix/fix-login-error"
      ],
      explanation: "Sử dụng --no-ff để tạo merge commit, giữ lại lịch sử rõ ràng về quá trình hotfix."
    },
    {
      title: "Đánh dấu phiên bản và đẩy lên server",
      description: "Tạo tag phiên bản mới và push lên repository",
      commands: [
        "git checkout main",
        "git tag -a v1.0.1 -m \"Version 1.0.1 - Login hotfix\"",
        "git push origin main",
        "git push origin develop",
        "git push origin v1.0.1"
      ],
      explanation: "Tạo tag để đánh dấu phiên bản mới và push tất cả thay đổi lên remote repository."
    },
    {
      title: "Xóa nhánh hotfix",
      description: "Dọn dẹp nhánh hotfix đã hoàn thành",
      commands: [
        "git branch -d hotfix/fix-login-error"
      ],
      explanation: "Sau khi hoàn thành hotfix, xóa nhánh để giữ repository sạch sẽ."
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex)
  }

  return (
    <div className="hotfix-demo">
      <header className="demo-header">
        <h1>Demo 1: Sửa lỗi khẩn cấp (Hotfix)</h1>
        <p className="demo-scenario">
          <strong>Tình huống:</strong> Một lỗi nghiêm trọng (người dùng không thể đăng nhập) được phát hiện 
          trên phiên bản đang chạy (nhánh main). Cần phải sửa ngay lập tức mà không làm ảnh hưởng 
          đến các tính năng đang phát triển trên nhánh develop.
        </p>
      </header>

      <div className="demo-content">
        <div className="step-navigator">
          <h3>Các bước thực hiện:</h3>
          <div className="step-buttons">
            {steps.map((step, index) => (
              <button
                key={index}
                className={`step-btn ${currentStep === index ? 'active' : ''} ${currentStep > index ? 'completed' : ''}`}
                onClick={() => goToStep(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="step-content">
          <div className="step-header">
            <h2>Bước {currentStep + 1}: {steps[currentStep].title}</h2>
            <p>{steps[currentStep].description}</p>
          </div>

          <div className="command-section">
            <h4>Lệnh Git:</h4>
            <div className="command-block">
              {steps[currentStep].commands.map((command, index) => (
                <div key={index} className="command-line">
                  <span className="command-prompt">$</span>
                  <span className="command-text">{command}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="explanation-section">
            <h4>Giải thích:</h4>
            <p>{steps[currentStep].explanation}</p>
          </div>

          {currentStep === 2 && (
            <div className="special-note">
              <h4>⚠️ Lưu ý về tùy chọn --no-ff:</h4>
              <p>
                Tùy chọn <code>--no-ff</code> sẽ buộc Git phải tạo một "commit hợp nhất" ngay cả khi có thể 
                hợp nhất theo kiểu "fast-forward". Điều này giữ lại toàn bộ lịch sử của nhánh hotfix một cách 
                tường minh. Khi xem lại lịch sử (<code>git log</code>), bất kỳ ai cũng có thể thấy rõ ràng rằng 
                "đã có một nhánh sửa lỗi tồn tại và được hợp nhất tại đây", giúp việc truy vết và kiểm tra lại 
                quá trình bảo trì trở nên dễ dàng hơn rất nhiều.
              </p>
            </div>
          )}
        </div>

        <div className="step-controls">
          <button 
            className="nav-btn prev-btn" 
            onClick={prevStep} 
            disabled={currentStep === 0}
          >
            ← Bước trước
          </button>
          <span className="step-indicator">
            {currentStep + 1} / {steps.length}
          </span>
          <button 
            className="nav-btn next-btn" 
            onClick={nextStep} 
            disabled={currentStep === steps.length - 1}
          >
            Bước tiếp theo →
          </button>
        </div>
      </div>

      <div className="git-workflow-diagram">
        <h3>Sơ đồ quy trình Hotfix</h3>
        <div className="diagram-container">
          <svg viewBox="0 0 800 400" className="workflow-svg">
            {/* Main branch */}
            <line x1="50" y1="200" x2="750" y2="200" stroke="#333" strokeWidth="3"/>
            <text x="60" y="190" className="branch-label">main</text>
            
            {/* Hotfix branch */}
            <line x1="200" y1="200" x2="200" y2="100" stroke="#e74c3c" strokeWidth="2"/>
            <line x1="200" y1="100" x2="400" y2="100" stroke="#e74c3c" strokeWidth="2"/>
            <line x1="400" y1="100" x2="400" y2="200" stroke="#e74c3c" strokeWidth="2"/>
            <text x="220" y="90" className="branch-label">hotfix/fix-login-error</text>
            
            {/* Develop branch */}
            <line x1="50" y1="300" x2="750" y2="300" stroke="#27ae60" strokeWidth="3"/>
            <text x="60" y="290" className="branch-label">develop</text>
            
            {/* Merge lines */}
            <line x1="400" y1="200" x2="500" y2="300" stroke="#e74c3c" strokeWidth="2" strokeDasharray="5,5"/>
            
            {/* Commits */}
            <circle cx="200" cy="200" r="5" fill="#333"/>
            <circle cx="300" cy="100" r="5" fill="#e74c3c"/>
            <circle cx="400" cy="200" r="5" fill="#333"/>
            <circle cx="500" cy="300" r="5" fill="#27ae60"/>
            
            {/* Tag */}
            <rect x="390" y="220" width="40" height="20" fill="#f39c12" rx="3"/>
            <text x="395" y="235" className="tag-label">v1.0.1</text>
            
            {/* Arrows */}
            <polygon points="395,205 405,205 400,195" fill="#333"/>
            <polygon points="495,305 505,305 500,315" fill="#27ae60"/>
          </svg>
        </div>
        <p className="diagram-description">
          Sơ đồ luồng công việc sửa lỗi khẩn cấp (Hotfix): Tạo nhánh hotfix từ main, 
          sửa lỗi, merge vào cả main và develop, tạo tag phiên bản mới.
        </p>
      </div>
    </div>
  )
}

export default HotfixDemo
