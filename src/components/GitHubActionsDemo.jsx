import React, { useState } from 'react';
import './GitHubActionsDemo.css';

const GitHubActionsDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [workflowStatus, setWorkflowStatus] = useState('pending'); // pending, running, success, failed
  const [showWorkflowFile, setShowWorkflowFile] = useState(false);

  const steps = [
    {
      title: "Thiết lập Workflow",
      description: "Tạo file workflow CI/CD trong repository",
      explanation: "Tạo file .github/workflows/ci.yml để định nghĩa quy trình tự động hóa. Workflow này sẽ được kích hoạt mỗi khi có Pull Request nhắm vào nhánh main hoặc develop.",
      highlight: "File workflow định nghĩa các bước tự động: checkout code, setup Node.js, install dependencies, và run tests."
    },
    {
      title: "Lập trình viên tạo Pull Request",
      description: "Triết tạo nhánh mới, sửa lỗi và tạo PR",
      explanation: "Lập trình viên tạo nhánh mới để sửa lỗi, commit thay đổi và đẩy lên GitHub. Sau đó tạo Pull Request từ nhánh của mình vào nhánh develop.",
      highlight: "Pull Request kích hoạt tự động workflow GitHub Actions."
    },
    {
      title: "GitHub Actions tự động thực thi",
      description: "Workflow tự động chạy khi có PR mới",
      explanation: "GitHub tự động phát hiện Pull Request và kích hoạt workflow. Trên trang PR, mục 'Checks' xuất hiện để hiển thị tiến trình chạy workflow.",
      highlight: "GitHub Actions thực hiện tuần tự: checkout code → setup Node.js → install dependencies → run tests."
    },
    {
      title: "Xem kết quả và ra quyết định",
      description: "Dựa trên kết quả tests để quyết định merge",
      explanation: "Nếu tests thành công, hiển thị dấu tick xanh và có thể merge. Nếu thất bại, hiển thị dấu X đỏ và cần sửa lỗi trước khi merge.",
      highlight: "GitHub Actions đóng vai trò 'người gác cổng' chất lượng tự động."
    }
  ];

  const workflowCode = `# .github/workflows/ci.yml
name: Node.js CI

# Kích hoạt workflow khi có Pull Request vào nhánh main hoặc develop
on:
  pull_request:
    branches: [ "main", "develop" ]

jobs:
  build-and-test:
    # Sử dụng máy ảo Ubuntu mới nhất để chạy
    runs-on: ubuntu-latest

    steps:
      # Bước 1: Lấy mã nguồn của Pull Request về máy ảo
      - name: Checkout repository code
        uses: actions/checkout@v3

      # Bước 2: Cài đặt môi trường Node.js phiên bản 18
      - name: Use Node.js 18.x
        uses: actions/setup-node@v3
        with:
          node-version: '18.x'
          cache: 'npm'

      # Bước 3: Cài đặt các thư viện cần thiết của dự án
      - name: Install dependencies
        run: npm install

      # Bước 4: Chạy các bài kiểm thử tự động
      - name: Run tests
        run: npm test`;

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

  const toggleWorkflowFile = () => {
    setShowWorkflowFile(!showWorkflowFile);
  };

  const simulateWorkflow = (status) => {
    setWorkflowStatus('running');
    setTimeout(() => {
      setWorkflowStatus(status);
    }, 2000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running':
        return '🟡';
      case 'success':
        return '✅';
      case 'failed':
        return '❌';
      default:
        return '⏳';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'running':
        return 'Đang chạy...';
      case 'success':
        return 'Tất cả tests đã thành công';
      case 'failed':
        return 'Một số tests đã thất bại';
      default:
        return 'Chờ chạy workflow';
    }
  };

  return (
    <div className="github-actions-demo">
      <header className="demo-header">
        <h1>Demo 5: Tự động Kiểm tra Chất lượng Code với GitHub Actions</h1>
        <p className="demo-scenario">
          <strong>Tình huống:</strong> Nhóm phát triển quy định mọi thay đổi được đưa vào nhánh develop 
          phải vượt qua tất cả các bài kiểm thử để đảm bảo không gây ra lỗi hồi quy. 
          Sử dụng GitHub Actions để tự động hóa quy trình này.
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

          {currentStep === 0 && (
            <div className="workflow-section">
              <h4>Nội dung file CI Workflow:</h4>
              <div className="workflow-file">
                <div className="file-header">
                  <span className="file-name">.github/workflows/ci.yml</span>
                  <button className="toggle-btn" onClick={toggleWorkflowFile}>
                    {showWorkflowFile ? 'Ẩn code' : 'Hiện code'}
                  </button>
                </div>
                
                {showWorkflowFile && (
                  <div className="workflow-content">
                    <pre className="workflow-code">
                      <code>{workflowCode}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="workflow-demo">
              <h4>Mô phỏng GitHub Actions:</h4>
              <div className="workflow-controls">
                <button 
                  className="simulate-btn success"
                  onClick={() => simulateWorkflow('success')}
                >
                  Mô phỏng Tests Thành công
                </button>
                <button 
                  className="simulate-btn failed"
                  onClick={() => simulateWorkflow('failed')}
                >
                  Mô phỏng Tests Thất bại
                </button>
              </div>
              
              <div className="workflow-status">
                <div className="status-item">
                  <span className="status-icon">{getStatusIcon(workflowStatus)}</span>
                  <span className="status-text">{getStatusText(workflowStatus)}</span>
                </div>
                
                {workflowStatus === 'running' && (
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                )}
              </div>
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

      <div className="github-interface">
        <h3>Giao diện Pull Request trên GitHub</h3>
        <div className="github-mockup">
          <div className="github-header">
            <div className="pr-title">
              <h4>Fix login validation bug</h4>
              <span className="pr-number">#123</span>
            </div>
            <div className="pr-status open">Open</div>
          </div>
          
          <div className="github-content">
            <div className="pr-description">
              <p>Fixed the login validation logic that was causing users to be unable to log in with valid credentials.</p>
            </div>
            
            <div className="checks-section">
              <h5>Checks</h5>
              <div className="check-item">
                <span className="check-icon">{getStatusIcon(workflowStatus)}</span>
                <span className="check-name">Node.js CI</span>
                <span className="check-status">{getStatusText(workflowStatus)}</span>
                {workflowStatus !== 'pending' && (
                  <button className="details-btn">Details</button>
                )}
              </div>
            </div>
            
            <div className="merge-section">
              <button 
                className={`merge-btn ${workflowStatus === 'success' ? 'enabled' : 'disabled'}`}
                disabled={workflowStatus !== 'success'}
              >
                {workflowStatus === 'success' ? 'Merge pull request' : 'Merge blocked'}
              </button>
              {workflowStatus === 'failed' && (
                <p className="merge-blocked">
                  Merge blocked by failing checks. Fix the issues and try again.
                </p>
              )}
            </div>
          </div>
        </div>
        <p className="github-description">
          Hình 5.5: Kết quả kiểm tra tự động của GitHub Actions trên một Pull Request. 
          Nút merge chỉ được kích hoạt khi tất cả checks đã thành công.
        </p>
      </div>

      <div className="benefits-section">
        <h3>Lợi ích của GitHub Actions trong bảo trì</h3>
        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-icon">🔍</div>
            <h4>Phát hiện lỗi sớm</h4>
            <p>Tìm ra lỗi ngay tại thời điểm đề xuất thay đổi, không để lọt vào nhánh chính</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">⏱️</div>
            <h4>Tiết kiệm thời gian</h4>
            <p>Giải phóng các thành viên khỏi công việc kiểm tra lặp đi lặp lại</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">🏆</div>
            <h4>Thúc đẩy văn hóa chất lượng</h4>
            <p>Khuyến khích lập trình viên viết code cẩn thận và có trách nhiệm hơn</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">🛡️</div>
            <h4>Bảo vệ nhánh chính</h4>
            <p>Ngăn chặn code lỗi được merge vào các nhánh quan trọng</p>
          </div>
        </div>
      </div>

      <div className="advanced-features">
        <h3>Các tính năng nâng cao</h3>
        <div className="features-list">
          <div className="feature-item">
            <h4>🔧 Matrix Builds</h4>
            <p>Test trên nhiều phiên bản Node.js, hệ điều hành khác nhau</p>
          </div>
          <div className="feature-item">
            <h4>📊 Code Coverage</h4>
            <p>Tự động tạo báo cáo độ phủ code và comment trên PR</p>
          </div>
          <div className="feature-item">
            <h4>🚀 Deployment</h4>
            <p>Tự động deploy sau khi merge vào nhánh main</p>
          </div>
          <div className="feature-item">
            <h4>🔔 Notifications</h4>
            <p>Gửi thông báo qua Slack, email khi có lỗi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubActionsDemo;
