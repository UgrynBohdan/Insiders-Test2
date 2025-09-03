import { postNewTrip, type INewTrip } from '@/api/trip';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const NewTripForm = ({ setIsModalOpen }: any) => {
  const [formData, setFormData] = useState<INewTrip>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createNewTripMutation = useMutation({
    mutationFn: postNewTrip,
  })

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Дані подорожі:', formData);
    setIsModalOpen(false)
    // Тут ви можете відправити дані на бекенд
    createNewTripMutation.mutate(formData)
    window.location.reload()
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Створити нову подорож</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Назва подорожі</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Наприклад: Подорож до Карпат"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Опис</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Короткий опис вашої подорожі"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              // required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Дата початку</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                // required
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Дата закінчення</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                // required
              />
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Створити подорож
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTripForm;