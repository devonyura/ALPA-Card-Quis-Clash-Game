import React, { useEffect, useState } from "react";
import SettingsModal from "./SettingsModal";
// tambahkan setelah import useEffect dan useState
const initialChecklistData = {
  LWH: ["Piano", "Blender", "Menulis (Microblog)"],
  LWTH: [
    "Bikin GFX",
    "Belajar Nulis Cerita",
    "Belajar Kosa 10 Kata Inggris Baru",
  ],
  LWM: ["Menggambar", "Bikin Konten"],
};

function formatHMSS(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

function daysBetween(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function getJapaneseSeason(date) {
  const m = date.getMonth() + 1;
  if (m >= 3 && m <= 5) return "🌸 Spring";
  if (m >= 6 && m <= 8) return "♨️ Summer";
  if (m >= 9 && m <= 11) return "🍂 Autumn";
  return "❄️ Winter";
}

function getNextSeasonStart(date) {
  const year = date.getFullYear();
  const m = date.getMonth() + 1;
  let next;
  if (m < 3) next = new Date(year, 2, 1);
  else if (m < 6) next = new Date(year, 5, 1);
  else if (m < 9) next = new Date(year, 8, 1);
  else if (m < 12) next = new Date(year, 11, 1);
  else next = new Date(year + 1, 2, 1);
  if (next <= date) next = new Date(next.getFullYear(), next.getMonth() + 3, 1);
  return next;
}

function shouldReset(category, lastChecked, todayStr) {
  const last = new Date(lastChecked);
  const today = new Date(todayStr);

  const diffDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));

  if (category === "LWH") return diffDays >= 1;
  if (category === "LWTH") return diffDays >= 3;
  if (category === "LWM") {
    // reset kalau sudah lewat hari minggu ke senin
    return today.getDay() === 1 && diffDays >= 1;
  }
  return false;
}

export default function Widget() {
  const [now, setNow] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [focus, setFocus] = useState(
    () =>
      localStorage.getItem("focusNow") || "selesaikan modul untuk anak magang"
  );

  // useEffect(() => {
  //   function updateWindowSize() {
  //     const react = document.body.getBoundingClientRect();
  //     window.electronAPI.updateWindowSize({
  //       width: react.width,
  //       height: react.height,
  //     });
  //   }

  //   updateWindowSize();

  //   // kalau kamu ingin auto-resize ketika konten berubah
  //   const resizeObserver = new ResizeObserver(updateWindowSize);
  //   resizeObserver.observe(document.body);

  //   return () => resizeObserver.disconnect();
  // }, []);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  });

  useEffect(() => {
    localStorage.setItem("focusNow", focus);
  }, [focus]);

  // waktu akhir hari
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  );
  const msRemaining = endOfDay - now;

  // waktu & kalender dinamis
  const currentYear = now.getFullYear();
  const nextYear = currentYear + 1;
  const currentMonth = now.toLocaleDateString("id-ID", { month: "long" });
  const nextMonthDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const nextMonthName = nextMonthDate.toLocaleDateString("id-ID", {
    month: "long",
  });

  const daysToNewYear = daysBetween(now, new Date(nextYear, 0, 1));
  const daysToNextMonth = daysBetween(now, nextMonthDate);

  // musim
  const currentSeason = getJapaneseSeason(now);
  const nextSeasonStart = getNextSeasonStart(now);
  const nextSeasonName = getJapaneseSeason(nextSeasonStart);
  const daysToNextSeason = daysBetween(now, nextSeasonStart);

  // ============ Bagian Checklist

  // === Checklist state ===
  // === STATE ===
  const [checklists, setChecklists] = useState(() => {
    const saved = localStorage.getItem("checklists");
    return saved
      ? JSON.parse(saved)
      : {
          LWH: [
            { name: "Piano", checked: false, count: 0 },
            { name: "Blender", checked: false, count: 0 },
            { name: "Menulis (Microblog)", checked: false, count: 0 },
          ],
          LWTH: [
            { name: "Bikin GFX", checked: false, count: 0 },
            { name: "Belajar Nulis Cerita", checked: false, count: 0 },
            { name: "Belajar 10 Kata Inggris Baru", checked: false, count: 0 },
          ],
          LWM: [
            { name: "Menggambar", checked: false, count: 0 },
            { name: "Bikin Konten", checked: false, count: 0 },
          ],
        };
  });

  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem("checkedStatus");
    return saved ? JSON.parse(saved) : {};
  });
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem("checkStats");
    return saved ? JSON.parse(saved) : {};
  });

  // reset otomatis
  useEffect(() => {
    const now = new Date();
    const todayKey = now.toDateString();
    const lastReset = localStorage.getItem("lastResetDate");

    if (lastReset !== todayKey) {
      // reset harian
      Object.keys(checked).forEach((cat) => {
        if (cat === "LWH") {
          Object.keys(checked[cat] || {}).forEach(
            (k) => (checked[cat][k] = false)
          );
        } else if (cat === "LWTH") {
          // hanya reset kalau sudah 3 hari
          Object.keys(checked[cat] || {}).forEach((task) => {
            const lastChecked = checked[cat][task]?.date;
            if (lastChecked) {
              const diff =
                (now - new Date(lastChecked)) / (1000 * 60 * 60 * 24);
              if (diff >= 3) checked[cat][task] = false;
            }
          });
        } else if (cat === "LWM") {
          // reset tiap Senin
          if (now.getDay() === 1) {
            Object.keys(checked[cat] || {}).forEach(
              (k) => (checked[cat][k] = false)
            );
          }
        }
      });

      localStorage.setItem("checkedStatus", JSON.stringify(checked));
      localStorage.setItem("lastResetDate", todayKey);
    }

    const todayStr = new Date().toISOString().slice(0, 10);
    const updated = { ...checklists };

    for (const category in updated) {
      updated[category] = updated[category].map((item) => {
        if (shouldReset(category, item.lastChecked, todayStr)) {
          return { ...item, checked: false };
        }
        return item;
      });
    }

    setChecklists(updated);
    localStorage.setItem("checklists", JSON.stringify(updated));
  }, []);

  const toggleCheck = (cat, task) => {
    setChecked((prev) => {
      const newData = { ...prev };
      if (!newData[cat]) newData[cat] = {};
      const current = newData[cat][task]?.done;

      newData[cat][task] = {
        done: !current,
        date: new Date(),
      };

      if (!current) {
        // naikkan total counter
        setStats((old) => {
          const s = { ...old };
          if (!s[cat]) s[cat] = {};
          s[cat][task] = (s[cat][task] || 0) + 1;
          localStorage.setItem("checkStats", JSON.stringify(s));
          return s;
        });
      }

      localStorage.setItem("checkedStatus", JSON.stringify(newData));
      return newData;
    });
  };

  const toggleChecklist = (category, index) => {
    const updated = { ...checklists };
    const item = updated[category][index];

    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);

    // Jika belum pernah checklist hari ini (atau periode waktunya)
    if (
      !item.lastChecked ||
      shouldReset(category, item.lastChecked, todayStr)
    ) {
      item.checked = !item.checked;
      item.lastChecked = todayStr;

      // Tambah hitungan hanya jika baru di-check hari ini
      if (item.checked) item.count += 1;
    } else {
      // kalau masih dalam periode yang sama dan user uncheck → hanya toggle tanpa tambah count
      item.checked = !item.checked;
    }

    setChecklists(updated);
    localStorage.setItem("checklists", JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-fit">
      {/* Main widget container */}
      <div className="rounded-lg p-6 w-[450px] relative shadow-lg dark:bg-slate-800">
        {/* Gear Button */}
        <button
          className="absolute top-2 left-2 p-1 border-2 border-cyan-800 rounded-full no-drag hover:bg-cyan-700"
          onClick={() => setIsModalOpen(true)}
          aria-label="Pengaturan"
        >
          ⚙️
        </button>

        {/* Header */}
        <h1 className="text-2xl font-extrabold text-center mt-2 drag-region">
          Year Of RaiseUp!
        </h1>

        {/* tombol minimize */}
        <button
          className="absolute top-2 right-3 text-2xl font-bold px-2 no-drag"
          onClick={() => window.electronAPI.minimize()}
        >
          —
        </button>

        {/* Countdown Hari */}
        <div className="mt-2 text-center">
          <p className="text-md">
            Waktu hari{" "}
            {
              ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][
                now.getDay()
              ]
            }{" "}
            ini sisa
          </p>
          <p className="text-5xl font-bold mt-1">{formatHMSS(msRemaining)}</p>
        </div>

        {/* Dua kolom bawah */}
        <div className="mt-3 grid grid-cols-2 text-center border-t border-b py-3 text-white">
          {/* Menuju Tahun Baru */}
          <div className="shadow-md py-3 m-1 rounded-md bg-gradient-to-tr from-blue-600 to-purple-500">
            <p className="text-sm font-semibold">{currentYear}</p>
            <p className="text-2xl font-extrabold">-{daysToNewYear} Hari</p>
            <p className="text-sm font-semibold mt-[-4px]">
              Menuju {nextYear}!
            </p>
          </div>

          {/* Menuju Bulan Berikut */}
          <div className="shadow-md py-3 m-1 rounded-md bg-gradient-to-bl from-pink-500 to-orange-500">
            <p className="text-sm font-semibold">
              {now.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
              })}
            </p>
            <p className="text-2xl font-extrabold text-white">
              -{daysToNextMonth} Hari
            </p>
            <p className="text-sm font-semibold mt-[-4px]">
              Menuju {nextMonthName}!
            </p>
          </div>
        </div>

        {/* Info musim */}
        <div className="text-sm font-semibold flex justify-between border-b py-2">
          <span>Musim Sekarang : {currentSeason}</span>
          <span>
            {daysToNextSeason} hari Menuju {nextSeasonName}
          </span>
        </div>

        {/* Fokus Sekarang */}
        <div className="text-center py-2">
          <p className="text-xl font-bold text-cyan-400">Fokus Saat ini</p>
          <p className="text-2xl font-extrabold mt-1 underline text-orange-600 tracking-wide ">
            {focus}!
          </p>
        </div>

        {/* Checklist Rutin */}
        <div>
          {["LWH", "LWTH", "LWM"].map((category) => (
            <div key={category} className="mt-2">
              <p className="text-md font-bold border-t text-green-600">
                {category}
              </p>
              <div className="border-t py-2 grid grid-cols-2 gap-1">
                {checklists[category].map((item, i) => (
                  <label key={i} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleChecklist(category, i)}
                    />
                    <span>
                      {item.name}{" "}
                      <span className="text-xs text-gray-500">
                        ({item.count}x)
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Pengaturan */}
      {isModalOpen && (
        <SettingsModal
          initialFocus={focus}
          onClose={() => setIsModalOpen(false)}
          onSave={(newFocus) => setFocus(newFocus)}
        />
      )}
    </div>
  );
}
