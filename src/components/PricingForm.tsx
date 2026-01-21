"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext"; // <--- 1. Імпорт

export default function PricingForm({ userId }: { userId: string }) {
  const router = useRouter();
  const { t } = useLanguage(); // <--- 2. Хук
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([{ label: "", price: "" }]);

  const addItem = () => {
    setItems([...items, { label: "", price: "" }]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleItemChange = (index: number, field: "label" | "price", value: string) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const validItems = items.filter(i => i.label && i.price);

    const { error } = await supabase.from("links").insert({
      title: title || t('priceTitle'),
      url: "",
      type: "pricing",
      user_id: userId,
      meta_data: { items: validItems },
    });

    if (!error) {
      setTitle("");
      setItems([{ label: "", price: "" }]);
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 border-l-4 border-l-blue-500">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{t('priceTitle')}</h2>
        <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold">PRO</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
           <label className="text-xs text-gray-500 ml-1">{t('priceLabelTitle')}</label>
           <input
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             placeholder={t('pricePlaceholderTitle')}
             required
             className="w-full p-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-black transition"
           />
        </div>

        <div className="space-y-2">
          <label className="text-xs text-gray-500 ml-1">{t('priceLabelItems')}</label>
          {items.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                placeholder={t('servicePlaceholder')}
                value={item.label}
                onChange={(e) => handleItemChange(index, "label", e.target.value)}
                className="flex-[2] p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500"
                required
              />
              <input
                placeholder={t('costPlaceholder')}
                value={item.price}
                onChange={(e) => handleItemChange(index, "price", e.target.value)}
                className="flex-1 p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500"
                required
              />
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-red-400 hover:text-red-600 px-2"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addItem}
          className="text-xs text-blue-600 font-medium hover:underline pl-1 cursor-pointer"
        >
          {t('addServiceBtn')}
        </button>

        <button
          disabled={loading}
          className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-black text-sm font-medium transition mt-4 disabled:opacity-50 cursor-pointer"
        >
          {loading ? t('saving') : t('createPriceBtn')}
        </button>
      </form>
    </div>
  );
}