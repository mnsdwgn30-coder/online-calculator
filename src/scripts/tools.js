/**
 * Extra Tools & FAQ Accordion Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initToolsTabs();
  initTrigThetaCalculator();
  initPercentageCalculator();
  initDiscountCalculator();
  initUnitConverter();
  initBMICalculator();
  initAgeCalculator();
  initFaqAccordion();
});

// Tools Tab Switching
function initToolsTabs() {
  const tabs = document.querySelectorAll('.tool-tab-btn');
  const panels = document.querySelectorAll('.tool-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.target;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

// 0. Trigonometric Theta (θ) Calculator & Ratio Finder
function initTrigThetaCalculator() {
  const angleInput = document.getElementById('trig-angle');
  const unitSelect = document.getElementById('trig-unit');
  const unitLabel = document.getElementById('trig-unit-label');
  const presetBtns = document.querySelectorAll('.theta-preset-btn');

  const sinExact = document.getElementById('ratio-sin-exact');
  const sinDec = document.getElementById('ratio-sin-dec');
  const cosExact = document.getElementById('ratio-cos-exact');
  const cosDec = document.getElementById('ratio-cos-dec');
  const tanExact = document.getElementById('ratio-tan-exact');
  const tanDec = document.getElementById('ratio-tan-dec');
  const cscExact = document.getElementById('ratio-csc-exact');
  const cscDec = document.getElementById('ratio-csc-dec');
  const secExact = document.getElementById('ratio-sec-exact');
  const secDec = document.getElementById('ratio-sec-dec');
  const cotExact = document.getElementById('ratio-cot-exact');
  const cotDec = document.getElementById('ratio-cot-dec');

  // Exact Values Reference Map for Standard Angles (in Degrees)
  const exactMap = {
    0: { sin: '0', cos: '1', tan: '0', csc: 'Undefined (∞)', sec: '1', cot: 'Undefined (∞)' },
    30: { sin: '1/2', cos: '√3 / 2', tan: '1 / √3', csc: '2', sec: '2 / √3', cot: '√3' },
    45: { sin: '1 / √2', cos: '1 / √2', tan: '1', csc: '√2', sec: '√2', cot: '1' },
    60: { sin: '√3 / 2', cos: '1/2', tan: '√3', csc: '2 / √3', sec: '2', cot: '1 / √3' },
    90: { sin: '1', cos: '0', tan: 'Undefined (∞)', csc: '1', sec: 'Undefined (∞)', cot: '0' },
    120: { sin: '√3 / 2', cos: '-1/2', tan: '-√3', csc: '2 / √3', sec: '-2', cot: '-1 / √3' },
    135: { sin: '1 / √2', cos: '-1 / √2', tan: '-1', csc: '√2', sec: '-√2', cot: '-1' },
    150: { sin: '1/2', cos: '-√3 / 2', tan: '-1 / √3', csc: '2', sec: '-2 / √3', cot: '-√3' },
    180: { sin: '0', cos: '-1', tan: '0', csc: 'Undefined (∞)', sec: '-1', cot: 'Undefined (∞)' },
    270: { sin: '-1', cos: '0', tan: 'Undefined (∞)', csc: '-1', sec: 'Undefined (∞)', cot: '0' },
    360: { sin: '0', cos: '1', tan: '0', csc: 'Undefined (∞)', sec: '1', cot: 'Undefined (∞)' }
  };

  function update() {
    if (!angleInput || !unitSelect) return;
    const isDeg = unitSelect.value === 'deg';
    if (unitLabel) unitLabel.textContent = isDeg ? '°' : 'rad';

    const rawAngle = parseFloat(angleInput.value);
    if (isNaN(rawAngle)) return;

    // Normalize to Radians for calculation
    const rad = isDeg ? (rawAngle * Math.PI) / 180 : rawAngle;
    const degNorm = isDeg ? ((rawAngle % 360) + 360) % 360 : ((rawAngle * 180 / Math.PI) % 360 + 360) % 360;

    const sinVal = Math.sin(rad);
    const cosVal = Math.cos(rad);
    const tanVal = Math.abs(cosVal) < 1e-12 ? (sinVal > 0 ? Infinity : -Infinity) : Math.tan(rad);
    const cscVal = Math.abs(sinVal) < 1e-12 ? Infinity : 1 / sinVal;
    const secVal = Math.abs(cosVal) < 1e-12 ? Infinity : 1 / cosVal;
    const cotVal = Math.abs(tanVal) < 1e-12 ? Infinity : 1 / tanVal;

    // Check for exact matching standard angle
    const roundedDeg = Math.round(degNorm * 100) / 100;
    const exact = isDeg && exactMap[roundedDeg] ? exactMap[roundedDeg] : null;

    // Format Sin
    sinExact.textContent = exact ? exact.sin : formatFractionOrDec(sinVal);
    sinDec.textContent = `≈ ${formatDec(sinVal)}`;

    // Format Cos
    cosExact.textContent = exact ? exact.cos : formatFractionOrDec(cosVal);
    cosDec.textContent = `≈ ${formatDec(cosVal)}`;

    // Format Tan
    if (exact && exact.tan.startsWith('Undefined')) {
      tanExact.textContent = 'Undefined (∞)';
      tanDec.textContent = 'Asymptote';
    } else {
      tanExact.textContent = exact ? exact.tan : formatFractionOrDec(tanVal);
      tanDec.textContent = Math.abs(cosVal) < 1e-12 ? 'Undefined' : `≈ ${formatDec(tanVal)}`;
    }

    // Format Csc (cosec)
    if (Math.abs(sinVal) < 1e-12) {
      cscExact.textContent = 'Undefined (∞)';
      cscDec.textContent = 'Asymptote';
    } else {
      cscExact.textContent = exact ? exact.csc : formatFractionOrDec(cscVal);
      cscDec.textContent = `≈ ${formatDec(cscVal)}`;
    }

    // Format Sec
    if (Math.abs(cosVal) < 1e-12) {
      secExact.textContent = 'Undefined (∞)';
      secDec.textContent = 'Asymptote';
    } else {
      secExact.textContent = exact ? exact.sec : formatFractionOrDec(secVal);
      secDec.textContent = `≈ ${formatDec(secVal)}`;
    }

    // Format Cot
    if (Math.abs(sinVal) < 1e-12 && isDeg && (roundedDeg === 0 || roundedDeg === 180 || roundedDeg === 360)) {
      cotExact.textContent = 'Undefined (∞)';
      cotDec.textContent = 'Asymptote';
    } else if (Math.abs(cosVal) < 1e-12) {
      cotExact.textContent = '0';
      cotDec.textContent = '≈ 0.0000';
    } else {
      cotExact.textContent = exact ? exact.cot : formatFractionOrDec(cotVal);
      cotDec.textContent = `≈ ${formatDec(cotVal)}`;
    }
  }

  function formatDec(val) {
    if (!isFinite(val)) return 'Undefined';
    if (Math.abs(val) < 1e-12) return '0.0000';
    return val.toFixed(4);
  }

  function formatFractionOrDec(val) {
    if (!isFinite(val)) return 'Undefined';
    if (Math.abs(val) < 1e-12) return '0';
    if (Math.abs(val - 1) < 1e-6) return '1';
    if (Math.abs(val + 1) < 1e-6) return '-1';
    if (Math.abs(val - 0.5) < 1e-6) return '1/2';
    if (Math.abs(val + 0.5) < 1e-6) return '-1/2';
    return val.toFixed(4);
  }

  // Event Listeners
  if (angleInput && unitSelect) {
    angleInput.addEventListener('input', () => {
      presetBtns.forEach(btn => btn.classList.remove('active'));
      update();
    });

    unitSelect.addEventListener('change', () => {
      update();
    });

    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        unitSelect.value = 'deg';
        angleInput.value = btn.dataset.angle;
        update();
      });
    });

    update();
  }
}

// 1. Percentage Calculator
function initPercentageCalculator() {
  const valInput = document.getElementById('perc-val');
  const totalInput = document.getElementById('perc-total');
  const resultDisplay = document.getElementById('perc-result');

  function calculate() {
    if (!valInput || !totalInput || !resultDisplay) return;
    const val = parseFloat(valInput.value) || 0;
    const total = parseFloat(totalInput.value) || 0;
    const res = (val / 100) * total;
    resultDisplay.textContent = Number.isInteger(res) ? res : res.toFixed(2);
  }

  if (valInput && totalInput) {
    valInput.addEventListener('input', calculate);
    totalInput.addEventListener('input', calculate);
    calculate();
  }
}

// 2. Discount & GST Calculator
function initDiscountCalculator() {
  const priceInput = document.getElementById('disc-price');
  const percentInput = document.getElementById('disc-percent');
  const gstInput = document.getElementById('disc-gst');
  const savedDisplay = document.getElementById('disc-saved');
  const finalDisplay = document.getElementById('disc-final');

  function calculate() {
    if (!priceInput || !savedDisplay || !finalDisplay) return;
    const price = parseFloat(priceInput.value) || 0;
    const discount = parseFloat(percentInput?.value) || 0;
    const gst = parseFloat(gstInput?.value) || 0;

    const discountAmount = (discount / 100) * price;
    const discountedPrice = price - discountAmount;
    const gstAmount = (gst / 100) * discountedPrice;
    const finalPrice = discountedPrice + gstAmount;

    savedDisplay.textContent = `₹${discountAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
    finalDisplay.textContent = `₹${finalPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
  }

  if (priceInput && percentInput && gstInput) {
    priceInput.addEventListener('input', calculate);
    percentInput.addEventListener('input', calculate);
    gstInput.addEventListener('input', calculate);
    calculate();
  }
}

// 3. Unit Converter
function initUnitConverter() {
  const categorySelect = document.getElementById('unit-category');
  const fromValInput = document.getElementById('unit-from-val');
  const fromTypeSelect = document.getElementById('unit-from-type');
  const toTypeSelect = document.getElementById('unit-to-type');
  const resultDisplay = document.getElementById('unit-result');

  const unitOptions = {
    length: [
      { val: 'm', label: 'Meters (m)' },
      { val: 'km', label: 'Kilometers (km)' },
      { val: 'cm', label: 'Centimeters (cm)' },
      { val: 'ft', label: 'Feet (ft)' },
      { val: 'inch', label: 'Inches (in)' },
      { val: 'mile', label: 'Miles (mi)' }
    ],
    weight: [
      { val: 'kg', label: 'Kilograms (kg)' },
      { val: 'g', label: 'Grams (g)' },
      { val: 'lb', label: 'Pounds (lb)' },
      { val: 'oz', label: 'Ounces (oz)' }
    ],
    temp: [
      { val: 'c', label: 'Celsius (°C)' },
      { val: 'f', label: 'Fahrenheit (°F)' },
      { val: 'k', label: 'Kelvin (K)' }
    ]
  };

  const toMeters = { m: 1, km: 1000, cm: 0.01, ft: 0.3048, inch: 0.0254, mile: 1609.34 };
  const toKg = { kg: 1, g: 0.001, lb: 0.453592, oz: 0.0283495 };

  function updateSelects() {
    if (!categorySelect || !fromTypeSelect || !toTypeSelect) return;
    const cat = categorySelect.value;
    const options = unitOptions[cat] || unitOptions.length;

    fromTypeSelect.innerHTML = options.map((opt, i) => `<option value="${opt.val}" ${i === 0 ? 'selected' : ''}>${opt.label}</option>`).join('');
    toTypeSelect.innerHTML = options.map((opt, i) => `<option value="${opt.val}" ${i === 1 ? 'selected' : ''}>${opt.label}</option>`).join('');
    convert();
  }

  function convert() {
    if (!fromValInput || !fromTypeSelect || !toTypeSelect || !resultDisplay) return;
    const val = parseFloat(fromValInput.value) || 0;
    const cat = categorySelect.value;
    const from = fromTypeSelect.value;
    const to = toTypeSelect.value;

    let res = 0;

    if (cat === 'length') {
      const meters = val * toMeters[from];
      res = meters / toMeters[to];
    } else if (cat === 'weight') {
      const kg = val * toKg[from];
      res = kg / toKg[to];
    } else if (cat === 'temp') {
      if (from === to) res = val;
      else if (from === 'c' && to === 'f') res = (val * 9/5) + 32;
      else if (from === 'c' && to === 'k') res = val + 273.15;
      else if (from === 'f' && to === 'c') res = (val - 32) * 5/9;
      else if (from === 'f' && to === 'k') res = (val - 32) * 5/9 + 273.15;
      else if (from === 'k' && to === 'c') res = val - 273.15;
      else if (from === 'k' && to === 'f') res = (val - 273.15) * 9/5 + 32;
    }

    resultDisplay.textContent = `${parseFloat(res.toFixed(4))} ${to.toUpperCase()}`;
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', updateSelects);
    fromValInput?.addEventListener('input', convert);
    fromTypeSelect?.addEventListener('change', convert);
    toTypeSelect?.addEventListener('change', convert);
    convert();
  }
}

// 4. BMI Calculator
function initBMICalculator() {
  const weightInput = document.getElementById('bmi-weight');
  const heightInput = document.getElementById('bmi-height');
  const scoreDisplay = document.getElementById('bmi-score');
  const categoryDisplay = document.getElementById('bmi-category');

  function calculate() {
    if (!weightInput || !heightInput || !scoreDisplay || !categoryDisplay) return;
    const weight = parseFloat(weightInput.value) || 0;
    const heightCm = parseFloat(heightInput.value) || 0;

    if (weight <= 0 || heightCm <= 0) {
      scoreDisplay.textContent = '--';
      categoryDisplay.textContent = '--';
      return;
    }

    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);
    scoreDisplay.textContent = bmi.toFixed(1);

    if (bmi < 18.5) {
      categoryDisplay.textContent = 'Underweight';
      categoryDisplay.style.color = '#38bdf8';
    } else if (bmi < 25) {
      categoryDisplay.textContent = 'Normal Weight';
      categoryDisplay.style.color = '#22c55e';
    } else if (bmi < 30) {
      categoryDisplay.textContent = 'Overweight';
      categoryDisplay.style.color = '#eab308';
    } else {
      categoryDisplay.textContent = 'Obese';
      categoryDisplay.style.color = '#ef4444';
    }
  }

  if (weightInput && heightInput) {
    weightInput.addEventListener('input', calculate);
    heightInput.addEventListener('input', calculate);
    calculate();
  }
}

// 5. Age Calculator
function initAgeCalculator() {
  const dobInput = document.getElementById('age-dob');
  const resultDisplay = document.getElementById('age-result');
  const nextBdayDisplay = document.getElementById('age-next-bday');

  function calculate() {
    if (!dobInput || !resultDisplay || !nextBdayDisplay) return;
    const dobValue = dobInput.value;
    if (!dobValue) return;

    const dob = new Date(dobValue);
    const today = new Date();

    if (dob > today) {
      resultDisplay.textContent = 'Invalid Date';
      nextBdayDisplay.textContent = '--';
      return;
    }

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    resultDisplay.textContent = `${years} Yrs, ${months} Mos, ${days} Days`;

    // Next birthday calculation
    const nextBday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (nextBday < today) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    const diffTime = Math.abs(nextBday - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    nextBdayDisplay.textContent = `${diffDays} Days Left`;
  }

  if (dobInput) {
    dobInput.addEventListener('input', calculate);
    calculate();
  }
}

// FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
