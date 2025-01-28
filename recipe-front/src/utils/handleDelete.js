

export const handleDelete = async (type, id, refresh, onBack) => {

    const confirmDelete = window.confirm(`Are you sure you want to delete this ${type}?`)
  
    if (confirmDelete) {
      try {
        console.log(`http://localhost:8989/api/${type}/${id}`)
        const response = await fetch(`http://localhost:8989/api/${type}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`Failed to delete ${type}`)
        }
  
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`)
        onBack()
        refresh()
      } catch (error) {
        alert('Error: ' + error.message)
      }
    }
  }


  export const handleDeleteNut = async (type, id, refresh) => {

    const confirmDelete = window.confirm(`Are you sure you want to delete this ${type}?`)
  
    if (confirmDelete) {
      try {
        console.log(`http://localhost:8989/api/${type}/${id}`)
        const response = await fetch(`http://localhost:8989/api/${type}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`Failed to delete ${type}`)
        }
  
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`)
        refresh()
      } catch (error) {
        alert('Error: ' + error.message)
      }
    }
  }