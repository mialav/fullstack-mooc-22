export const NameFilter = ({ filterValue, handleFilter }) => {
  return (
    <div>
      filter shown with <input value={filterValue} onChange={handleFilter} />
    </div>
  );
};
