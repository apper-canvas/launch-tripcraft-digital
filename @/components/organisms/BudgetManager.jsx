import React, { useState } from 'react';
import { toast } from 'react-toastify';
import expenseService from '@/services/api/expenseService';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import ExpenseItem from '@/components/molecules/ExpenseItem';
import Chart from 'react-apexcharts';

const BudgetManager = ({ selectedTrip, expenses, setExpenses }) => {
    const [newExpense, setNewExpense] = useState({
        category: 'Food',
        amount: 0,
        description: '',
        date: new Date().toISOString().split('T')[0]
    });

    const tripExpenses = expenses.filter(e => e.tripId === selectedTrip?.id) || [];

    const handleAddExpense = async () => {
        if (!newExpense.description.trim() || newExpense.amount <= 0) {
            toast.error("Please enter valid expense details");
            return;
        }

        try {
            const expense = await expenseService.create({
                ...newExpense,
                tripId: selectedTrip.id
            });
            setExpenses(prev => [...prev, expense]);
            setNewExpense({
                category: 'Food',
                amount: 0,
                description: '',
                date: new Date().toISOString().split('T')[0]
            });
            toast.success("Expense added successfully!");
        } catch (error) {
            toast.error("Failed to add expense");
        }
    };

    const handleDeleteExpense = async (expenseId) => {
        try {
            await expenseService.delete(expenseId);
            setExpenses(prev => prev.filter(e => e.id !== expenseId));
            toast.success("Expense deleted!");
        } catch (error) {
            toast.error("Failed to delete expense");
        }
    };

    const getExpensesByCategory = () => {
        const categories = {};
        tripExpenses.forEach(expense => {
            categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
        });
        return categories;
    };

    const budgetSpent = tripExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const budgetRemaining = (selectedTrip?.budget || 0) - budgetSpent;
    const expenseCategories = getExpensesByCategory();

    const expenseCategoryOptions = [
        { value: 'Food', label: 'Food' },
        { value: 'Transportation', label: 'Transportation' },
        { value: 'Accommodation', label: 'Accommodation' },
        { value: 'Activities', label: 'Activities' },
        { value: 'Shopping', label: 'Shopping' },
        { value: 'Other', label: 'Other' }
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
                    <h3 className="font-heading font-semibold text-surface-900 dark:text-white mb-2">Total Budget</h3>
                    <div className="text-2xl font-bold text-primary">${selectedTrip?.budget || 0}</div>
                </div>
                <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
                    <h3 className="font-heading font-semibold text-surface-900 dark:text-white mb-2">Spent</h3>
                    <div className="text-2xl font-bold text-red-500">${budgetSpent}</div>
                </div>
                <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
                    <h3 className="font-heading font-semibold text-surface-900 dark:text-white mb-2">Remaining</h3>
                    <div className={`text-2xl font-bold ${budgetRemaining >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        ${budgetRemaining >= 0 ? budgetRemaining : Math.abs(budgetRemaining)}
                    </div>
                </div>
            </div>

            <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
                <h3 className="font-heading font-semibold text-surface-900 dark:text-white mb-4">Add Expense</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <Select
                        value={newExpense.category}
                        onChange={(e) => setNewExpense(prev => ({ ...prev, category: e.target.value }))}
                        options={expenseCategoryOptions}
                    />
                    <Input
                        type="number"
                        placeholder="Amount"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                    />
                    <Input
                        type="text"
                        placeholder="Description"
                        value={newExpense.description}
                        onChange={(e) => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
                    />
                    <Input
                        type="date"
                        value={newExpense.date}
                        onChange={(e) => setNewExpense(prev => ({ ...prev, date: e.target.value }))}
                    />
                </div>
                <Button
                    onClick={handleAddExpense}
                    className="w-full md:w-auto px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                >
                    Add Expense
                </Button>
            </div>

            {Object.keys(expenseCategories).length > 0 && (
                <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
                    <h3 className="font-heading font-semibold text-surface-900 dark:text-white mb-4">Expenses by Category</h3>
                    <Chart
                        options={{
                            chart: { type: 'donut' },
                            labels: Object.keys(expenseCategories),
                            colors: ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'],
                            legend: { show: true },
                            plotOptions: {
                                pie: {
                                    donut: {
                                        size: '70%'
                                    }
                                }
                            }
                        }}
                        series={Object.values(expenseCategories)}
                        type="donut"
                        height={300}
                    />
                </div>
            )}

            <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
                <h3 className="font-heading font-semibold text-surface-900 dark:text-white mb-4">Recent Expenses</h3>
                {tripExpenses.length > 0 ? (
                    <div className="space-y-3">
                        {tripExpenses.map((expense) => (
                            <ExpenseItem key={expense.id} expense={expense} onDelete={handleDeleteExpense} />
                        ))}
                    </div>
                ) : (
                    <p className="text-surface-500 dark:text-surface-400 text-center py-8">
                        No expenses recorded yet
                    </p>
                )}
            </div>
        </div>
    );
};

export default BudgetManager;