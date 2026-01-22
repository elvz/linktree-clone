"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableLinkItem } from "./SortableLinkItem";
import { updateLinksOrder } from "@/app/admin/actions";
import { useLanguage } from "@/context/LanguageContext";

interface LinkListProps {
  initialLinks: any[];
  isPremium: boolean;
}

export default function SortableLinkList({ initialLinks, isPremium }: LinkListProps) {
  const { t } = useLanguage();
  const [items, setItems] = useState(initialLinks);

  // Синхронізуємо стейт, якщо прийшли нові дані з сервера (наприклад, після додавання лінка)
  useEffect(() => {
    setItems(initialLinks);
  }, [initialLinks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        // Готуємо дані для відправки на сервер
        // Ми просто перезаписуємо display_order відповідно до нового індексу
        const updates = newItems.map((item, index) => ({
            id: item.id,
            display_order: index
        }));

        // Відправляємо на сервер (без await, щоб не блокувати інтерфейс)
        updateLinksOrder(updates);

        return newItems;
      });
    }
  };

  if (items.length === 0) {
    return <p className="text-center text-gray-400 py-10">{t('emptyLinks')}</p>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {items.map((link) => (
            <SortableLinkItem key={link.id} link={link} isPremium={isPremium} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}