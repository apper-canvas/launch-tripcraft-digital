import React, { useState } from 'react';
import { toast } from 'react-toastify';
import checklistService from '@/services/api/checklistService';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import ChecklistItem from '@/components/molecules/ChecklistItem';
import ApperIcon from '@/components/ApperIcon';
import { motion } from 'framer-motion';

const ChecklistManager = ({ selectedTrip, checklistItems, setChecklistItems }) => {
    const [newChecklistItem, setNewChecklistItem] = useState({
        item: '',
        category: 'Clothing'
    });

    const tripChecklist = checklistItems.filter(c => c.tripId === selectedTrip?.id) || [];
    const categories = ['Clothing', 'Documents', 'Electronics', 'Toiletries', 'Other'];

    const handleAddChecklistItem = async () => {
        if (!newChecklistItem.item.trim()) {
            toast.error("Please enter an item name");
            return;
        }

        try {
            const item = await checklistService.create({
                ...newChecklistItem,
                tripId: selectedTrip.id,
                checked: false
            });
            setChecklistItems(prev => [...prev, item]);
            setNewChecklistItem({
                item: '',
                category: 'Clothing'
            });
            toast.success("Item added to checklist!");
        } catch (error) {
            toast.error("Failed to add checklist item");
        }
    };

    const handleToggleChecklistItem = async (itemId, checked) => {
        try {
            const updatedItem = await checklistService.update(itemId, { checked });
            setChecklistItems(prev => prev.map(item =>
                item.id === itemId ? updatedItem : item
            ));
            toast.success(checked ? "Item checked!" : "Item unchecked!");
        } catch (error) {
            toast.error("Failed to update item");
        }
    };

    const categoryOptions = categories.map(category => ({ value: category, label: category }));

    return (
        <div className="space-y-6">
            <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
                <h3 className="font-heading font-semibold text-surface-900 dark:text-white mb-4">Add Checklist Item</h3>
                <div className="flex flex-col md:flex-row gap-4">
                    <Input
                        type="text"
                        placeholder="Item name"
                        value={newChecklistItem.item}
                        onChange={(e) => setNewChecklistItem(prev => ({ ...prev, item: e.target.value }))}
                        className="flex-1"
                    />
                    <Select
                        value={newChecklistItem.category}
                        onChange={(e) => setNewChecklistItem(prev => ({ ...prev, category: e.target.value }))}
                        options={categoryOptions}
                    />
                    <Button
                        onClick={handleAddChecklistItem}
                        className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                    >
                        Add Item
                    </Button>
                </div>
            </div>

            {categories.map(category => {
                const categoryItems = tripChecklist.filter(item => item.category === category);

                if (categoryItems.length === 0) return null;

                return (
                    <div key={category} className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
                        <h3 className="font-heading font-semibold text-surface-900 dark:text-white mb-4">
                            {category}
                        </h3>
                        <div className="space-y-2">
                            {categoryItems.map((item) => (
                                <ChecklistItem key={item.id} item={item} onToggle={handleToggleChecklistItem} />
                            ))}
                        </div>
                    </div>
                );
            })}

            {tripChecklist.length === 0 && (
                <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-12 border border-surface-200 dark:border-surface-700 text-center">
                    <ApperIcon name="CheckSquare" className="w-16 h-16 mx-auto mb-4 text-surface-400" />
                    <h3 className="text-xl font-heading font-semibold text-surface-900 dark:text-white mb-2">
                        No Items in Checklist
                    </h3>
                    <p className="text-surface-600 dark:text-surface-400">
                        Add items to keep track of what you need to pack
                    </p>
                </div>
            )}
        </div>
    );
};

export default ChecklistManager;