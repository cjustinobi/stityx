
  const formatCurrency = val => {
    if (!val) return ''
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(val)
  }

  const persistData = val => {
    localStorage.setItem('cart', JSON.stringify(val))
  }

  const furnitureCategories = ['chair', 'table']

  export {
    formatCurrency,
    persistData,
    furnitureCategories
  }
