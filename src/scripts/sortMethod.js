export default (array, sortUp, sortBy) => {
  return array.sort((a, b) => {
    if (sortUp === 'asc') {
      if (sortBy === 'position') {
        return a.position - b.position
      } else if (sortBy === 'title') {
        console.log('a.title[0] =', a.title[0]);
        return a.title[0] - b.title[0]
      } else if (sortBy === 'date') {
        return new Date(a.dateCreate) - new Date(b.dateCreate)
      } else if (sortBy === 'deadline') {
        return new Date(a.deadline) - new Date(b.deadline)
      } else if (sortBy === 'price') {
        return a.price - b.price
      } else if (sortBy === 'time') {
        return a.time - b.time
      }
    } else {
      if (sortBy === 'position') {
        return b.position - a.position
      } else if (sortBy === 'title') {
        console.log('b.title[0] =', b.title[0]);
        return b.title[0] - a.title[0]
      } else if (sortBy === 'date') {
        return new Date(b.dateCreate) - new Date(a.dateCreate)
      } else if (sortBy === 'deadline') {
        return new Date(b.deadline) - new Date(a.deadline)
      } else if (sortBy === 'price') {
        return b.price - a.price
      } else if (sortBy === 'time') {
        return b.time - a.time
      }
    }
  })
}