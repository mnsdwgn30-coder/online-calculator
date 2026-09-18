/**
 * Online Calculator - Astro Client Script
 * Complete Mathematical Engine & Interactive Logic
 */

class CalculatorApp {
  constructor() {
    this.expression = '';
    this.result = '0';
    this.isEvaluated = false;
    this.isAngleRad = false; // Default to Degrees mode
    this.thetaVal = 30; // Default angle θ = 30°
    this.theme = localStorage.getItem('calc_theme') || 'dark';
    this.soundEnabled = localStorage.getItem('calc_sound') !== 'false';
    this.history = JSON.parse(localStorage.getItem('calc_history') || '[]');
    this.audioCtx = null;

    // Standard exact values map for standard angles (Degrees)
    this.exactThetaMap = {
      0: { sin: '0', cos: '1', tan: '0', cot: 'Undefined (∞)' },
      30: { sin: '1/2', cos: '√3/2', tan: '1/√3', cot: '√3' },
      45: { sin: '1/√2', cos: '1/√2', tan: '1', cot: '1' },
      60: { sin: '√3/2', cos: '1/2', tan: '√3', cot: '1/√3' },
      90: { sin: '1', cos: '0', tan: 'Undefined (∞)', cot: '0' },
      120: { sin: '√3/2', cos: '-1/2', tan: '-√3', cot: '-1/√3' },
      135: { sin: '1/√2', cos: '-1/√2', tan: '-1', cot: '-1' },
      150: { sin: '1/2', cos: '-√3/2', tan: '-1/√3', cot: '-√3' },
      180: { sin: '0', cos: '-1', tan: '0', cot: 'Undefined (∞)' },
      270: { sin: '-1', cos: '0', tan: 'Undefined (∞)', cot: '0' },
      360: { sin: '0', cos: '1', tan: '0', cot: 'Undefined (∞)' }
    };

    this.initDOMElements();
    this.initEventListeners();
    this.updateDisplay();
    this.renderHistory();
    this.updateSoundUI();
    this.applyTheme(this.theme);
    this.updateThetaMaanValues();
    this.updateThetaPresetsUI();
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
    this.btnThemeToggle = document.getElementById('btn-theme-toggle');
    this.themeIconSun = document.getElementById('theme-icon-sun');
    this.themeIconMoon = document.getElementById('theme-icon-moon');
    this.btnModeToggle = document.getElementById('btn-mode-toggle');
    this.btnHistoryToggle = document.getElementById('btn-history-toggle');
    this.btnSoundToggle = document.getElementById('btn-sound-toggle');
    this.btnClearHistory = document.getElementById('btn-clear-history');
    this.btnCopy = document.getElementById('btn-copy');
    this.degRadBtn = document.getElementById('deg-rad-btn');
    this.soundIconOn = document.getElementById('sound-icon-on');
    this.soundIconOff = document.getElementById('sound-icon-off');

    // Theta (θ) Elements inside SCI
    this.sciThetaBox = document.getElementById('sci-theta-box');
    this.sciThetaInput = document.getElementById('sci-theta-input');
    this.sciThetaUnitLabel = document.getElementById('sci-theta-unit-label');
    this.sciPresetBtns = document.querySelectorAll('.sci-preset-btn');
    this.sciValCards = document.querySelectorAll('.sci-theta-val-card');
    this.sciSinExact = document.getElementById('sci-sin-exact');
    this.sciSinDec = document.getElementById('sci-sin-dec');
    this.sciCosExact = document.getElementById('sci-cos-exact');
    this.sciCosDec = document.getElementById('sci-cos-dec');
    this.sciTanExact = document.getElementById('sci-tan-exact');
    this.sciTanDec = document.getElementById('sci-tan-dec');
    this.sciCotExact = document.getElementById('sci-cot-exact');
    this.sciCotDec = document.getElementById('sci-cot-dec');
  }

  initEventListeners() {
    // Theme Toggle (Light / Dark)
    if (this.btnThemeToggle) {
      this.btnThemeToggle.addEventListener('click', () => {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('calc_theme', this.theme);
        this.applyTheme(this.theme);
        this.playSound(560, 'sine', 0.05);
      });
    }

    if (!this.btnModeToggle) return;

    // Scientific Mode Toggle
    this.btnModeToggle.addEventListener('click', () => {
      this.playSound(440, 'sine', 0.05);
      this.scientificPanel.classList.toggle('active');
      this.appContainer.classList.toggle('scientific-active');
      this.btnModeToggle.classList.toggle('active');
    });

    // History Drawer Toggle
    this.btnHistoryToggle.addEventListener('click', () => {
      this.playSound(520, 'sine', 0.05);
      this.historyDrawer.classList.toggle('open');
      this.btnHistoryToggle.classList.toggle('active');
    });

    // Sound Toggle
    this.btnSoundToggle.addEventListener('click', () => {
      this.soundEnabled = !this.soundEnabled;
      localStorage.setItem('calc_sound', this.soundEnabled);
      this.updateSoundUI();
      if (this.soundEnabled) this.playSound(600, 'sine', 0.05);
    });

    // Clear History
    this.btnClearHistory.addEventListener('click', () => {
      this.history = [];
      localStorage.setItem('calc_history', JSON.stringify([]));
      this.renderHistory();
      this.showToast('History cleared');
    });

    // Copy Result
    this.btnCopy.addEventListener('click', () => {
      this.copyToClipboard();
    });

    // RAD / DEG toggle
    if (this.degRadBtn) {
      this.degRadBtn.textContent = this.isAngleRad ? 'RAD' : 'DEG';
      this.degRadBtn.addEventListener('click', () => {
        this.isAngleRad = !this.isAngleRad;
        this.degRadBtn.textContent = this.isAngleRad ? 'RAD' : 'DEG';
        if (this.sciThetaUnitLabel) {
          this.sciThetaUnitLabel.textContent = this.isAngleRad ? 'rad' : '°';
        }
        this.updateThetaMaanValues();
        this.playSound(500, 'triangle', 0.04);
        this.showToast(`Angle Mode: ${this.isAngleRad ? 'Radians' : 'Degrees'}`);
      });
    }

    // Theta (θ) Input Listener
    if (this.sciThetaInput) {
      this.sciThetaInput.addEventListener('input', () => {
        const val = parseFloat(this.sciThetaInput.value);
        if (!isNaN(val)) {
          this.thetaVal = val;
          this.updateThetaPresetsUI();
          this.updateThetaMaanValues();
        }
      });
    }

    // Theta Presets (0°, 30°, 45°, 60°, 90°, 180°)
    if (this.sciPresetBtns) {
      this.sciPresetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const angle = parseFloat(btn.dataset.angle);
          if (!isNaN(angle)) {
            this.thetaVal = angle;
            if (this.sciThetaInput) this.sciThetaInput.value = angle;
            this.updateThetaPresetsUI();
            this.updateThetaMaanValues();
            this.playSound(520, 'sine', 0.04);
          }
        });
      });
    }

    // Live Theta Value Cards Click (Insert directly into calculation!)
    if (this.sciValCards) {
      this.sciValCards.forEach(card => {
        card.addEventListener('click', () => {
          const fn = card.dataset.trigFn;
          if (fn) {
            this.insertThetaFunctionResult(fn);
            this.playSound(580, 'triangle', 0.05);
          }
        });
      });
    }

    // Keypad Click Event Delegation
    const calcEl = document.getElementById('calculator');
    if (calcEl) {
      calcEl.addEventListener('click', (e) => {
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
    }

    // Keyboard Listeners
    window.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }

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
      console.warn('Audio feedback error:', err);
    }
  }

  updateSoundUI() {
    if (!this.soundIconOn || !this.soundIconOff) return;
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

  applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      if (this.themeIconSun) this.themeIconSun.classList.add('hidden');
      if (this.themeIconMoon) this.themeIconMoon.classList.remove('hidden');
    } else {
      document.body.classList.remove('light-theme');
      if (this.themeIconSun) this.themeIconSun.classList.remove('hidden');
      if (this.themeIconMoon) this.themeIconMoon.classList.add('hidden');
    }
  }

  triggerButtonFeedback(btn) {
    btn.classList.add('pressed');
    setTimeout(() => btn.classList.remove('pressed'), 120);
  }

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
      case 'cot':
      case 'sec':
      case 'csc':
      case 'ln':
      case 'log':
      case 'sqrt':
        this.playSound(550, 'sine', 0.05);
        this.inputFunction(action);
        break;
      case 'theta':
        this.inputTheta();
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

  inputTheta() {
    this.playSound(540, 'sine', 0.04);
    if (this.isEvaluated) {
      this.expression = '';
      this.isEvaluated = false;
    }

    // If expression ends with an open trig function like sin(, cos(, tan(, cot(, sec(, csc(
    if (/(sin|cos|tan|cot|sec|csc)\($/.test(this.expression)) {
      this.expression += 'θ)';
    } else if (/\d|\)|π|e|θ$/.test(this.expression)) {
      this.expression += '*θ';
    } else {
      this.expression += 'θ';
    }
    this.updateDisplay();
    this.showToast(`θ = ${this.thetaVal}${this.isAngleRad ? 'rad' : '°'} added`);
  }

  updateThetaMaanValues() {
    if (!this.sciSinExact) return;

    const raw = this.thetaVal;
    const isDeg = !this.isAngleRad;
    const rad = isDeg ? (raw * Math.PI) / 180 : raw;
    const degNorm = isDeg ? ((raw % 360) + 360) % 360 : ((raw * 180 / Math.PI) % 360 + 360) % 360;
    const roundedDeg = Math.round(degNorm * 100) / 100;
    const exact = isDeg && this.exactThetaMap[roundedDeg] ? this.exactThetaMap[roundedDeg] : null;

    const sinVal = Math.sin(rad);
    const cosVal = Math.cos(rad);
    const tanVal = Math.abs(cosVal) < 1e-12 ? (sinVal > 0 ? Infinity : -Infinity) : Math.tan(rad);
    const cotVal = Math.abs(tanVal) < 1e-12 ? Infinity : 1 / tanVal;

    const fmtDec = (n) => {
      if (!isFinite(n)) return 'Undefined';
      return parseFloat(n.toFixed(4)).toString();
    };

    // sin
    if (this.sciSinExact && this.sciSinDec) {
      this.sciSinExact.textContent = exact ? exact.sin : fmtDec(sinVal);
      this.sciSinDec.textContent = isFinite(sinVal) ? fmtDec(sinVal) : 'Undefined';
    }

    // cos
    if (this.sciCosExact && this.sciCosDec) {
      this.sciCosExact.textContent = exact ? exact.cos : fmtDec(cosVal);
      this.sciCosDec.textContent = isFinite(cosVal) ? fmtDec(cosVal) : 'Undefined';
    }

    // tan
    if (this.sciTanExact && this.sciTanDec) {
      if (exact && exact.tan.startsWith('Undefined')) {
        this.sciTanExact.textContent = 'Undefined (∞)';
        this.sciTanDec.textContent = '∞';
      } else {
        this.sciTanExact.textContent = exact ? exact.tan : fmtDec(tanVal);
        this.sciTanDec.textContent = isFinite(tanVal) ? fmtDec(tanVal) : 'Undefined';
      }
    }

    // cot
    if (this.sciCotExact && this.sciCotDec) {
      if (exact && exact.cot.startsWith('Undefined')) {
        this.sciCotExact.textContent = 'Undefined (∞)';
        this.sciCotDec.textContent = '∞';
      } else {
        this.sciCotExact.textContent = exact ? exact.cot : fmtDec(cotVal);
        this.sciCotDec.textContent = isFinite(cotVal) ? fmtDec(cotVal) : 'Undefined';
      }
    }
  }

  updateThetaPresetsUI() {
    if (!this.sciPresetBtns) return;
    this.sciPresetBtns.forEach(btn => {
      const a = parseFloat(btn.dataset.angle);
      if (a === this.thetaVal) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  insertThetaFunctionResult(fn) {
    if (this.isEvaluated) {
      this.expression = '';
      this.isEvaluated = false;
    }

    const isDeg = !this.isAngleRad;
    const rad = isDeg ? (this.thetaVal * Math.PI) / 180 : this.thetaVal;
    let val = 0;
    if (fn === 'sin') val = Math.sin(rad);
    else if (fn === 'cos') val = Math.cos(rad);
    else if (fn === 'tan') val = Math.tan(rad);
    else if (fn === 'cot') val = 1 / Math.tan(rad);

    const formattedVal = parseFloat(val.toFixed(4));

    if (/\d|\)|π|e|θ$/.test(this.expression)) {
      this.expression += `*${fn}(θ)`;
    } else {
      this.expression += `${fn}(θ)`;
    }

    this.updateDisplay();
    this.showToast(`Added ${fn}(θ) = ${formattedVal} (θ = ${this.thetaVal}${isDeg ? '°' : 'rad'})`);
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

    const multiCharFuncs = ['sin(', 'cos(', 'tan(', 'cot(', 'sec(', 'csc(', 'ln(', 'log(', 'sqrt('];
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

  calculate() {
    if (!this.expression) return;

    try {
      let rawExp = this.expression;

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

    // Replace Theta (θ) variable with current angle value
    parsed = parsed.replace(/θ/g, `(${this.thetaVal})`);

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
    const cotFn = (x) => {
      const t = tanFn(x);
      return Math.abs(t) < 1e-12 ? Infinity : 1 / t;
    };
    const secFn = (x) => {
      const c = cosFn(x);
      return Math.abs(c) < 1e-12 ? Infinity : 1 / c;
    };
    const cscFn = (x) => {
      const s = sinFn(x);
      return Math.abs(s) < 1e-12 ? Infinity : 1 / s;
    };

    parsed = parsed.replace(/\bsin\(/g, '__sin(');
    parsed = parsed.replace(/\bcos\(/g, '__cos(');
    parsed = parsed.replace(/\btan\(/g, '__tan(');
    parsed = parsed.replace(/\bcot\(/g, '__cot(');
    parsed = parsed.replace(/\bsec\(/g, '__sec(');
    parsed = parsed.replace(/\bcsc\(/g, '__csc(');

    const evalFn = new Function('__sin', '__cos', '__tan', '__cot', '__sec', '__csc', 'Math', `
      'use strict';
      try {
        return (${parsed});
      } catch(e) {
        return NaN;
      }
    `);

    return evalFn(sinFn, cosFn, tanFn, cotFn, secFn, cscFn, Math);
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
    return parseFloat(val.toFixed(10)).toString();
  }

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
    if (!this.displayExpression || !this.displayResult) return;
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
    if (!this.historyList) return;
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
    if (!this.toast) return;
    this.toast.textContent = message;
    this.toast.classList.add('show');
    setTimeout(() => {
      this.toast.classList.remove('show');
    }, 2200);
  }

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

// Initialize on client
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    new CalculatorApp();
  });
}
