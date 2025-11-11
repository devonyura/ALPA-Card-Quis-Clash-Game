import React, { useEffect, useState } from "react";

export default function SettingsModal({ initialFocus, onClose, onSave }) {
  const [input, setInput] = useState(initialFocus);

  // === Struktur data baru ===
  const defaultData = {
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

  const [checklists, setChecklists] = useState(() => {
    const saved = localStorage.getItem("checklists");
    return saved ? JSON.parse(saved) : defaultData;
  });

  // Simpan otomatis setiap kali ada perubahan
  useEffect(() => {
    localStorage.setItem("checklists", JSON.stringify(checklists));
  }, [checklists]);

  // === CRUD Checklist ===
  const addItem = (cat) => {
    const name = prompt(`Tambah item ke ${cat}`);
    if (name) {
      setChecklists((prev) => ({
        ...prev,
        [cat]: [
          ...prev[cat],
          { name, checked: false, count: 0, lastChecked: null },
        ],
      }));
    }
  };

  const editItem = (cat, i) => {
    const newName = prompt("Edit item:", checklists[cat][i].name);
    if (newName) {
      setChecklists((prev) => {
        const copy = { ...prev };
        copy[cat][i].name = newName;
        return copy;
      });
    }
  };

  const removeItem = (cat, i) => {
    if (confirm("Hapus item ini?")) {
      setChecklists((prev) => {
        const copy = { ...prev };
        copy[cat].splice(i, 1);
        return copy;
      });
    }
  };

  // === Simpan dan sinkron ke Widget ===
  const saveAndClose = () => {
    localStorage.setItem("checklists", JSON.stringify(checklists));

    // kirim event sinkronisasi
    window.dispatchEvent(new CustomEvent("checklistUpdated"));

    onSave(input);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="border-4 border-red-800 rounded-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto bg-slate-50 text-slate-900">
        <h2 className="text-2xl font-bold text-center mb-3">Pengaturan</h2>

        {/* Fokus Sekarang */}
        <div>
          <p className="mt-3 font-semibold">Fokus sekarang</p>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mt-2 w-full border-2 border-red-800 rounded p-2 no-drag bg-white focus:outline-none"
          />
        </div>

        {/* Checklist Manager */}
        {["LWH", "LWTH", "LWM"].map((cat) => (
          <div key={cat} className="mt-4">
            <p className="text-md font-bold border-t border-slate-300 text-green-600 pt-2">
              {cat}
            </p>
            {checklists[cat].map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b py-1 text-sm"
              >
                <span>
                  {item.name}{" "}
                  <span className="text-xs text-gray-500">({item.count}x)</span>
                </span>
                <div className="space-x-2">
                  <button
                    onClick={() => editItem(cat, i)}
                    className="text-yellow-500 hover:text-yellow-400"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => removeItem(cat, i)}
                    className="text-red-500 hover:text-red-400"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => addItem(cat)}
              className="mt-2 text-blue-500 hover:text-blue-400"
            >
              + Tambah item
            </button>
          </div>
        ))}

        {/* Tombol Bawah */}
        <div className="flex justify-between mt-5">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded hover:bg-gray-100 no-drag hover:text-slate-800"
          >
            Batal
          </button>
          <button
            onClick={saveAndClose}
            className="px-3 py-1 border border-red-800 hover:bg-gray-100 hover:text-slate-800 no-drag"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
