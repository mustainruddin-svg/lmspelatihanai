/* ==========================================================
   AR-RAHMAH • LMS AI UNTUK GURU — APP.JS
   Vanilla JS, hash-routing, localStorage + Google Apps Script sync
   ========================================================== */

// CONFIG diambil dari config.js (dimuat sebelum app.js di index.html)

const UNIT_TO_JENJANG = {
  paud: "paud",
  sdit: "sd",
  smpit: "smp",
  smait: "smp"
};

const UNIT_LABEL = {
  paud: "PAUD",
  sdit: "SDIT",
  smpit: "SMPIT",
  smait: "SMAIT"
};

/* ----------------------------------------------------------
   STORAGE HELPERS (localStorage, dibungkus try/catch)
   ---------------------------------------------------------- */
const Store = {
  getUser(){
    try{ return JSON.parse(localStorage.getItem("arr_lms_user") || "null"); }catch(e){ return null; }
  },
  setUser(u){
    try{ localStorage.setItem("arr_lms_user", JSON.stringify(u)); }catch(e){}
  },
  getProgress(){
    try{ return JSON.parse(localStorage.getItem("arr_lms_progress") || "{}"); }catch(e){ return {}; }
  },
  setProgress(p){
    try{ localStorage.setItem("arr_lms_progress", JSON.stringify(p)); }catch(e){}
  }
};

let STATE = {
  user: Store.getUser(),
  progress: Store.getProgress()
};

/* ----------------------------------------------------------
   SYNC KE GOOGLE APPS SCRIPT (opsional — aplikasi tetap
   berjalan penuh lewat localStorage walau backend belum diisi)
   ---------------------------------------------------------- */
async function syncPush(moduleId){
  if(!CONFIG.API_URL) return;
  try{
    const m = STATE.progress[moduleId] || {};
    await fetch(CONFIG.API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "saveProgress",
        nama: STATE.user.nama,
        unit: STATE.user.unit,
        moduleId: moduleId,
        completed: !!m.completed,
        score: m.score || 0,
        timestamp: new Date().toISOString()
      })
    });
  }catch(e){ /* diam-diam gagal, data tetap aman di localStorage */ }
}

async function syncPull(){
  if(!CONFIG.API_URL || !STATE.user) return;
  try{
    const res = await fetch(`${CONFIG.API_URL}?action=getProgress&nama=${encodeURIComponent(STATE.user.nama)}`);
    const data = await res.json();
    if(data && data.rows){
      data.rows.forEach(r => {
        const existing = STATE.progress[r.moduleId] || {};
        if(!existing.completed && r.completed){
          STATE.progress[r.moduleId] = { ...existing, completed:true, score:r.score };
        }
      });
      Store.setProgress(STATE.progress);
    }
  }catch(e){ /* offline-first: abaikan */ }
}

/* ----------------------------------------------------------
   UTIL
   ---------------------------------------------------------- */
function el(tag, attrs = {}, children = []){
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v]) => {
    if(k === "class") node.className = v;
    else if(k === "html") node.innerHTML = v;
    else if(k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach(c => {
    if(c === null || c === undefined) return;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return node;
}

function toast(msg){
  let t = document.getElementById("toast");
  if(!t){
    t = el("div", { id:"toast", class:"toast" });
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("toast--show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("toast--show"), 2600);
}

function completedCount(){
  return Object.values(STATE.progress).filter(p => p.completed).length;
}

function moduleStatus(id){
  const p = STATE.progress[id];
  if(p && p.completed) return "done";
  if(p && (p.score !== undefined || p.selfCheck)) return "wip";
  return "new";
}

/* ----------------------------------------------------------
   ROUTER
   ---------------------------------------------------------- */
function route(){
  const hash = location.hash.replace(/^#\/?/, "");
  const root = document.getElementById("app");
  root.innerHTML = "";

  if(!STATE.user){
    root.appendChild(renderOnboarding());
    return;
  }

  if(hash.startsWith("module/")){
    const id = parseInt(hash.split("/")[1], 10);
    const mod = MODULES.find(m => m.id === id);
    if(mod){ root.appendChild(renderShell(renderModule(mod))); return; }
  }
  if(hash === "selesai"){
    root.appendChild(renderShell(renderCompletion()));
    return;
  }
  root.appendChild(renderShell(renderDashboard()));
}
window.addEventListener("hashchange", route);

/* ----------------------------------------------------------
   ONBOARDING
   ---------------------------------------------------------- */
function renderOnboarding(){
  let chosenUnit = null;

  const wrap = el("div", { class:"onboard" });
  const card = el("div", { class:"onboard__card" });

  card.appendChild(el("span", { class:"onboard__eyebrow" }, "Panduan Praktis AI untuk Pendidik"));
  card.appendChild(el("h1", { class:"onboard__title h-display" }, "AI untuk Guru"));
  card.appendChild(el("p", { class:"onboard__desc" },
    "10 modul singkat untuk membantu Bunda/Ustadz-Ustadzah memakai AI menyusun modul ajar, media visual, hingga aktivitas kelas — dari jenjang PAUD sampai SMP/SMA."));

  const nameField = el("div", { class:"field" }, [
    el("label", { for:"nama" }, "Nama Anda"),
    el("input", { type:"text", id:"nama", placeholder:"Contoh: Ustadzah Fitri", autocomplete:"name" })
  ]);
  card.appendChild(nameField);

  const unitField = el("div", { class:"field" });
  unitField.appendChild(el("label", {}, "Unit Mengajar"));
  const grid = el("div", { class:"unit-grid" });
  Object.keys(UNIT_LABEL).forEach(u => {
    const opt = el("button", {
      class:"unit-opt", type:"button", "aria-pressed":"false",
      onclick: (e) => {
        chosenUnit = u;
        grid.querySelectorAll(".unit-opt").forEach(o => o.setAttribute("aria-pressed","false"));
        e.currentTarget.setAttribute("aria-pressed","true");
      }
    }, UNIT_LABEL[u]);
    grid.appendChild(opt);
  });
  unitField.appendChild(grid);
  card.appendChild(unitField);

  const startBtn = el("button", { class:"btn btn--primary btn--block" }, "Mulai Belajar →");
  startBtn.addEventListener("click", async () => {
    const nama = document.getElementById("nama").value.trim();
    if(!nama){ toast("Isi nama Anda dulu ya."); return; }
    if(!chosenUnit){ toast("Pilih unit mengajar Anda dulu."); return; }
    STATE.user = { nama, unit: chosenUnit, jenjang: UNIT_TO_JENJANG[chosenUnit] };
    Store.setUser(STATE.user);
    toast(`Selamat datang, ${nama}!`);
    await syncPull();
    location.hash = "#/dashboard";
    route();
  });
  card.appendChild(startBtn);

  wrap.appendChild(card);
  return wrap;
}

/* ----------------------------------------------------------
   SHELL (topbar + container) dipakai semua halaman setelah login
   ---------------------------------------------------------- */
function renderShell(contentNode){
  const app = el("div", {});
  const topbar = el("div", { class:"topbar" }, [
    el("div", { class:"topbar__brand" }, [
      el("div", { class:"topbar__mark" }, "AR"),
      el("div", {}, [
        el("div", { class:"topbar__title h-display" }, "AI untuk Guru"),
        el("div", { class:"topbar__sub" }, "Yayasan Ar-Rahmah Sulawesi")
      ])
    ]),
    el("div", { class:"topbar__user" }, [
      el("span", {}, ["Halo, ", el("b", {}, STATE.user.nama)]),
      el("button", { class:"link-quiet", onclick: () => {
        if(confirm("Keluar dari sesi ini? Progres tetap tersimpan di perangkat ini.")){
          location.hash = "";
          STATE.user = null;
          Store.setUser(null);
          route();
        }
      }}, "Ganti pengguna")
    ])
  ]);
  const main = el("main", {}, el("div", { class:"container" }, contentNode));
  app.appendChild(topbar);
  app.appendChild(main);
  return app;
}

/* ----------------------------------------------------------
   DASHBOARD
   ---------------------------------------------------------- */
function renderDashboard(){
  const wrap = el("div", {});
  const done = completedCount();
  const total = MODULES.length;
  const pct = Math.round((done/total) * 100);

  wrap.appendChild(el("div", { class:"dash-head" }, [
    el("div", {}, [
      el("h1", { class:"h-display" }, "Modul Belajar"),
      el("p", {}, `${UNIT_LABEL[STATE.user.unit]} · Contoh disesuaikan untuk jenjang ${JENJANG_LABEL[STATE.user.jenjang]}`)
    ])
  ]));

  const progressCard = el("div", { class:"progress-card" }, [
    el("div", { class:"progress-card__top" }, [
      el("span", { class:"progress-card__label" }, "PROGRES ANDA"),
      el("span", { class:"progress-card__count" }, `${done} / ${total} modul`)
    ]),
    el("div", { class:"progress-track" }, el("div", { class:"progress-fill", style:`width:${pct}%` }))
  ]);
  wrap.appendChild(progressCard);

  const grid = el("div", { class:"module-grid" });
  MODULES.forEach(m => {
    const status = moduleStatus(m.id);
    const statusLabel = status === "done" ? "Selesai" : status === "wip" ? "Sedang berjalan" : "Belum mulai";
    const card = el("button", { class:"module-card", onclick: () => { location.hash = `#/module/${m.id}`; } }, [
      el("div", { class:"module-card__top" }, [
        el("span", { class:"module-card__num" }, `MODUL ${String(m.id).padStart(2,"0")}`),
        el("span", { class:"module-card__icon" }, m.icon)
      ]),
      el("h3", { class:"module-card__title" }, m.title),
      el("p", { class:"module-card__sub" }, m.subtitle),
      el("div", { class:"module-card__status" }, [
        el("span", { class:`status-dot ${status === "done" ? "status-dot--done" : status === "wip" ? "status-dot--wip" : ""}` }),
        el("span", {}, statusLabel),
        status === "done" ? el("span", { class:"badge-star" }, "⭐") : null
      ])
    ]);
    grid.appendChild(card);
  });
  wrap.appendChild(grid);

  if(done === total){
    const cta = el("div", { style:"margin-top:22px; text-align:center;" });
    cta.appendChild(el("button", { class:"btn btn--gold", onclick: () => location.hash = "#/selesai" }, "🏅 Lihat Sertifikat Anda"));
    wrap.appendChild(cta);
  }

  return wrap;
}

/* ----------------------------------------------------------
   MODULE VIEW
   ---------------------------------------------------------- */
function renderModule(mod){
  const wrap = el("div", {});
  const jenjang = STATE.user.jenjang;
  const formula = mod.formulaType === "visual" ? FORMULA_VISUAL : FORMULA_TEKS;
  const progress = STATE.progress[mod.id] || {};

  // ---- Header ----
  wrap.appendChild(el("div", { class:"module-header" }, [
    el("button", { class:"crumb", onclick: () => location.hash = "#/dashboard" }, "← Kembali ke Dashboard"),
    el("span", { class:"module-header__eyebrow" }, `Modul ${String(mod.id).padStart(2,"0")} dari 10`),
    el("h1", { class:"h-display" }, `${mod.icon} ${mod.title}`),
    el("p", {}, mod.subtitle)
  ]));

  // ---- Tujuan ----
  wrap.appendChild(el("div", { class:"section" }, [
    el("div", { class:"section__label" }, "Kenapa ini penting"),
    el("div", { class:"card" }, el("p", {}, mod.tujuan))
  ]));

  // ---- Formula ----
  const formulaStrip = el("div", { class:"formula-strip" });
  formula.forEach((f, i) => {
    formulaStrip.appendChild(el("div", { class:`formula-chip formula-chip--${i}` }, [
      el("div", { class:"formula-chip__label" }, f.label),
      el("div", { class:"formula-chip__sub" }, f.sub)
    ]));
  });
  wrap.appendChild(el("div", { class:"section" }, [
    el("div", { class:"section__label" }, mod.formulaType === "visual" ? "Formula prompt visual" : "Formula prompt teks"),
    formulaStrip
  ]));

  // ---- Contoh per jenjang (tabs) ----
  const exampleHost = el("div", {});
  function renderExample(jk){
    exampleHost.innerHTML = "";
    const ex = mod.contoh[jk];
    const anatomy = el("div", { class:"prompt-anatomy" });
    formula.forEach((f, i) => {
      anatomy.appendChild(el("div", { class:`prompt-seg prompt-seg--${i}` }, [
        el("span", { class:"prompt-seg__tag" }, f.label),
        el("span", {}, ex[f.key])
      ]));
    });
    exampleHost.appendChild(anatomy);
    exampleHost.appendChild(el("p", { class:"prompt-note" }, [el("b", {}, "Catatan: "), ex.catatan]));
  }
  const tabs = el("div", { class:"tabs" });
  ["paud","sd","smp"].forEach(jk => {
    const btn = el("button", {
      class:"tab-btn", type:"button", "aria-selected": jk === jenjang ? "true" : "false",
      onclick: (e) => {
        tabs.querySelectorAll(".tab-btn").forEach(b => b.setAttribute("aria-selected","false"));
        e.currentTarget.setAttribute("aria-selected","true");
        renderExample(jk);
      }
    }, JENJANG_LABEL[jk]);
    tabs.appendChild(btn);
  });
  renderExample(jenjang);
  wrap.appendChild(el("div", { class:"section" }, [
    el("div", { class:"section__label" }, "Contoh prompt siap pakai"),
    tabs,
    exampleHost
  ]));

  // ---- Tip ----
  wrap.appendChild(el("div", { class:"section" }, [
    el("div", { class:"section__label" }, "Tips praktik"),
    el("div", { class:"tip-box" }, [ el("span", { class:"tip-box__icon" }, "💡"), el("span", {}, mod.tip) ])
  ]));

  // ---- Latihan mandiri ----
  const savedCheck = progress.selfCheck || mod.selfCheck.map(() => false);
  const checklist = el("ul", { class:"check-list" });
  mod.selfCheck.forEach((label, i) => {
    const item = el("label", { class:"check-item" });
    const input = el("input", { type:"checkbox" });
    input.checked = !!savedCheck[i];
    input.addEventListener("change", () => {
      const p = STATE.progress[mod.id] || {};
      const check = p.selfCheck || mod.selfCheck.map(() => false);
      check[i] = input.checked;
      STATE.progress[mod.id] = { ...p, selfCheck: check };
      Store.setProgress(STATE.progress);
    });
    item.appendChild(input);
    item.appendChild(el("span", {}, label));
    checklist.appendChild(item);
  });
  const practiceArea = el("textarea", { class:"practice-area", placeholder:"Tulis draf prompt Anda sendiri di sini, lalu cocokkan dengan checklist di atas..." });
  practiceArea.value = progress.practice || "";
  let saveTimer;
  practiceArea.addEventListener("input", () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      const p = STATE.progress[mod.id] || {};
      STATE.progress[mod.id] = { ...p, practice: practiceArea.value };
      Store.setProgress(STATE.progress);
    }, 500);
  });
  wrap.appendChild(el("div", { class:"section" }, [
    el("div", { class:"section__label" }, "Latihan mandiri"),
    el("div", { class:"card", style:"display:flex; flex-direction:column; gap:16px;" }, [
      checklist,
      practiceArea
    ])
  ]));

  // ---- Kuis ----
  wrap.appendChild(el("div", { class:"section" }, [
    el("div", { class:"section__label" }, "Uji pemahaman"),
    el("div", { class:"card" }, renderQuiz(mod))
  ]));

  // ---- Navigasi ----
  const nav = el("div", { class:"module-nav" });
  const prevMod = MODULES.find(m => m.id === mod.id - 1);
  const nextMod = MODULES.find(m => m.id === mod.id + 1);
  nav.appendChild(prevMod
    ? el("button", { class:"btn btn--ghost", onclick: () => location.hash = `#/module/${prevMod.id}` }, "← Modul Sebelumnya")
    : el("span", {}));
  nav.appendChild(nextMod
    ? el("button", { class:"btn btn--primary", onclick: () => location.hash = `#/module/${nextMod.id}` }, "Modul Berikutnya →")
    : el("button", { class:"btn btn--gold", onclick: () => location.hash = "#/dashboard" }, "Kembali ke Dashboard"));
  wrap.appendChild(nav);

  return wrap;
}

/* ----------------------------------------------------------
   QUIZ ENGINE
   ---------------------------------------------------------- */
function renderQuiz(mod){
  const host = el("div", {});
  const answers = new Array(mod.quiz.length).fill(null);
  let submitted = false;

  const items = mod.quiz.map((q, qi) => {
    const item = el("div", { class:"quiz-item" });
    item.appendChild(el("p", { class:"quiz-item__q" }, `${qi+1}. ${q.q}`));
    const optsWrap = el("div", {});
    q.options.forEach((opt, oi) => {
      const letter = String.fromCharCode(65+oi);
      const optBtn = el("button", {
        class:"quiz-opt", type:"button",
        onclick: () => {
          if(answers[qi] !== null) return;
          answers[qi] = oi;
          optsWrap.querySelectorAll(".quiz-opt").forEach((b, bi) => {
            b.setAttribute("disabled","true");
            if(bi === q.correct) b.setAttribute("data-state","correct");
            else if(bi === oi) b.setAttribute("data-state","wrong");
          });
          checkAllAnswered();
        }
      }, [ el("span", { class:"quiz-opt__letter" }, letter), el("span", {}, opt) ]);
      optsWrap.appendChild(optBtn);
    });
    item.appendChild(optsWrap);
    return item;
  });
  items.forEach(i => host.appendChild(i));

  const resultBox = el("div", {});
  host.appendChild(resultBox);

  const submitBtn = el("button", { class:"btn btn--primary", disabled:"true" }, "Isi semua jawaban dulu");
  host.appendChild(submitBtn);

  function checkAllAnswered(){
    const allAnswered = answers.every(a => a !== null);
    if(allAnswered && !submitted){
      submitBtn.removeAttribute("disabled");
      submitBtn.textContent = "Lihat Hasil";
      submitBtn.onclick = () => finish();
    }
  }

  function finish(){
    submitted = true;
    const correctCount = answers.filter((a, i) => a === mod.quiz[i].correct).length;
    const score = correctCount / mod.quiz.length;
    const passed = score >= CONFIG.PASS_SCORE;

    const p = STATE.progress[mod.id] || {};
    const attempts = (p.attempts || 0) + 1;
    STATE.progress[mod.id] = { ...p, score: Math.round(score*100), attempts, completed: passed || !!p.completed };
    Store.setProgress(STATE.progress);
    syncPush(mod.id);

    resultBox.innerHTML = "";
    resultBox.appendChild(el("div", { class:`quiz-result ${passed ? "quiz-result--pass" : "quiz-result--fail"}` }, [
      el("span", { class:"quiz-result__score" }, `${correctCount}/${mod.quiz.length}`),
      el("span", {}, passed
        ? "Bagus! Anda memahami modul ini dan mendapat badge ⭐."
        : `Belum lulus (minimal ${Math.round(CONFIG.PASS_SCORE*mod.quiz.length)} dari ${mod.quiz.length} benar). Baca ulang materi lalu coba lagi.`)
    ]));

    submitBtn.remove();
    if(!passed){
      const retryBtn = el("button", { class:"btn btn--ghost", onclick: () => location.reload() }, "Coba Lagi");
      resultBox.appendChild(retryBtn);
    }
    if(passed) toast("Modul selesai! Badge diberikan. ⭐");
  }

  return host;
}

/* ----------------------------------------------------------
   COMPLETION / SERTIFIKAT
   ---------------------------------------------------------- */
function renderCompletion(){
  const wrap = el("div", { class:"container--narrow" });
  wrap.appendChild(el("div", { class:"cert" }, [
    el("div", { class:"cert__medal" }, "🏅"),
    el("div", { class:"cert__eyebrow" }, "Sertifikat Penyelesaian"),
    el("h1", { class:"cert__title h-display" }, "10 Prompt Ajaib untuk Guru"),
    el("div", { class:"cert__name" }, STATE.user.nama),
    el("p", { class:"cert__desc" },
      `telah menyelesaikan seluruh 10 modul pelatihan AI untuk Guru — ${UNIT_LABEL[STATE.user.unit]}, Yayasan Ar-Rahmah Sulawesi.`)
  ]));
  const actions = el("div", { style:"display:flex; gap:10px; margin-top:20px; justify-content:center;" }, [
    el("button", { class:"btn btn--ghost", onclick: () => window.print() }, "🖨️ Cetak Sertifikat"),
    el("button", { class:"btn btn--primary", onclick: () => location.hash = "#/dashboard" }, "Kembali ke Dashboard")
  ]);
  wrap.appendChild(actions);
  return wrap;
}

/* ----------------------------------------------------------
   INIT
   ---------------------------------------------------------- */
(async function init(){
  if(STATE.user) await syncPull();
  route();
})();
