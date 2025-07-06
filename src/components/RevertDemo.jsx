import React, { useState } from 'react';
import './RevertDemo.css';

const RevertDemo = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const steps = [
    {
      title: "Xác định commit gây lỗi",
      description: "Sử dụng git log để tìm mã hash của commit gây lỗi",
      commands: [
        { text: "git log --oneline", prompt: "$" },
        { text: "# Kết quả ví dụ:", prompt: "", isComment: true },
        { text: "a1b2c3d (HEAD -> develop) Feat: Update header styles", prompt: "", isOutput: true },
        { text: "e4f5g6h Refactor: Improve button component", prompt: "", isOutput: true }
      ],
      explanation: "Sử dụng git log --oneline để xem lịch sử commit một cách ngắn gọn. Identify commit a1b2c3d là commit gây lỗi cần được hoàn tác.",
      specialNote: "Commit 'a1b2c3d (HEAD -> develop) Feat: Update header styles' là commit gây lỗi hiển thị trên toàn bộ trang web."
    },
    {
      title: "Sử dụng git revert để tạo commit hoàn tác",
      description: "Tạo commit mới có nội dung ngược lại với commit gây lỗi",
      commands: [
        { text: "git revert a1b2c3d", prompt: "$" },
        { text: "# Lệnh này sẽ mở trình soạn thảo để xác nhận thông điệp", prompt: "", isComment: true },
        { text: "# Chỉ cần lưu và đóng lại", prompt: "", isComment: true }
      ],
      explanation: "git revert tạo ra một commit mới có nội dung ngược lại với commit gây lỗi. Đây là cách làm an toàn cho các nhánh chia sẻ vì nó không thay đổi lịch sử.",
      specialNote: "git revert không xóa commit gây lỗi mà tạo ra một commit mới để hoàn tác những thay đổi đó. Điều này giữ nguyên lịch sử và an toàn cho team."
    },
    {
      title: "Đẩy commit hoàn tác lên server",
      description: "Chia sẻ commit hoàn tác với toàn bộ team",
      commands: [
        { text: "git push origin develop", prompt: "$" }
      ],
      explanation: "Đẩy commit hoàn tác lên server để tất cả thành viên trong team có thể cập nhật. Nhánh develop đã trở về trạng thái trước khi có commit lỗi, và lịch sử vẫn ghi lại rõ ràng.",
      specialNote: "Bây giờ, nhánh develop đã trở về trạng thái trước khi có commit lỗi, và lịch sử vẫn ghi lại rõ ràng rằng một thay đổi đã được thực hiện và sau đó đã được hoàn tác."
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
    <div className="revert-demo">
      <div className="demo-header">
        <h1>Demo 3: Hoàn tác thay đổi gây lỗi với Git Revert</h1>
        <div className="demo-scenario">
          <strong>Tình huống:</strong> Sau khi một commit được đẩy lên nhánh develop, cả nhóm phát hiện ra nó gây lỗi hiển thị trên toàn bộ trang web. 
          Cần phải loại bỏ thay đổi này một cách an toàn mà không xóa lịch sử.
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
                    {!command.isComment && !command.isOutput && (
                      <span className="command-prompt">{command.prompt}</span>
                    )}
                    <span className={`command-text ${command.isComment ? 'comment' : ''} ${command.isOutput ? 'output' : ''}`}>
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
              <h4>Lưu ý quan trọng:</h4>
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
        <h3>Sơ đồ minh họa Git Revert</h3>
        <div className="diagram-container">
          <svg className="workflow-svg" width="800" height="200" viewBox="0 0 800 200">
            {/* Develop branch timeline */}
            <line x1="50" y1="100" x2="750" y2="100" stroke="#9b59b6" strokeWidth="4"/>
            <text x="20" y="95" className="branch-label">develop</text>
            
            {/* Commits */}
            <circle cx="200" cy="100" r="10" fill="#27ae60"/>
            <circle cx="400" cy="100" r="10" fill="#e74c3c"/>
            <circle cx="600" cy="100" r="10" fill="#f39c12"/>
            
            {/* Commit labels */}
            <text x="170" y="130" fontSize="12" fill="#27ae60" fontWeight="600">E4F5G6H</text>
            <text x="185" y="145" fontSize="10" fill="#7f8c8d">(Tốt)</text>
            
            <text x="370" y="130" fontSize="12" fill="#e74c3c" fontWeight="600">A1B2C3D</text>
            <text x="385" y="145" fontSize="10" fill="#e74c3c">(Lỗi)</text>
            
            <text x="570" y="130" fontSize="12" fill="#f39c12" fontWeight="600">C9D8E7F</text>
            <text x="560" y="145" fontSize="10" fill="#f39c12">Revert A1B2C3D</text>
            
            {/* Revert arrow */}
            <path d="M 580 80 Q 500 60 420 80" stroke="#f39c12" strokeWidth="3" fill="none" markerEnd="url(#revertArrow)" strokeDasharray="5,5"/>
            
            {/* Arrow marker */}
            <defs>
              <marker id="revertArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#f39c12"/>
              </marker>
            </defs>
            
            {/* Revert explanation */}
            <text x="450" y="50" fontSize="11" fill="#f39c12" fontWeight="600">Hoàn tác</text>
            
            {/* Timeline arrows */}
            <path d="M 730 100 l 15 -5 l 0 10 Z" fill="#9b59b6"/>
            <text x="740" y="105" fontSize="10" fill="#9b59b6">Thời gian</text>
          </svg>
        </div>
        <p className="diagram-description">
          Hình 5.3: Minh họa git revert tạo một commit mới để hoàn tác thay đổi.
          Commit C9D8E7F được tạo ra để hoàn tác những thay đổi của commit A1B2C3D gây lỗi, 
          nhưng không xóa lịch sử của commit gây lỗi.
        </p>
      </div>

      <div className="comparison-section">
        <h3>So sánh Git Revert vs Git Reset</h3>
        <div className="comparison-grid">
          <div className="comparison-item revert">
            <h4>Git Revert</h4>
            <div className="pros">
              <h5>✅ Ưu điểm:</h5>
              <ul>
                <li>An toàn cho nhánh chia sẻ</li>
                <li>Giữ nguyên lịch sử</li>
                <li>Có thể hoàn tác nhiều commit</li>
                <li>Dễ dàng trace lại</li>
              </ul>
            </div>
            <div className="use-case">
              <h5>🎯 Khi nào sử dụng:</h5>
              <p>Khi commit đã được push lên remote và có người khác đang sử dụng</p>
            </div>
          </div>
          
          <div className="comparison-item reset">
            <h4>Git Reset</h4>
            <div className="pros">
              <h5>⚠️ Lưu ý:</h5>
              <ul>
                <li>Thay đổi lịch sử</li>
                <li>Nguy hiểm cho nhánh chia sẻ</li>
                <li>Có thể làm mất dữ liệu</li>
                <li>Khó trace lại</li>
              </ul>
            </div>
            <div className="use-case">
              <h5>🎯 Khi nào sử dụng:</h5>
              <p>Chỉ dùng cho commit local chưa push, hoặc khi làm việc một mình</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevertDemo;
