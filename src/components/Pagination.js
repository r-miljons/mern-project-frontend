import React from "react";

export default function Pagination(props) {
	const { currentPage, setCurrentPage, totalPages } = props;

  const handleBack = () => {

    if (currentPage === 1) return;
    setCurrentPage(prevState => prevState - 1);
  };

  const handleNext = () => {

    if (currentPage === totalPages) return;
    setCurrentPage(prevState => prevState + 1);
  };

	if (totalPages > 1) return (
		<div className="pagination">
      <button className="material-symbols-outlined" aria-label="previous page" onClick={handleBack}>navigate_before</button>
			{[...Array(totalPages).keys()].map((page) => (
          <button key={page} onClick={() => setCurrentPage(page + 1)} className={currentPage === (page + 1) ? "active" : ""}>
						{page + 1}
					</button>
				))}
        <button className="material-symbols-outlined" aria-label="next page" onClick={handleNext}>navigate_next</button>
		</div>
	)
}
