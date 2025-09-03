import { postNewPlace, postNewTrip, type INewPlace, type IPlacePostData, } from '@/api/trip';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const NewPlaceForm = ({ tripId, setWantToAddPlace }: { tripId: string, setWantToAddPlace: (arg: boolean) => void }) => {
  const [formData, setFormData] = useState<INewPlace>({
    locationName: '',
    dayNumber: 1,
    notes: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createNewPlaceMutation = useMutation({
    mutationFn: postNewPlace,
  })

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Дані місця:', formData)
    setWantToAddPlace(false)
    // Тут ви можете відправити дані на бекенд
    const data = { tripId, data: formData } as IPlacePostData
    createNewPlaceMutation.mutate(data)
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Додати нове місце</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Назва місця</label>
            <input
              type="text"
              id="title"
              name="locationName"
              value={formData.locationName}
              onChange={handleChange}
              placeholder="Наприклад: Карпати"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Порядковий день місця</label>
            <input
              id="description"
              name="dayNumber"
              value={formData.dayNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Опис</label>
              <textarea
                id="description"
                name="notes"
                value={formData.notes}
                rows={4}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                // required
              />
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Додати місце
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPlaceForm