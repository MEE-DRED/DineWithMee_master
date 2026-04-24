import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';

const TestDashboard = () => {
  const navigate = useNavigate();
  const [testResults, setTestResults] = useState({
    passed: [],
    failed: [],
    pending: [],
    all: []
  });
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const log = {
    add: (message, type = 'info') => {
      const timestamp = new Date().toLocaleTimeString();
      const line = `[${timestamp}] ${message}`;
      setLogs(prev => [...prev, { message: line, type }]);
    },
    pass: (msg) => log.add(`✅ ${msg}`, 'pass'),
    fail: (msg) => log.add(`❌ ${msg}`, 'fail'),
    warn: (msg) => log.add(`⚠️  ${msg}`, 'warn'),
    info: (msg) => log.add(`ℹ️  ${msg}`, 'info'),
    clear: () => setLogs([])
  };

  const updateTestResults = (result) => {
    setTestResults(prev => ({
      ...prev,
      ...result
    }));
  };

  const runAllTests = async () => {
    setIsRunning(true);
    log.clear();
    const newResults = { passed: [], failed: [], pending: [], all: [] };
    
    log.info('Starting comprehensive integration tests...');
    log.info(`Current page: ${window.location.pathname}`);
    
    await runPageSpecificTests(newResults);
    await runAPITests(newResults);
    await runDOMTests(newResults);
    
    log.info('All tests completed!');
    updateTestResults(newResults);
    setIsRunning(false);
  };

  const runPageSpecificTests = async (results) => {
    log.info('Testing page-specific integration...');
    
    const path = window.location.pathname;
    
    // Test dashboard specific
    if (path.includes('test-dashboard')) {
      results.passed.push('Test dashboard loaded');
      log.pass('Test dashboard loaded');
    }
    
    updateTestResults(results);
  };

  const runAPITests = async (results) => {
    log.info('Testing backend API connectivity...');
    
    try {
      const response = await fetch('http://localhost:5000/api/health', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        const data = await response.json();
        results.passed.push('Backend health check passed');
        log.pass(`Backend responding: ${data.message}`);
      } else {
        results.failed.push(`Backend returned status ${response.status}`);
        log.fail(`Backend returned status ${response.status}`);
      }
    } catch (error) {
      results.pending.push('Backend not available (database not configured)');
      log.warn(`Backend not available: ${error.message}`);
      log.info('This is expected if PostgreSQL is not set up. See guide for options.');
    }
    
    updateTestResults(results);
  };

  const runDOMTests = async (results) => {
    log.info('Testing DOM integration...');
    
    // Common elements
    const nav = document.querySelector('nav');
    if (nav) {
      results.passed.push('Navigation found');
      log.pass('Navigation found');
    } else {
      results.failed.push('Navigation not found');
      log.fail('Navigation not found');
    }
    
    // Storage
    try {
      localStorage.setItem('__test__', '1');
      localStorage.removeItem('__test__');
      results.passed.push('localStorage working');
      log.pass('localStorage working');
    } catch (e) {
      results.failed.push('localStorage not available');
      log.fail('localStorage not available');
    }
    
    // Stylesheets
    const styles = document.querySelectorAll('link[rel="stylesheet"]');
    if (styles.length > 0) {
      results.passed.push(`Found ${styles.length} stylesheets`);
      log.pass(`Found ${styles.length} stylesheets`);
    } else {
      results.failed.push('No stylesheets found');
      log.fail('No stylesheets found');
    }
    
    updateTestResults(results);
  };

  const downloadLogs = () => {
    const content = logs.map(l => l.message).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `integration-test-${new Date().toISOString().slice(0, 10)}.log`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearLogs = () => {
    log.clear();
    setTestResults({ passed: [], failed: [], pending: [], all: [] });
  };

  const passed = testResults.passed.length;
  const failed = testResults.failed.length;
  const pending = testResults.pending.length;
  const total = passed + failed + pending;
  const successRate = total > 0 ? Math.round((passed / total) * 100) : 0;

  useEffect(() => {
    log.info('Test dashboard loaded');
    log.info('Select a test option to begin');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dwm-green-deep to-dwm-green-mid text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-4">
            <span className="text-3xl">🍲</span>
            Dine With Mee - Integration Test Dashboard
          </h1>
          <p className="text-xl text-dwm-gold">Comprehensive frontend integration validation</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm border-2 border-dwm-gold/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{passed}</div>
            <div className="text-sm opacity-90">Tests Passed</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border-2 border-dwm-gold/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">{failed}</div>
            <div className="text-sm opacity-90">Tests Failed</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border-2 border-dwm-gold/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{pending}</div>
            <div className="text-sm opacity-90">Tests Pending</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border-2 border-dwm-gold/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-dwm-gold mb-2">{successRate}%</div>
            <div className="text-sm opacity-90">Success Rate</div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={runAllTests}
            disabled={isRunning}
            className="bg-dwm-gold text-dwm-green-deep px-6 py-3 rounded-lg font-bold hover:bg-dwm-gold-light transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? (
              <>
                <LoadingSpinner size="sm" className="inline mr-2" />
                Running Tests...
              </>
            ) : (
              '▶️ Run All Tests'
            )}
          </button>
          <button
            onClick={runPageSpecificTests}
            className="bg-dwm-gold text-dwm-green-deep px-6 py-3 rounded-lg font-bold hover:bg-dwm-gold-light transition-all transform hover:-translate-y-1"
          >
            📄 Test Current Page
          </button>
          <button
            onClick={runAPITests}
            className="bg-dwm-gold text-dwm-green-deep px-6 py-3 rounded-lg font-bold hover:bg-dwm-gold-light transition-all transform hover:-translate-y-1"
          >
            🔌 Test Backend
          </button>
          <button
            onClick={downloadLogs}
            className="bg-dwm-gold text-dwm-green-deep px-6 py-3 rounded-lg font-bold hover:bg-dwm-gold-light transition-all transform hover:-translate-y-1"
          >
            ⬇️ Download Reports
          </button>
          <button
            onClick={clearLogs}
            className="bg-dwm-gold text-dwm-green-deep px-6 py-3 rounded-lg font-bold hover:bg-dwm-gold-light transition-all transform hover:-translate-y-1"
          >
            🗑️ Clear Logs
          </button>
        </div>
        
        <div className="bg-black/30 backdrop-blur-sm border border-dwm-gold/30 rounded-xl p-6 mb-8 max-h-96 overflow-y-auto">
          <div className="font-mono text-sm space-y-1">
            {logs.length === 0 ? (
              <div className="text-blue-400">Waiting for tests to run... Click a button above to start.</div>
            ) : (
              logs.map((log, index) => (
                <div
                  key={index}
                  className={`${
                    log.type === 'pass' ? 'text-green-400' :
                    log.type === 'fail' ? 'text-red-400' :
                    log.type === 'warn' ? 'text-yellow-400' :
                    'text-blue-400'
                  }`}
                >
                  {log.message}
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="text-center border-t border-dwm-gold/20 pt-8">
          <p className="mb-4">
            Integration Testing Guide: <a href="/INTEGRATION_TESTING_GUIDE.md" target="_blank" className="text-dwm-gold hover:text-dwm-gold-light underline">View Full Guide</a>
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <button
              onClick={() => navigate('/')}
              className="text-dwm-gold hover:text-dwm-gold-light transition-colors"
            >
              🏠 Home
            </button>
            <button
              onClick={() => navigate('/login')}
              className="text-dwm-gold hover:text-dwm-gold-light transition-colors"
            >
              🔐 Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="text-dwm-gold hover:text-dwm-gold-light transition-colors"
            >
              📝 Sign Up
            </button>
            <button
              onClick={() => navigate('/marketplace')}
              className="text-dwm-gold hover:text-dwm-gold-light transition-colors"
            >
              🛒 Marketplace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDashboard;
