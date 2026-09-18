/**
 * Online Calculator - Modern Single Page Application
 * Core Engine & Interactive UI Handling
 */

class CalculatorApp {
  constructor() {
    this.expression = '';
    this.result = '0';
    this.isEvaluated = false;
    this.isAngleRad = true; // true: Radian, false: Degree
    this.soundEnabled = localStorage.getItem('calc_sound') !== 'false';
    this.history = JSON.parse(localStorage.getItem('calc_history') || '[]');
    this.audioCtx = null;

    this.initDOMElements();
    this.initEventListeners();
    this.updateDisplay();
    this.renderHistory();
    this.updateSoundUI();
  }

  initDOMElements() {
    this.appContainer = document.querySelector('.calculator-app');
    this.displayExpression = document.getElementById('display-expression');
    this.displayResult = document.getElementById('display-result');
    this.scientificPanel = document.getElementById('scientific-panel');
    this.historyDrawer = document.getElementById('history-drawer');
    this.historyList = document.getElementById('history-list');
    this.toast = document.getElementById('toast');

    // Controls
    this.btnModeToggle = document.getElementById('btn-mode-toggle');
    this.btnHistoryToggle = document.getElementById('btn-history-toggle');
    this.btnSoundToggle = document.getElementById('btn-sound-toggle');
    this.btnClearHistory = document.getElementById('btn-clear-history');
    this.btnCopy = document.getElementById('btn-copy');
    this.degRadBtn = document.getElementById('deg-rad-btn');
    this.soundIconOn = document.getElementById('sound-icon-on');
    this.soundIconOff = document.getElementById('sound-icon-off');
  }

  initEventListeners() {
    // Mode toggle (Scientific / Standard)
    this.btnModeToggle.addEventListener('click', () => {
      this.playSound(440, 'sine', 0.05);
      this.scientificPanel.classList.toggle('active');
      this.appContainer.classList.toggle('scientific-active');
      this.btnModeToggle.classList.toggle('active');
    });

    // History drawer toggle
    this.btnHistoryToggle.addEventListener('click', () => {
      this.playSound(520, 'sine', 0.05);
      this.historyDrawer.classList.toggle('open');
      this.btnHistoryToggle.classList.toggle('active');
    });

    // Sound toggle
    this.btnSoundToggle.addEventListener('click', () => {
      this.soundEnabled = !this.soundEnabled;
      localStorage.setItem('calc_sound', this.soundEnabled);
      this.updateSoundUI();
      if (this.soundEnabled) this.playSound(600, 'sine', 0.05);
    });

    // Clear history
    this.btnClearHistory.addEventListener('click', () => {
      this.history = [];
      localStorage.setItem('calc_history', JSON.stringify([]));
      this.renderHistory();
      this.showToast('History cleared');
    });

    // Copy result
    this.btnCopy.addEventListener('click', () => {
      this.copyToClipboard();
    });

    // Deg / Rad toggle
    this.degRadBtn.addEventListener('click', () => {
      this.isAngleRad = !this.isAngleRad;
      this.degRadBtn.textContent = this.isAngleRad ? 'RAD' : 'DEG';
      this.playSound(500, 'triangle', 0.04);
      this.showToast(`Angle Mode: ${this.isAngleRad ? 'Radians' : 'Degrees'}`);
    });

    // Button clicks inside calculator card
    document.getElementById('calculator').addEventListener('click', (e) => {
      const btn = e.target.closest('.calc-btn');
      if (!btn) return;

      const action = btn.dataset.action;
      const num = btn.dataset.number;

      if (num !== undefined) {
        this.inputDigit(num);
      } else if (action) {
        this.handleAction(action);
      }

      this.triggerButtonFeedback(btn);
    });

    // Keyboard support
    window.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }

  // Audio Click Feedback Synthesis (No external audio files needed)
  playSound(freq = 400, type = 'sine', duration = 0.04) {
    if (!this.soundEnabled) return;
    try {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (err) {
      console.warn('Audio playback not permitted yet:', err);
    }
  }

  updateSoundUI() {
    if (this.soundEnabled) {
      this.soundIconOn.classList.remove('hidden');
      this.soundIconOff.classList.add('hidden');
      this.btnSoundToggle.classList.add('active');
    } else {
      this.soundIconOn.classList.add('hidden');
      this.soundIconOff.classList.remove('hidden');
      this.btnSoundToggle.classList.remove('active');
    }
  }

  triggerButtonFeedback(btn) {
    btn.classList.add('pressed');
    setTimeout(() => btn.classList.remove('pressed'), 120);
  }

  // Action Handling
  handleAction(action) {
    switch (action) {
      case 'clear':
        this.playSound(350, 'square', 0.05);
        this.clearAll();
        break;
      case 'backspace':
        this.playSound(380, 'sine', 0.04);
        this.backspace();
        break;
      case 'decimal':
        this.playSound(450, 'sine', 0.04);
        this.inputDecimal();
        break;
      case 'parenthesis':
        this.playSound(460, 'sine', 0.04);
        this.inputParenthesis();
        break;
      case 'negate':
        this.playSound(460, 'sine', 0.04);
        this.toggleSign();
        break;
      case 'add':
        this.inputOperator('+');
        break;
      case 'subtract':
        this.inputOperator('-');
        break;
      case 'multiply':
        this.inputOperator('*');
        break;
      case 'divide':
        this.inputOperator('/');
        break;
      case 'calculate':
        this.playSound(650, 'triangle', 0.08);
        this.calculate();
        break;

      // Scientific Actions
      case 'sin':
      case 'cos':
      case 'tan':
      case 'ln':
      case 'log':
      case 'sqrt':
        this.playSound(550, 'sine', 0.05);
        this.inputFunction(action);
        break;
      case 'square':
        this.playSound(520, 'sine', 0.04);
        this.inputSquare();
        break;
      case 'power':
        this.playSound(520, 'sine', 0.04);
        this.inputOperator('^');
        break;
      case 'pi':
        this.playSound(480, 'sine', 0.04);
        this.inputConstant('π');
        break;
      case 'e':
        this.playSound(480, 'sine', 0.04);
        this.inputConstant('e');
        break;
      case 'fact':
        this.playSound(520, 'sine', 0.04);
        this.inputFactorial();
        break;
      default:
        break;
    }
  }

  inputDigit(digit) {
    this.playSound(480 + parseInt(digit) * 20, 'sine', 0.03);

    if (this.isEvaluated) {
      this.expression = '';
      this.isEvaluated = false;
    }

    if (this.expression === '0') {
      this.expression = digit;
    } else {
      this.expression += digit;
    }
    this.updateDisplay();
  }

  inputDecimal() {
    if (this.isEvaluated) {
      this.expression = '0.';
      this.isEvaluated = false;
      this.updateDisplay();
      return;
    }

    if (!this.expression) {
      this.expression = '0.';
      this.updateDisplay();
      return;
    }

    // Check last number segment to prevent double decimals
    const segments = this.expression.split(/[+\-*/^()]/);
    const lastSegment = segments[segments.length - 1];

    if (!lastSegment.includes('.')) {
      if (lastSegment === '') {
        this.expression += '0.';
      } else {
        this.expression += '.';
      }
      this.updateDisplay();
    }
  }

  inputOperator(op) {
    this.playSound(500, 'sine', 0.04);

    if (this.isEvaluated) {
      this.isEvaluated = false;
      this.expression = this.result;
    }

    if (!this.expression) {
      if (op === '-') {
        this.expression = '-';
      }
      this.updateDisplay();
      return;
    }

    const lastChar = this.expression.slice(-1);
    if (['+', '-', '*', '/', '^'].includes(lastChar)) {
      // Replace operator with new one
      this.expression = this.expression.slice(0, -1) + op;
    } else {
      this.expression += op;
    }
    this.updateDisplay();
  }

  inputParenthesis() {
    if (this.isEvaluated) {
      this.expression = '';
      this.isEvaluated = false;
    }

    const openCount = (this.expression.match(/\(/g) || []).length;
    const closeCount = (this.expression.match(/\)/g) || []).length;
    const lastChar = this.expression.slice(-1);

    if (openCount > closeCount && !['+', '-', '*', '/', '^', '(', ''].includes(lastChar)) {
      this.expression += ')';
    } else {
      if (/\d|\)|π|e$/.test(this.expression)) {
        this.expression += '*(';
      } else {
        this.expression += '(';
      }
    }
    this.updateDisplay();
  }

  toggleSign() {
    if (this.isEvaluated) {
      this.expression = this.result;
      this.isEvaluated = false;
    }

    if (!this.expression) {
      this.expression = '-';
      this.updateDisplay();
      return;
    }

    // Toggle sign of current expression or last token
    if (this.expression.startsWith('-(') && this.expression.endsWith(')')) {
      this.expression = this.expression.slice(2, -1);
    } else if (this.expression.startsWith('-') && !/[+\-*/^]/.test(this.expression.slice(1))) {
      this.expression = this.expression.slice(1);
    } else {
      this.expression = `-(${this.expression})`;
    }
    this.updateDisplay();
  }

  inputFunction(funcName) {
    if (this.isEvaluated) {
      this.expression = '';
      this.isEvaluated = false;
    }

    if (/\d|\)|π|e$/.test(this.expression)) {
      this.expression += `*${funcName}(`;
    } else {
      this.expression += `${funcName}(`;
    }
    this.updateDisplay();
  }

  inputConstant(constant) {
    if (this.isEvaluated) {
      this.expression = '';
      this.isEvaluated = false;
    }

    if (/\d|\)|π|e$/.test(this.expression)) {
      this.expression += `*${constant}`;
    } else {
      this.expression += constant;
    }
    this.updateDisplay();
  }

  inputSquare() {
    if (this.isEvaluated) {
      this.expression = this.result;
      this.isEvaluated = false;
    }
    if (this.expression) {
      this.expression += '^2';
      this.updateDisplay();
    }
  }

  inputFactorial() {
    if (this.isEvaluated) {
      this.expression = this.result;
      this.isEvaluated = false;
    }
    if (this.expression && !['+', '-', '*', '/', '^', '('].includes(this.expression.slice(-1))) {
      this.expression += '!';
      this.updateDisplay();
    }
  }

  clearAll() {
    this.expression = '';
    this.result = '0';
    this.isEvaluated = false;
    this.updateDisplay();
  }

  backspace() {
    if (this.isEvaluated) {
      this.clearAll();
      return;
    }

    // Handle backspacing multi-character functions e.g. "sin(", "sqrt("
    const multiCharFuncs = ['sin(', 'cos(', 'tan(', 'ln(', 'log(', 'sqrt('];
    for (const fn of multiCharFuncs) {
      if (this.expression.endsWith(fn)) {
        this.expression = this.expression.slice(0, -fn.length);
        this.updateDisplay();
        return;
      }
    }

    this.expression = this.expression.slice(0, -1);
    this.updateDisplay();
  }

  // Math Evaluation Engine
  calculate() {
    if (!this.expression) return;

    try {
      let rawExp = this.expression;

      // Automatically close unmatched parentheses
      const openCount = (rawExp.match(/\(/g) || []).length;
      const closeCount = (rawExp.match(/\)/g) || []).length;
      if (openCount > closeCount) {
        rawExp += ')'.repeat(openCount - closeCount);
      }

      const calculatedValue = this.evaluateExpression(rawExp);

      if (isNaN(calculatedValue) || !isFinite(calculatedValue)) {
        this.result = 'Error';
      } else {
        this.result = this.formatResult(calculatedValue);
        this.addToHistory(this.expression, this.result);
      }

      this.isEvaluated = true;
      this.updateDisplay();
    } catch (err) {
      console.error('Calculation error:', err);
      this.result = 'Error';
      this.isEvaluated = true;
      this.updateDisplay();
    }
  }

  evaluateExpression(expr) {
    let parsed = expr;

    // Handle factorial n!
    parsed = parsed.replace(/(\d+(\.\d+)?)!/g, (_, num) => {
      return this.factorial(Number(num));
    });

    // Replace constants
    parsed = parsed.replace(/π/g, 'Math.PI');
    parsed = parsed.replace(/\be\b/g, 'Math.E');

    // Power operator x^y => x ** y
    parsed = parsed.replace(/\^/g, '**');

    // Replace Logarithms & Roots
    parsed = parsed.replace(/\blog\(/g, 'Math.log10(');
    parsed = parsed.replace(/\bln\(/g, 'Math.log(');
    parsed = parsed.replace(/\bsqrt\(/g, 'Math.sqrt(');

    // Trig functions with degree/radian support
    const isRad = this.isAngleRad;
    const sinFn = (x) => isRad ? Math.sin(x) : Math.sin(x * Math.PI / 180);
    const cosFn = (x) => isRad ? Math.cos(x) : Math.cos(x * Math.PI / 180);
    const tanFn = (x) => isRad ? Math.tan(x) : Math.tan(x * Math.PI / 180);

    // Replace sin(, cos(, tan( with internal scoped wrappers
    parsed = parsed.replace(/\bsin\(/g, '__sin(');
    parsed = parsed.replace(/\bcos\(/g, '__cos(');
    parsed = parsed.replace(/\btan\(/g, '__tan(');

    // Safe execution sandbox
    const evalFn = new Function('__sin', '__cos', '__tan', 'Math', `
      'use strict';
      try {
        return (${parsed});
      } catch(e) {
        return NaN;
      }
    `);

    return evalFn(sinFn, cosFn, tanFn, Math);
  }

  factorial(n) {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  }

  formatResult(val) {
    if (Math.abs(val) > 1e12 || (Math.abs(val) < 1e-6 && val !== 0)) {
      return Number(val.toPrecision(8)).toExponential();
    }
    // Round floating precision artifacts (e.g. 0.1 + 0.2)
    return parseFloat(val.toFixed(10)).toString();
  }

  // Display and History Rendering
  formatExpressionDisplay(str) {
    if (!str) return '';
    return str
      .replace(/\*/g, ' × ')
      .replace(/\//g, ' ÷ ')
      .replace(/\+/g, ' + ')
      .replace(/-/g, ' − ')
      .replace(/\^/g, ' ^ ');
  }

  updateDisplay() {
    this.displayExpression.textContent = this.formatExpressionDisplay(this.expression);
    this.displayResult.textContent = this.isEvaluated ? this.result : (this.expression ? this.expression.slice(-15) : '0');
  }

  addToHistory(exp, res) {
    this.history.unshift({ exp, res });
    if (this.history.length > 30) this.history.pop();
    localStorage.setItem('calc_history', JSON.stringify(this.history));
    this.renderHistory();
  }

  renderHistory() {
    if (this.history.length === 0) {
      this.historyList.innerHTML = '<div class="history-empty">No calculation history yet</div>';
      return;
    }

    this.historyList.innerHTML = this.history.map((item, idx) => `
      <div class="history-item" data-index="${idx}">
        <span class="history-exp">${this.formatExpressionDisplay(item.exp)} =</span>
        <span class="history-res">${item.res}</span>
      </div>
    `).join('');

    // Clicking history item restores calculation
    this.historyList.querySelectorAll('.history-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = el.dataset.index;
        const item = this.history[idx];
        if (item) {
          this.expression = item.res;
          this.result = item.res;
          this.isEvaluated = true;
          this.updateDisplay();
          this.historyDrawer.classList.remove('open');
          this.btnHistoryToggle.classList.remove('active');
          this.playSound(480, 'sine', 0.05);
          this.showToast('Restored from history');
        }
      });
    });
  }

  copyToClipboard() {
    const textToCopy = this.isEvaluated ? this.result : (this.expression || '0');
    navigator.clipboard.writeText(textToCopy).then(() => {
      this.playSound(600, 'sine', 0.04);
      this.showToast(`Copied "${textToCopy}"`);
    }).catch(() => {
      this.showToast('Could not copy to clipboard');
    });
  }

  showToast(message) {
    this.toast.textContent = message;
    this.toast.classList.add('show');
    setTimeout(() => {
      this.toast.classList.remove('show');
    }, 2200);
  }

  // Physical Keyboard Handling
  handleKeyboard(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key >= '0' && e.key <= '9') {
      e.preventDefault();
      this.inputDigit(e.key);
      this.highlightButton(`[data-number="${e.key}"]`);
    } else if (e.key === '.') {
      e.preventDefault();
      this.inputDecimal();
      this.highlightButton('[data-action="decimal"]');
    } else if (e.key === '+') {
      e.preventDefault();
      this.inputOperator('+');
      this.highlightButton('[data-action="add"]');
    } else if (e.key === '-') {
      e.preventDefault();
      this.inputOperator('-');
      this.highlightButton('[data-action="subtract"]');
    } else if (e.key === '*') {
      e.preventDefault();
      this.inputOperator('*');
      this.highlightButton('[data-action="multiply"]');
    } else if (e.key === '/') {
      e.preventDefault();
      this.inputOperator('/');
      this.highlightButton('[data-action="divide"]');
    } else if (e.key === '^') {
      e.preventDefault();
      this.inputOperator('^');
    } else if (e.key === '(' || e.key === ')') {
      e.preventDefault();
      this.inputParenthesis();
      this.highlightButton('[data-action="parenthesis"]');
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      this.calculate();
      this.highlightButton('[data-action="calculate"]');
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      this.backspace();
      this.highlightButton('#btn-backspace');
    } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
      e.preventDefault();
      this.clearAll();
      this.highlightButton('#btn-clear');
    }
  }

  highlightButton(selector) {
    const btn = document.querySelector(selector);
    if (btn) {
      this.triggerButtonFeedback(btn);
    }
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.calculator = new CalculatorApp();
});
