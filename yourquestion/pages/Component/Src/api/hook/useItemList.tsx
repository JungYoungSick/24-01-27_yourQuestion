// 아이템 목록 관리 커스텀 Hook (useItemList)
import { useState } from "react";

interface Item {
  id: number;
  title: string;
  fixed: boolean;
}

export const useItemList = (initialItems: Item[]) => {
  const [items, setItems] = useState(initialItems);

  const handleMove = (itemId: number, direction: "up" | "down") => {
    // 아이템 위치 변경 로직
  };

  const handleDelete = (itemId: number) => {
    // 아이템 삭제 로직
  };

  const handlePin = (itemId: number) => {
    // 아이템 고정 로직
  };

  return { items, handleMove, handleDelete, handlePin };
};
