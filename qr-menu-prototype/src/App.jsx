import { useMemo, useState } from "react"
import { categories, items } from "./menu"
import "./App.css"

export default function App() {
  const [activeCatId, setActiveCatId] = useState(categories[0]?.id ?? 1)
  const [q, setQ] = useState("")
  const [showQR, setShowQR] = useState(false)

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    const catItems = items.filter(i => i.categoryId === activeCatId)
    if (!query) return catItems
    return catItems.filter(i => i.name.toLowerCase().includes(query))
  }, [activeCatId, q])

  const activeName = categories.find(c => c.id === activeCatId)?.name ?? "Menü"

  return (
    <div className="container">
      <div className="card header">
        <div className="headerTop">
          <div className="brandRow">
            <div className="logo" aria-label="Kafe logosu">
              <img className="logoImg" src="/logo.png" alt="K" />
            </div>

            <div>
              <h1 className="title">Agora Kafe Menü</h1>
              <div className="subtitle">Fiyatlar güncellenebilir • Stok durumu anlık</div>
            </div>
          </div>
          <div className="badge" onClick={() => setShowQR(true)}>QR</div>
        </div>
      </div>

      <div className="card search">
        <span className="searchIcon">🔎</span>
        <input
          className="searchInput"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ürün ara (örn: latte)"
        />
      </div>

      <div className="tabs">
        {categories.map(c => {
          const active = c.id === activeCatId
          return (
            <button
              key={c.id}
              className={`tab ${active ? "tabActive" : ""}`}
              onClick={() => {
                setActiveCatId(c.id)
                setQ("")
              }}
            >
              {c.name}
            </button>
          )
        })}
      </div>

      <div className="section">
        <div className="menuPanel">
          <div className="sectionTitleRow">
            <div className="sectionTitle">{activeName}</div>
          </div>

          <div className="list">
            {filtered.length === 0 ? (
              <div className="empty">
                <div className="emptyIcon">☕</div>
                <div className="emptyTitle">Ürün bulunamadı</div>
                <div className="emptyText">
                  Yazımı kontrol edin ya da farklı bir kategori seçin.
                </div>
              </div>
            ) : (
              filtered.map(item => (
                <div key={item.id} className={`card item ${item.available ? "" : "dim"}`}>
                  <div className="itemRow">
                    <div className="thumb">
                      {item.image ? (
                        <img
                          className="thumbImg"
                          src={item.image}
                          alt={item.name}
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                      ) : (
                        <span className="thumbPlaceholder">☕</span>
                      )}
                    </div>

                    <div className="itemLeft">
                      <div className="itemName">{item.name}</div>
                      {item.description ? (
                        <div className="itemDesc">{item.description}</div>
                      ) : null}
                    </div>

                    <div className="itemRight">
                      <div className="itemPrice">{item.price} ₺</div>
                      <div className={`itemStatus ${item.available ? "" : "itemOut"}`}>
                        {item.available ? "Mevcut" : "Stokta yok"}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

       <div className="footer">
  <div className="footerCols">
    <div className="footerCol">
      <div className="footerLine">Alerjen bilgisi için personele danışın.</div>
      <div className="footerLine">Fiyatlar bilgilendirme amaçlıdır.</div>
    </div>

    <div className="footerCol footerRight">
      <div className="footerLine">09:00 – 23:00</div>
      <div className="footerLine">@agoracafe</div>
    </div>
  </div>
</div>
      </div>
    </div>
  )
}
