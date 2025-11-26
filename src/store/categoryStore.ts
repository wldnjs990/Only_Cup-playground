import type { CategoryTree } from '@/types/new/new_form_schema';
import { create } from 'zustand';

interface UseCategoryStore {
  treeList: CategoryTree[];
}

const useCategoryStore = create<UseCategoryStore>((set) => ({
  treeList: [],
}));
