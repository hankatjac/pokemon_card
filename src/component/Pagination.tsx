const Pagination: React.FC<{
  gotoNextPage: (() => void) | null;
  gotoPrevPage: (() => void) | null;
}> = ({ gotoNextPage, gotoPrevPage }) => {
  return (
    <div className="flex justify-between">
      {gotoPrevPage && (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={gotoPrevPage}
        >
          Previous
        </button>
      )}
      {gotoNextPage && (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={gotoNextPage}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
