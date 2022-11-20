import React, { useEffect, useState } from 'react'
import { API_URL } from '../App';
import MealCard from '../components/MealCard';
import Pagination from '../components/Pagination';
import { useMealsContext } from '../hooks/useMealsContext';

export default function Home() {
  const { meals, dispatch } = useMealsContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(API_URL + "/meals/?page=" + currentPage);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_MEALS", payload: json.meals });
        setTotalPages(json.total_pages);
      }

    };

    fetchMeals();
  }, [dispatch, currentPage]);

  return (
    <div>
      <h2>Community's Meals</h2>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
      <div className='meals'>
        {
          meals && meals.map(meal => (
            <MealCard key={meal._id} meal={meal}/>
          ))
        }
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
    </div>
  )
}
