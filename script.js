(function () {
  "use strict";

  /* =========================================================
     i18n
     ========================================================= */
  const I18N = {
    en: {
      brandAria: "Subnet, home",
      heroEyebrow: "// live binary breakdown",
      heroTitle: "See the bits.<br>Own the subnet.",
      heroSub: "Type an address, drag the mask — watch exactly which bits belong to the network and which belong to the host, in real time.",
      tabCalc: "Calculator",
      tabQuiz: "Practice",
      labelIp: "IP Address",
      labelPrefix: "Prefix Length",
      labelBits: "Address bits",
      legendNetwork: "Network",
      legendHost: "Host",
      labelClassInfo: "Address info",
      diffEasy: "Easy",
      diffMedium: "Medium",
      diffHard: "Hard",
      statScore: "Score",
      statStreak: "Streak",
      statBest: "Best streak",
      btnCheck: "Check",
      btnNext: "Next question →",
      footerText: "Built for people who'd rather see the bits than memorize a chart.",
      errInvalidIp: "That doesn't look like a valid IPv4 address.",
      rlNetwork: "Network address",
      rlBroadcast: "Broadcast address",
      rlMask: "Subnet mask",
      rlWildcard: "Wildcard mask",
      rlUsable: "Usable hosts",
      rlRange: "Host range",
      rangeConnector: "to",
      footerCredit: 'Built by <a href="https://trustit.ir" target="_blank" rel="noopener">TrustIT.ir</a>',
      classPrivate: "private",
      classPublic: "public",
      classLoopback: "loopback",
      classLinkLocal: "link-local",
      classMulticast: "multicast",
      classReserved: "reserved / experimental",
      classInfoTemplate: (cls, scope) => `Class ${cls} address, ${scope}. /{cidr} spans {total} addresses, {usable} of them usable by hosts.`,
      given: "Given",
      quizNetwork: "What is the network address?",
      quizBroadcast: "What is the broadcast address?",
      quizMask: "What is the subnet mask, in dotted decimal?",
      quizWildcard: "What is the wildcard mask?",
      quizUsable: "How many usable host addresses does this subnet have?",
      quizFirst: "What is the first usable host address?",
      quizLast: "What is the last usable host address?",
      correct: "✓ Correct.",
      wrong: (ans) => `✗ Not quite — the answer was ${ans}`,
      emptyAnswer: "Type an answer first.",
    },
    fa: {
      brandAria: "ساب‌نت، صفحه اصلی",
      heroEyebrow: "// تحلیل زنده‌ی باینری",
      heroTitle: "بیت‌ها رو ببین.<br>ساب‌نت رو مال خودت کن.",
      heroSub: "یه آدرس بنویس، ماسک رو جابه‌جا کن — دقیقا ببین کدوم بیت‌ها مال شبکه‌ست و کدوم‌ها مال هاست، به‌صورت لحظه‌ای.",
      tabCalc: "محاسبه‌گر",
      tabQuiz: "تمرین",
      labelIp: "آدرس آی‌پی",
      labelPrefix: "طول پیشوند",
      labelBits: "بیت‌های آدرس",
      legendNetwork: "شبکه",
      legendHost: "هاست",
      labelClassInfo: "اطلاعات آدرس",
      diffEasy: "آسان",
      diffMedium: "متوسط",
      diffHard: "سخت",
      statScore: "امتیاز",
      statStreak: "پشت‌سرهم",
      statBest: "بهترین رکورد",
      btnCheck: "بررسی",
      btnNext: "سوال بعدی ←",
      footerText: "برای کسایی که ترجیح می‌دن بیت‌ها رو ببینن تا اینکه یه جدول رو حفظ کنن.",
      errInvalidIp: "این یه آدرس IPv4 معتبر به نظر نمی‌رسه.",
      rlNetwork: "آدرس شبکه",
      rlBroadcast: "آدرس broadcast",
      rlMask: "subnet mask",
      rlWildcard: "wildcard mask",
      rlUsable: "تعداد هاست قابل‌استفاده",
      rlRange: "بازه‌ی هاست",
      rangeConnector: "تا",
      footerCredit: 'ساخته شده توسط سایت <a href="https://trustit.ir" target="_blank" rel="noopener">TrustIT.ir</a>',
      classPrivate: "خصوصی",
      classPublic: "عمومی",
      classLoopback: "loopback",
      classLinkLocal: "link-local",
      classMulticast: "multicast",
      classReserved: "رزرو‌شده / آزمایشی",
      classInfoTemplate: (cls, scope) => `آدرس کلاس ${cls}، ${scope}. /{cidr} شامل {total} آدرسه که {usable} تاش برای هاست قابل استفاده‌ست.`,
      given: "داده‌شده",
      quizNetwork: "آدرس شبکه چیه؟",
      quizBroadcast: "آدرس broadcast چیه؟",
      quizMask: "subnet mask به‌صورت dotted decimal چیه؟",
      quizWildcard: "wildcard mask چیه؟",
      quizUsable: "این ساب‌نت چند تا آدرس هاست قابل‌استفاده داره؟",
      quizFirst: "اولین آدرس هاست قابل‌استفاده کدومه؟",
      quizLast: "آخرین آدرس هاست قابل‌استفاده کدومه؟",
      correct: "✓ درسته.",
      wrong: (ans) => `✗ نه دقیقا — جواب درست: ${ans}`,
      emptyAnswer: "اول یه جواب بنویس.",
    },
  };

  let lang = "en";
  const t = (key) => I18N[lang][key];

  function applyStaticTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = I18N[lang][key];
      if (typeof val === "string") el.innerHTML = val;
    });
  }

  function persianDigitsToLatin(str) {
    const map = { "۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9" };
    return str.replace(/[۰-۹]/g, (d) => map[d]);
  }

  /* =========================================================
     Subnet math engine
     ========================================================= */
  function parseIp(str) {
    const clean = persianDigitsToLatin(str.trim());
    const parts = clean.split(".");
    if (parts.length !== 4) return null;
    const octets = [];
    for (const p of parts) {
      if (!/^\d{1,3}$/.test(p)) return null;
      const n = parseInt(p, 10);
      if (n < 0 || n > 255) return null;
      octets.push(n);
    }
    return octets;
  }

  function octetsToInt(octets) {
    return ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0;
  }

  function intToIp(int) {
    return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join(".");
  }

  function maskFromCidr(cidr) {
    if (cidr === 0) return 0;
    return (0xFFFFFFFF << (32 - cidr)) >>> 0;
  }

  function calcSubnet(octets, cidr) {
    const ipInt = octetsToInt(octets);
    const mask = maskFromCidr(cidr);
    const wildcard = (~mask) >>> 0;
    const network = (ipInt & mask) >>> 0;
    const broadcast = (network | wildcard) >>> 0;
    const totalHosts = Math.pow(2, 32 - cidr);
    let usableHosts, firstHost, lastHost;
    if (cidr === 32) {
      usableHosts = 1; firstHost = network; lastHost = network;
    } else if (cidr === 31) {
      usableHosts = 2; firstHost = network; lastHost = broadcast;
    } else {
      usableHosts = totalHosts - 2;
      firstHost = (network + 1) >>> 0;
      lastHost = (broadcast - 1) >>> 0;
    }
    return {
      ipInt, mask, wildcard, network, broadcast, totalHosts, usableHosts, firstHost, lastHost,
      ipStr: octets.join("."),
      maskStr: intToIp(mask),
      wildcardStr: intToIp(wildcard),
      networkStr: intToIp(network),
      broadcastStr: intToIp(broadcast),
      firstHostStr: intToIp(firstHost),
      lastHostStr: intToIp(lastHost),
    };
  }

  function classify(octets) {
    const [a, b] = octets;
    let cls = "A";
    if (a >= 224 && a <= 239) cls = "D";
    else if (a >= 240) cls = "E";
    else if (a >= 192) cls = "C";
    else if (a >= 128) cls = "B";
    else cls = "A";

    let scopeKey = "classPublic";
    if (a === 10) scopeKey = "classPrivate";
    else if (a === 172 && b >= 16 && b <= 31) scopeKey = "classPrivate";
    else if (a === 192 && b === 168) scopeKey = "classPrivate";
    else if (a === 127) scopeKey = "classLoopback";
    else if (a === 169 && b === 254) scopeKey = "classLinkLocal";
    else if (cls === "D") scopeKey = "classMulticast";
    else if (cls === "E") scopeKey = "classReserved";

    return { cls, scopeKey };
  }

  /* =========================================================
     Bit grid rendering (signature element)
     ========================================================= */
  const bitGridEl = document.getElementById("bitGrid");

  function renderBitGrid(ipInt, cidr) {
    bitGridEl.innerHTML = "";
    for (let octet = 0; octet < 4; octet++) {
      for (let b = 0; b < 8; b++) {
        const globalIndex = octet * 8 + b;
        const bitVal = (ipInt >>> (31 - globalIndex)) & 1;
        const isNet = globalIndex < cidr;
        const div = document.createElement("div");
        div.className = "bit " + (isNet ? "net" : "host");
        div.textContent = bitVal;
        bitGridEl.appendChild(div);
      }
      if (octet < 3) {
        const gap = document.createElement("div");
        gap.className = "octet-gap";
        bitGridEl.appendChild(gap);
      }
    }
  }

  /* =========================================================
     Calculator wiring
     ========================================================= */
  const ipInput = document.getElementById("ipInput");
  const cidrRange = document.getElementById("cidrRange");
  const cidrValueLabel = document.getElementById("cidrValueLabel");
  const ipError = document.getElementById("ipError");
  const resultsGrid = document.getElementById("resultsGrid");
  const ipClassText = document.getElementById("ipClassText");
  const quickCidrsEl = document.getElementById("quickCidrs");

  const QUICK_CIDRS = [8, 16, 20, 24, 28, 30];
  QUICK_CIDRS.forEach((c) => {
    const btn = document.createElement("button");
    btn.textContent = "/" + c;
    btn.type = "button";
    btn.addEventListener("click", () => {
      cidrRange.value = c;
      updateCalculator();
    });
    quickCidrsEl.appendChild(btn);
  });

  function updateSliderFill() {
    const pct = (cidrRange.value / 32) * 100;
    cidrRange.style.setProperty("--fill", pct + "%");
  }

  function renderResultCell(labelKey, value) {
    const cell = document.createElement("div");
    cell.className = "result-cell";
    const rl = document.createElement("p");
    rl.className = "rl";
    rl.textContent = t(labelKey);
    const rv = document.createElement("p");
    rv.className = "rv";
    rv.textContent = value;
    cell.appendChild(rl);
    cell.appendChild(rv);
    return cell;
  }

  function renderRangeCell(labelKey, firstIp, lastIp) {
    const cell = document.createElement("div");
    cell.className = "result-cell";
    const rl = document.createElement("p");
    rl.className = "rl";
    rl.textContent = t(labelKey);

    const rv = document.createElement("div");
    rv.className = "range-value";
    const first = document.createElement("span");
    first.className = "range-ip";
    first.textContent = firstIp;
    const sep = document.createElement("span");
    sep.className = "range-sep";
    sep.textContent = t("rangeConnector");
    const last = document.createElement("span");
    last.className = "range-ip";
    last.textContent = lastIp;
    rv.appendChild(first);
    rv.appendChild(sep);
    rv.appendChild(last);

    cell.appendChild(rl);
    cell.appendChild(rv);
    return cell;
  }

  function updateCalculator() {
    const cidr = parseInt(cidrRange.value, 10);
    cidrValueLabel.textContent = "/" + cidr;
    updateSliderFill();

    const octets = parseIp(ipInput.value);
    if (!octets) {
      ipInput.classList.add("invalid");
      ipError.textContent = t("errInvalidIp");
      bitGridEl.innerHTML = "";
      resultsGrid.innerHTML = "";
      ipClassText.textContent = "";
      return;
    }
    ipInput.classList.remove("invalid");
    ipError.textContent = "";

    const r = calcSubnet(octets, cidr);
    renderBitGrid(r.ipInt, cidr);

    resultsGrid.innerHTML = "";
    resultsGrid.appendChild(renderResultCell("rlNetwork", r.networkStr));
    resultsGrid.appendChild(renderResultCell("rlBroadcast", r.broadcastStr));
    resultsGrid.appendChild(renderResultCell("rlMask", r.maskStr + " (/" + cidr + ")"));
    resultsGrid.appendChild(renderResultCell("rlWildcard", r.wildcardStr));
    resultsGrid.appendChild(renderResultCell("rlUsable", r.usableHosts.toLocaleString(lang === "fa" ? "fa-IR" : "en-US")));
    resultsGrid.appendChild(renderRangeCell("rlRange", r.firstHostStr, r.lastHostStr));

    const { cls, scopeKey } = classify(octets);
    const template = t("classInfoTemplate")(cls, t(scopeKey));
    ipClassText.textContent = template
      .replace("{cidr}", cidr)
      .replace("{total}", r.totalHosts.toLocaleString(lang === "fa" ? "fa-IR" : "en-US"))
      .replace("{usable}", r.usableHosts.toLocaleString(lang === "fa" ? "fa-IR" : "en-US"));
  }

  ipInput.addEventListener("input", updateCalculator);
  cidrRange.addEventListener("input", updateCalculator);

  /* =========================================================
     Tabs
     ========================================================= */
  const tabCalc = document.getElementById("tabCalc");
  const tabQuiz = document.getElementById("tabQuiz");
  const panelCalc = document.getElementById("panelCalc");
  const panelQuiz = document.getElementById("panelQuiz");

  function setTab(which) {
    const calcActive = which === "calc";
    tabCalc.classList.toggle("active", calcActive);
    tabQuiz.classList.toggle("active", !calcActive);
    tabCalc.setAttribute("aria-selected", calcActive);
    tabQuiz.setAttribute("aria-selected", !calcActive);
    panelCalc.classList.toggle("hidden", !calcActive);
    panelQuiz.classList.toggle("hidden", calcActive);
  }
  tabCalc.addEventListener("click", () => setTab("calc"));
  tabQuiz.addEventListener("click", () => setTab("quiz"));

  /* =========================================================
     Language toggle
     ========================================================= */
  const langToggle = document.getElementById("langToggle");
  const htmlRoot = document.getElementById("htmlRoot");

  function setLang(newLang) {
    lang = newLang;
    htmlRoot.setAttribute("lang", lang);
    htmlRoot.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");
    langToggle.querySelector(".lang-en").classList.toggle("active", lang === "en");
    langToggle.querySelector(".lang-fa").classList.toggle("active", lang === "fa");
    applyStaticTranslations();
    updateCalculator();
    renderQuizQuestion(false);
  }
  langToggle.addEventListener("click", () => setLang(lang === "en" ? "fa" : "en"));

  /* =========================================================
     Quiz mode
     ========================================================= */
  const difficultyGroup = document.getElementById("difficultyGroup");
  const quizGiven = document.getElementById("quizGiven");
  const quizQuestion = document.getElementById("quizQuestion");
  const quizInput = document.getElementById("quizInput");
  const quizSubmit = document.getElementById("quizSubmit");
  const quizFeedback = document.getElementById("quizFeedback");
  const quizNext = document.getElementById("quizNext");
  const statScore = document.getElementById("statScore");
  const statStreak = document.getElementById("statStreak");
  const statBest = document.getElementById("statBest");

  const DIFFICULTY_CIDRS = {
    easy: [8, 16, 24],
    medium: [12, 20, 26, 27, 28],
    hard: [2, 5, 9, 13, 17, 21, 23, 29, 30, 31],
  };
  const QUESTION_TYPES = ["network", "broadcast", "mask", "wildcard", "usable", "first", "last"];

  let difficulty = "easy";
  let score = 0;
  let streak = 0;
  let best = parseInt(localStorage.getItem("subnetTool_bestStreak") || "0", 10);
  let currentQuestion = null;

  statBest.textContent = best;

  difficultyGroup.addEventListener("click", (e) => {
    const btn = e.target.closest(".diff-btn");
    if (!btn) return;
    difficulty = btn.dataset.diff;
    [...difficultyGroup.children].forEach((b) => b.classList.toggle("active", b === btn));
    generateQuestion();
  });

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomIpOctets() {
    return [randomInt(1, 223), randomInt(0, 255), randomInt(0, 255), randomInt(1, 254)];
  }

  function generateQuestion() {
    const cidrs = DIFFICULTY_CIDRS[difficulty];
    const cidr = cidrs[randomInt(0, cidrs.length - 1)];
    const octets = randomIpOctets();
    const type = QUESTION_TYPES[randomInt(0, QUESTION_TYPES.length - 1)];
    const r = calcSubnet(octets, cidr);

    let answer;
    switch (type) {
      case "network": answer = r.networkStr; break;
      case "broadcast": answer = r.broadcastStr; break;
      case "mask": answer = r.maskStr; break;
      case "wildcard": answer = r.wildcardStr; break;
      case "usable": answer = String(r.usableHosts); break;
      case "first": answer = r.firstHostStr; break;
      case "last": answer = r.lastHostStr; break;
    }

    currentQuestion = { octets, cidr, type, answer, r };
    renderQuizQuestion(true);
  }

  const QUIZ_QUESTION_KEY = {
    network: "quizNetwork", broadcast: "quizBroadcast", mask: "quizMask",
    wildcard: "quizWildcard", usable: "quizUsable", first: "quizFirst", last: "quizLast",
  };

  function renderQuizQuestion(resetInput) {
    if (!currentQuestion) { generateQuestion(); return; }
    quizGiven.textContent = t("given") + ": " + currentQuestion.octets.join(".") + "/" + currentQuestion.cidr;
    quizQuestion.textContent = t(QUIZ_QUESTION_KEY[currentQuestion.type]);
    if (resetInput) {
      quizInput.value = "";
      quizFeedback.textContent = "";
      quizFeedback.className = "quiz-feedback";
      quizNext.classList.add("hidden");
      quizInput.disabled = false;
      quizSubmit.disabled = false;
      quizInput.focus();
    }
  }

  function normalizeAnswer(str) {
    return persianDigitsToLatin(str.trim()).replace(/\s+/g, "").replace(/،/g, ",");
  }

  const DIFF_POINTS = { easy: 10, medium: 20, hard: 35 };

  function checkAnswer() {
    if (!currentQuestion) return;
    const userAns = normalizeAnswer(quizInput.value);
    if (!userAns) {
      quizFeedback.textContent = t("emptyAnswer");
      quizFeedback.className = "quiz-feedback";
      return;
    }
    const correctAns = normalizeAnswer(currentQuestion.answer);
    const isCorrect = userAns === correctAns;

    if (isCorrect) {
      score += DIFF_POINTS[difficulty];
      streak += 1;
      if (streak > best) {
        best = streak;
        localStorage.setItem("subnetTool_bestStreak", String(best));
      }
      quizFeedback.textContent = t("correct");
      quizFeedback.className = "quiz-feedback correct";
    } else {
      streak = 0;
      quizFeedback.textContent = t("wrong")(currentQuestion.answer);
      quizFeedback.className = "quiz-feedback wrong";
    }

    statScore.textContent = score;
    statStreak.textContent = streak;
    statBest.textContent = best;

    quizInput.disabled = true;
    quizSubmit.disabled = true;
    quizNext.classList.remove("hidden");
    quizNext.focus();
  }

  quizSubmit.addEventListener("click", checkAnswer);
  quizInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !quizInput.disabled) checkAnswer();
  });
  quizNext.addEventListener("click", generateQuestion);

  /* =========================================================
     Init
     ========================================================= */
  updateSliderFill();
  updateCalculator();
  generateQuestion();
  applyStaticTranslations();
})();
