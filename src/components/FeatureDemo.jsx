import React, { useState } from 'react';
import './FeatureDemo.css';

const FeatureDemo = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const steps = [
    {
      title: "Tạo nhánh feature từ develop",
      description: "Chuyển về nhánh develop và tạo nhánh feature mới",
      commands: [
        { text: "git checkout develop", prompt: "$" },
        { text: "git pull origin develop", prompt: "$" },
        { text: "git checkout -b feature/user-profile", prompt: "$" }
      ],
      explanation: "Tạo nhánh feature mới từ develop để phát triển tính năng riêng biệt mà không ảnh hưởng đến các nhánh khác."
    },
    {
      title: "Phát triển tính năng và commit nhiều lần",
      description: "Lập trình viên code và commit các thay đổi nhỏ",
      commands: [
        { text: "git add .", prompt: "$" },
        { text: "git commit -m \"Feat: Add basic structure for profile page\"", prompt: "$" },
        { text: "# ... tiếp tục code ...", prompt: "", isComment: true },
        { text: "git add .", prompt: "$" },
        { text: "git commit -m \"Feat: Implement user data fetching for profile\"", prompt: "$" }
      ],
      explanation: "Phát triển tính năng theo từng bước nhỏ và commit thường xuyên để dễ dàng theo dõi và quản lý thay đổi."
    },
    {
      title: "Đẩy nhánh feature lên GitHub và tạo Pull Request",
      description: "Chia sẻ nhánh feature và tạo yêu cầu merge",
      commands: [
        { text: "git push -u origin feature/user-profile", prompt: "$" }
      ],
      explanation: "Đẩy nhánh feature lên GitHub và tạo Pull Request để team có thể review code trước khi merge vào develop.",
      specialNote: "Sau khi push, lên GitHub và tạo một Pull Request (PR) từ nhánh feature/user-profile vào develop. Các thành viên khác sẽ review code, bình luận và yêu cầu chỉnh sửa nếu cần."
    },
    {
      title: "Hợp nhất vào develop sau khi PR được duyệt",
      description: "Merge nhánh feature vào develop thông qua GitHub",
      commands: [],
      explanation: "Người quản lý hoặc người có thẩm quyền sẽ nhấn nút \"Merge\" trên giao diện GitHub. Thao tác này sẽ hợp nhất nhánh feature vào develop.",
      specialNote: "Quá trình merge được thực hiện trên giao diện GitHub sau khi PR được approve bởi các reviewer."
    },
    {
      title: "Xóa nhánh feature (sau khi đã hợp nhất)",
      description: "Dọn dẹp nhánh feature đã hoàn thành",
      commands: [
        { text: "git branch -d feature/user-profile", prompt: "$" },
        { text: "git push origin --delete feature/user-profile", prompt: "$" }
      ],
      explanation: "Xóa nhánh feature cả ở local và remote để giữ repository gọn gàng và tránh nhầm lẫn."
    }
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  return (
    <div className="feature-demo">
      <div className="demo-header">
        <h1>Demo 2: Phát triển tính năng mới song song</h1>
        <div className="demo-scenario">
          <strong>Tình huống:</strong> Nhóm được giao nhiệm vụ phát triển tính năng "Trang hồ sơ người dùng". 
          Công việc này sẽ kéo dài và không được làm ảnh hưởng đến nhánh main hoặc develop cho đến khi hoàn thiện.
        </div>
      </div>

      <div className="demo-content">
        <div className="step-navigator">
          <h3>Các bước thực hiện:</h3>
          <div className="step-buttons">
            {Array.from({ length: totalSteps }, (_, i) => (
              <button
                key={i + 1}
                className={`step-btn ${currentStep === i + 1 ? 'active' : ''} ${currentStep > i + 1 ? 'completed' : ''}`}
                onClick={() => goToStep(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="step-content">
          <div className="step-header">
            <h2>Bước {currentStep}: {steps[currentStep - 1].title}</h2>
            <p>{steps[currentStep - 1].description}</p>
          </div>

          {steps[currentStep - 1].commands.length > 0 && (
            <div className="command-section">
              <h4>Lệnh Git:</h4>
              <div className="command-block">
                {steps[currentStep - 1].commands.map((command, index) => (
                  <div key={index} className="command-line">
                    {!command.isComment && (
                      <span className="command-prompt">{command.prompt}</span>
                    )}
                    <span className={`command-text ${command.isComment ? 'comment' : ''}`}>
                      {command.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="explanation-section">
            <h4>Giải thích:</h4>
            <p>{steps[currentStep - 1].explanation}</p>
          </div>

          {steps[currentStep - 1].specialNote && (
            <div className="special-note">
              <h4>Lưu ý đặc biệt:</h4>
              <p>{steps[currentStep - 1].specialNote}</p>
            </div>
          )}
        </div>

        <div className="step-controls">
          <button 
            className="nav-btn" 
            onClick={prevStep} 
            disabled={currentStep === 1}
          >
            ← Bước trước
          </button>
          
          <span className="step-indicator">
            {currentStep} / {totalSteps}
          </span>
          
          <button 
            className="nav-btn" 
            onClick={nextStep} 
            disabled={currentStep === totalSteps}
          >
            Bước tiếp →
          </button>
        </div>
      </div>

      <div className="git-workflow-diagram">
        <h3>Sơ đồ quy trình phát triển tính năng</h3>
        <div className="diagram-container">
          <svg className="workflow-svg" width="800" height="300" viewBox="0 0 800 300">
            {/* Develop branch */}
            <line x1="50" y1="150" x2="750" y2="150" stroke="#3498db" strokeWidth="4"/>
            <text x="30" y="145" className="branch-label">develop</text>
            
            {/* Feature branch */}
            <line x1="200" y1="150" x2="200" y2="80" stroke="#e74c3c" strokeWidth="3"/>
            <line x1="200" y1="80" x2="600" y2="80" stroke="#e74c3c" strokeWidth="3"/>
            <line x1="600" y1="80" x2="600" y2="150" stroke="#e74c3c" strokeWidth="3"/>
            <text x="180" y="75" className="branch-label">feature/user-profile</text>
            
            {/* Commits on develop */}
            <circle cx="150" cy="150" r="8" fill="#3498db"/>
            <circle cx="400" cy="150" r="8" fill="#3498db"/>
            <circle cx="650" cy="150" r="8" fill="#3498db"/>
            
            {/* Commits on feature */}
            <circle cx="250" cy="80" r="6" fill="#e74c3c"/>
            <circle cx="350" cy="80" r="6" fill="#e74c3c"/>
            <circle cx="450" cy="80" r="6" fill="#e74c3c"/>
            <circle cx="550" cy="80" r="6" fill="#e74c3c"/>
            
            {/* Merge arrow */}
            <path d="M 600 80 Q 620 100 600 150" stroke="#27ae60" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)"/>
            
            {/* Arrow marker */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#27ae60"/>
              </marker>
            </defs>
            
            {/* Labels */}
            <text x="100" y="170" fontSize="10" fill="#7f8c8d">Initial</text>
            <text x="230" y="100" fontSize="10" fill="#7f8c8d">Feat 1</text>
            <text x="330" y="100" fontSize="10" fill="#7f8c8d">Feat 2</text>
            <text x="430" y="100" fontSize="10" fill="#7f8c8d">Feat 3</text>
            <text x="530" y="100" fontSize="10" fill="#7f8c8d">Feat 4</text>
            <text x="620" y="130" fontSize="10" fill="#27ae60">Merge</text>
          </svg>
        </div>
        <p className="diagram-description">
          Hình 5.2: Sơ đồ luồng công việc phát triển tính năng mới (Feature Branch).
          Nhánh feature được tạo từ develop, phát triển độc lập với nhiều commit, 
          sau đó được merge lại vào develop thông qua Pull Request.
        </p>
      </div>
    </div>
  );
};

export default FeatureDemo;
