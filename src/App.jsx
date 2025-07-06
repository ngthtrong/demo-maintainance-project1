import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import HotfixDemo from './components/HotfixDemo'
import FeatureDemo from './components/FeatureDemo'
import RevertDemo from './components/RevertDemo'
import MergeConflictDemo from './components/MergeConflictDemo'
import GitHubActionsDemo from './components/GitHubActionsDemo'

function App() {
  const [activeDemo, setActiveDemo] = useState(1)

  const renderDemo = () => {
    switch (activeDemo) {
      case 1:
        return <HotfixDemo />
      case 2:
        return <FeatureDemo />
      case 3:
        return <RevertDemo />
      case 4:
        return <MergeConflictDemo />
      case 5:
        return <GitHubActionsDemo />
      default:
        return <HotfixDemo />
    }
  }

  return (
    <div className="app">
      <Navbar activeDemo={activeDemo} setActiveDemo={setActiveDemo} />
      <main className="main-content">
        {renderDemo()}
      </main>
    </div>
  )
}

export default App
