"use client";

import { Subject } from "@prisma/client";
import CategoryItem from "./category-item";

interface CategoriesProps {
  items: Subject[];
}

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem key={item.id} label={item.name} id={item.id} />
      ))}
    </div>
  );
};

export default Categories;
