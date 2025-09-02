import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { accessCollaborate } from '@/api/trip';

// Функція-запит для надсилання запрошення
const sendInvitation = async (email: string) => {
    // У цьому прикладі ми припускаємо, що API приймає JSON з полем 'email'
    const response = await axios.post('/api/invite', { email });
    return response.data;
};

const InviteFriendForm = ({ tripId, setWantToInvite }: any) => {
    const [email, setEmail] = useState('');
    const queryClient = useQueryClient();

    // Налаштування мутації для надсилання запрошення
    const {
        mutate, 
        isError, 
        isSuccess, 
        error 
    } = useMutation({
        mutationFn: accessCollaborate,
        onSuccess: () => {
            // Очищення поля введення після успішного надсилання
            setEmail('');
            console.log('Запрошення успішно надіслано!');
            // Опціонально: інвалідація кешу для оновлення списку запрошень, якщо він є
            queryClient.invalidateQueries({ queryKey: ['invitations'] });
        },
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Викликаємо мутацію з даними електронної пошти
        mutate({ tripId, invitedEmail: email})
        setWantToInvite(false)
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                Запросити друга
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div className="relative">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Введіть email друга"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                
                <button
                    type="submit"
                    className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Надіслати запрошення
                </button>
            </form>

            {/* Повідомлення про стан */}
            {isSuccess && (
                <p className="mt-4 text-center text-green-600 font-semibold">
                    🎉 Запрошення надіслано!
                </p>
            )}
            {isError && (
                <p className="mt-4 text-center text-red-600">
                    Помилка: {error.message}
                </p>
            )}
        </div>
    );
};

export default InviteFriendForm