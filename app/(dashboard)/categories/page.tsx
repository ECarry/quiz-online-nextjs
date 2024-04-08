import { getCategory } from "@/data/question";
import Tab from "./tab";

const CategoriesPage = async () => {
  const categories = await getCategory();

  console.log(categories);
  

  return <Tab categories={categories} />;
};

export default CategoriesPage;
