import React, { useState } from 'react';
import './MergeConflictDemo.css';

const MergeConflictDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConflictCode, setShowConflictCode] = useState(false);
  const [resolvedConflict, setResolvedConflict] = useState(false);

  const steps = [
    {
      title: "Triết thực hiện thay đổi và đẩy lên trước",
      description: "Lập trình viên đầu tiên tạo nhánh và thực hiện thay đổi",
      commands: [
        "git checkout -b feature/update-title-triet",
        "# Triết sửa file index.html: <h1>Chào mừng đến với Trang Chủ!</h1>",
        "git add index.html",
        "git commit -m \"Feat: Update homepage title\"",
        "git checkout develop",
        "git merge feature/update-title-triet",
        "git push origin develop"
      ],
      explanation: "Triết tạo nhánh mới, sửa tiêu đề trang chủ, và hợp nhất vào develop trước.",
      highlight: "Triết hoàn thành và đẩy thay đổi lên server trước Linh."
    },
    {
      title: "Linh thực hiện thay đổi trên phiên bản cũ",
      description: "Lập trình viên thứ hai cũng chỉnh sửa cùng file",
      commands: [
        "git checkout -b feature/update-title-linh",
        "# Linh sửa file index.html: <h1>Hello World!</h1>",
        "git add index.html",
        "git commit -m \"Feat: Change homepage title to helloworld message\""
      ],
      explanation: "Linh cũng tạo nhánh từ develop và sửa cùng phần code, nhưng với nội dung khác.",
      highlight: "Linh sửa cùng file index.html nhưng với nội dung khác với Triết."
    },
    {
      title: "Linh cập nhật develop và gặp xung đột",
      description: "Xung đột xảy ra khi merge hai thay đổi khác nhau",
      commands: [
        "git checkout develop",
        "git pull origin develop  # Lấy thay đổi của Triết về",
        "git merge feature/update-title-linh",
        "# Git báo lỗi!",
        "# Auto-merging index.html",
        "# CONFLICT (content): Merge conflict in index.html",
        "# Automatic merge failed; fix conflicts and then commit the result."
      ],
      explanation: "Khi Linh cố gắng merge, Git phát hiện xung đột vì cùng một dòng code đã được sửa khác nhau.",
      highlight: "Xung đột xuất hiện vì hai lập trình viên cùng sửa một phần code."
    },
    {
      title: "Phân tích và hiểu xung đột",
      description: "Xem xét nội dung file bị xung đột",
      commands: [],
      explanation: "Mở file index.html để xem các dấu hiệu xung đột mà Git tự động chèn vào.",
      highlight: "Git đã tự động đánh dấu các vùng xung đột trong file."
    },
    {
      title: "Giải quyết xung đột và hoàn tất merge",
      description: "Chọn phiên bản phù hợp và hoàn tất merge",
      commands: [
        "# Sau khi chỉnh sửa file để giải quyết xung đột",
        "git add index.html",
        "git commit -m \"Merge branch 'feature/update-title-linh' into develop, resolving conflict\"",
        "git push origin develop"
      ],
      explanation: "Sau khi giải quyết xung đột, add file đã sửa và commit để hoàn tất merge.",
      highlight: "Việc giải quyết xung đột đòi hỏi sự trao đổi giữa các lập trình viên."
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const toggleConflictCode = () => {
    setShowConflictCode(!showConflictCode);
  };

  const resolveConflict = (choice) => {
    setResolvedConflict(true);
  };

  return (
    <div className="merge-conflict-demo">
      <header className="demo-header">
        <h1>Demo 4: Giải quyết xung đột hợp nhất (Merge Conflict)</h1>
        <p className="demo-scenario">
          <strong>Tình huống:</strong> Xung đột hợp nhất xảy ra khi hai lập trình viên Triết và Linh 
          cùng chỉnh sửa tiêu đề &lt;h1&gt; trong file index.html trên các nhánh khác nhau.
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

          {steps[currentStep].commands.length > 0 && (
            <div className="command-section">
              <h4>Lệnh Git:</h4>
              <div className="command-block">
                {steps[currentStep].commands.map((command, index) => (
                  <div key={index} className="command-line">
                    {!command.startsWith('#') && <span className="command-prompt">$</span>}
                    <span className={`command-text ${command.startsWith('#') ? 'comment' : ''}`}>
                      {command}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="conflict-visualization">
              <h4>Nội dung file index.html bị xung đột:</h4>
              <div className="conflict-file">
                <div className="file-header">
                  <span className="file-name">index.html</span>
                  <button className="toggle-btn" onClick={toggleConflictCode}>
                    {showConflictCode ? 'Ẩn code' : 'Hiện code'}
                  </button>
                </div>
                
                {showConflictCode && (
                  <div className="conflict-content">
                    <div className="line-numbers">
                      <span>10</span>
                      <span>11</span>
                      <span>12</span>
                      <span>13</span>
                      <span>14</span>
                    </div>
                    <div className="code-content">
                      <div className="conflict-marker head">{'<<<<<<< HEAD'}</div>
                      <div className="conflict-code current">{'<h1>Chào mừng đến với Trang Chủ!</h1>'}</div>
                      <div className="conflict-marker separator">{'======='}</div>
                      <div className="conflict-code incoming">{'<h1>Hello World!</h1>'}</div>
                      <div className="conflict-marker tail">{'>>>>>>> feature/update-title-linh'}</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="conflict-explanation">
                <h5>Giải thích các dấu hiệu:</h5>
                <ul>
                  <li><code>{'<<<<<<< HEAD'}</code>: Bắt đầu phần mã từ nhánh hiện tại (develop, có chứa thay đổi của Triết)</li>
                  <li><code>{'======='}</code>: Phân tách giữa hai phiên bản xung đột</li>
                  <li><code>{'>>>>>>> feature/update-title-linh'}</code>: Kết thúc phần mã từ nhánh đang được hợp nhất (chứa thay đổi của Linh)</li>
                </ul>
              </div>

              {showConflictCode && (
                <div className="resolution-tools">
                  <h5>Giải pháp:</h5>
                  <div className="resolution-buttons">
                    <button 
                      className="resolution-btn current"
                      onClick={() => resolveConflict('current')}
                    >
                      Chấp nhận thay đổi hiện tại (Triết)
                    </button>
                    <button 
                      className="resolution-btn incoming"
                      onClick={() => resolveConflict('incoming')}
                    >
                      Chấp nhận thay đổi đến (Linh)
                    </button>
                    <button 
                      className="resolution-btn both"
                      onClick={() => resolveConflict('both')}
                    >
                      Chấp nhận cả hai
                    </button>
                  </div>
                  
                  {resolvedConflict && (
                    <div className="resolution-result">
                      <h6>Kết quả sau khi giải quyết:</h6>
                      <div className="resolved-code">
                        {'<h1>Chào mừng đến với Trang Chủ!</h1>'}
                      </div>
                      <p>Triết và Linh đã trao đổi và quyết định giữ lại phiên bản "Chào mừng đến với Trang Chủ!"</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="explanation-section">
            <h4>Giải thích:</h4>
            <p>{steps[currentStep].explanation}</p>
          </div>

          {steps[currentStep].highlight && (
            <div className="highlight-note">
              <h4>🎯 Điểm chú ý:</h4>
              <p>{steps[currentStep].highlight}</p>
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

      <div className="vscode-demo">
        <h3>Giao diện giải quyết xung đột trong VS Code</h3>
        <div className="vscode-mockup">
          <div className="vscode-header">
            <div className="vscode-tabs">
              <div className="vscode-tab active">index.html</div>
            </div>
          </div>
          <div className="vscode-content">
            <div className="vscode-conflict">
              <div className="conflict-header current">
                <span className="conflict-label">Current Change (HEAD)</span>
                <div className="conflict-actions">
                  <button className="vscode-btn">Accept Current Change</button>
                  <button className="vscode-btn">Accept Both Changes</button>
                </div>
              </div>
              <div className="conflict-code-line current">
                {'<h1>Chào mừng đến với Trang Chủ!</h1>'}
              </div>
              <div className="conflict-header incoming">
                <span className="conflict-label">Incoming Change (feature/update-title-linh)</span>
                <div className="conflict-actions">
                  <button className="vscode-btn">Accept Incoming Change</button>
                </div>
              </div>
              <div className="conflict-code-line incoming">
                {'<h1>Hello World!</h1>'}
              </div>
            </div>
          </div>
        </div>
        <p className="vscode-description">
          Hình 5.4: Giao diện giải quyết xung đột hợp nhất trong VS Code với các nút tiện ích 
          giúp lập trình viên dễ dàng chọn phiên bản phù hợp.
        </p>
      </div>

      <div className="prevention-tips">
        <h3>Mẹo tránh xung đột</h3>
        <div className="tips-grid">
          <div className="tip-item">
            <h4>🔄 Sync thường xuyên</h4>
            <p>Thường xuyên pull từ develop để cập nhật những thay đổi mới nhất</p>
          </div>
          <div className="tip-item">
            <h4>📋 Phân chia công việc rõ ràng</h4>
            <p>Tránh nhiều người cùng sửa một file hoặc một khu vực code</p>
          </div>
          <div className="tip-item">
            <h4>💬 Giao tiếp tốt trong team</h4>
            <p>Thông báo khi sửa các file quan trọng hoặc chia sẻ</p>
          </div>
          <div className="tip-item">
            <h4>🏗️ Kiến trúc code tốt</h4>
            <p>Tách biệt các module, component để giảm thiểu xung đột</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MergeConflictDemo;
