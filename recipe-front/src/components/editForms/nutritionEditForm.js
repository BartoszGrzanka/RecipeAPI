import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { DataContext } from '@/contexts/APIContext';

const nutritionSchema = Yup.object().shape({
  id: Yup.number()
    .required('ID is required')
    .positive('ID must be a positive number')
    .integer('ID must be an integer')
    .min(1, 'ID must be greater than or equal to 1'),
  calories: Yup.string()
    .required('Calories value is required')
    .matches(/^\d+\s?kcal$/, 'Calories must be a number followed by "kcal"'),
  protein: Yup.string()
    .required('Protein value is required')
    .matches(/^\d+(\.\d+)?\s?g$/, 'Protein must be a number followed by "g"'),
  fat: Yup.string()
    .required('Fat value is required')
    .matches(/^\d+(\.\d+)?\s?g$/, 'Fat must be a number followed by "g"'),
  carbohydrates: Yup.string()
    .required('Carbohydrates value is required')
    .matches(/^\d+(\.\d+)?\s?g$/, 'Carbohydrates must be a number followed by "g"'),
});

const NutritionEditForm = ({ nutrition, onBack }) => {
  const { refresh } = useContext(DataContext);

  const handleSubmit = async (values) => {
    const updatedValues = {
      id: Number(values.id),
      calories: values.calories,
      protein: values.protein,
      fat: values.fat,
      carbohydrates: values.carbohydrates,
    };

    try {
      const response = await fetch(`http://localhost:8989/api/nutritions/${nutrition._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedValues),
      });

      if (response.ok) {
        alert('Nutrition updated successfully');
        refresh();
        onBack();
      } else {
        const errorResponse = await response.text();
        alert('Failed to update nutrition: ' + errorResponse);
        console.error('Error response:', errorResponse);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the nutrition.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Formik
        initialValues={{
          id: nutrition.id || '',  // Domyślna wartość ID
          calories: nutrition.calories || '',  // Domyślna wartość kalorii
          protein: nutrition.protein || '',  // Domyślna wartość białka
          fat: nutrition.fat || '',  // Domyślna wartość tłuszczu
          carbohydrates: nutrition.carbohydrates || '',  // Domyślna wartość węglowodanów
        }}
        validationSchema={nutritionSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-6">
            {/* ID */}
            <div>
              <label htmlFor="id" className="block text-lg font-semibold">ID</label>
              <Field
                id="id"
                name="id"
                type="number"
                disabled
                value={nutrition.id}  // Wartość ID, ale pole jest zablokowane do edycji
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
              <ErrorMessage name="id" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Calories */}
            <div>
              <label htmlFor="calories" className="block text-lg font-semibold">Calories</label>
              <Field
                id="calories"
                name="calories"
                type="text"
                placeholder="Enter calories (e.g. 200 kcal)"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="calories" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Protein */}
            <div>
              <label htmlFor="protein" className="block text-lg font-semibold">Protein</label>
              <Field
                id="protein"
                name="protein"
                type="text"
                placeholder="Enter protein (e.g. 15 g)"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="protein" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Fat */}
            <div>
              <label htmlFor="fat" className="block text-lg font-semibold">Fat</label>
              <Field
                id="fat"
                name="fat"
                type="text"
                placeholder="Enter fat (e.g. 10 g)"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="fat" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Carbohydrates */}
            <div>
              <label htmlFor="carbohydrates" className="block text-lg font-semibold">Carbohydrates</label>
              <Field
                id="carbohydrates"
                name="carbohydrates"
                type="text"
                placeholder="Enter carbohydrates (e.g. 50 g)"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="carbohydrates" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-md focus:ring-2 focus:ring-blue-500"
              >
                Save Nutrition
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Back Button */}
      <div className="mt-6">
        <button
          onClick={onBack}
          className="w-full py-3 bg-gray-500 text-white rounded-md focus:ring-2 focus:ring-gray-500"
        >
          Back to list
        </button>
      </div>
    </div>
  );
};

export default NutritionEditForm;
