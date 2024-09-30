import React, { useState, useMemo } from 'react';

const itemsPerPage = 3;

function DynamicItems() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSetPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const handleInputChange = (event) => {
    const { value } = event.target;
    setNewItem(value);
  }

  const handleAddItem = () => {
    const itemToAdd = newItem.trim();
    if (!itemToAdd) {
      return;
    }

    const isInList = items.find((item) => item === itemToAdd);

    if (!isInList) {
      setItems([...items, newItem]);
      setNewItem('')
      setSearchQuery('');
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => index !== i);
    setItems(updatedItems)
    setSearchQuery('');
  };

  const handleSearchQuery = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  }

  const handleClickNext = () => {
    setCurrentPage((prevState) => prevState + 1);
  }

  const handleClickPrevious = () => {
    setCurrentPage((prevState) => prevState - 1);
  }

  const startPageIndex = (currentPage - 1) * itemsPerPage;
  const endPageIndex = startPageIndex + itemsPerPage;

  const filteredItems = useMemo(() => {
    return items.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [items, searchQuery]);

  const currentPageItems = useMemo(() => {
    return filteredItems.slice(startPageIndex, endPageIndex);
  })

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Loop through 
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <button key={i} onClick={() => handleSetPage(i)} style={{ margin: '5px', fontWeight: currentPage === i ? 'bold' : 'inherit' }}>
        {i}
      </button>
    )
  }

  return (
    <>
    <input name='search' type='text' placeholder='Search items' onChange={handleSearchQuery} style={{marginBottom: '50px'}} />
    <input name='name' type='text' value={newItem} onChange={handleInputChange} placeholder="Add new item" />
    <button onClick={handleAddItem}>
      Add New Item
    </button>
    <ul style={{padding: '0px'}}>
    {currentPageItems.length ? currentPageItems.map((item, index) => {
      return (
        <li key={index} style={{listStyle: 'none', margin: '10px'}}>
        <button onClick={() => handleRemoveItem(index)} style={{ backgroundColor: 'green' }}>
          {item}
        </button>
        </li>
      )
    }): <p>No items</p>}

    <div>
      <button disabled={filteredItems.length <= itemsPerPage || currentPage === totalPages} onClick={handleClickNext} style={{margin: '25px'}}>
        Next
      </button>

      {pageNumbers}

      <button disabled={filteredItems.length <= itemsPerPage || currentPage === 1} onClick={handleClickPrevious} style={{margin: '25px'}}>
        Previous
      </button>

      {filteredItems.length ? <p>Page {currentPage} of {totalPages}</p>: null}
    </div>

    </ul>
    </>
  )

};

export default DynamicItems;