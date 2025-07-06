import React from 'react'
import './Navbar.css'

const Navbar = ({ activeDemo, setActiveDemo }) => {
  const demos = [
    { id: 1, title: 'Demo 1: Hotfix', description: 'Sửa lỗi khẩn cấp' },
    { id: 2, title: 'Demo 2: Feature Branch', description: 'Phát triển tính năng mới' },
    { id: 3, title: 'Demo 3: Git Revert', description: 'Hoàn tác thay đổi' },
    { id: 4, title: 'Demo 4: Merge Conflict', description: 'Giải quyết xung đột' },
    { id: 5, title: 'Demo 5: GitHub Actions', description: 'Tự động hóa CI/CD' }
  ]

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Git Maintenance Demo</h1>
        <p>Minh họa các tính năng hỗ trợ bảo trì của Git</p>
      </div>
      <div className="navbar-menu">
        {demos.map(demo => (
          <button
            key={demo.id}
            className={`navbar-item ${activeDemo === demo.id ? 'active' : ''}`}
            onClick={() => setActiveDemo(demo.id)}
          >
            <div className="demo-title">{demo.title}</div>
            <div className="demo-description">{demo.description}</div>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
