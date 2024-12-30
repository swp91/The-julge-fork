interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T]) => React.ReactNode;
  hiddenOn?: 'sm' | 'md' | 'lg';
}

interface TableProps<T extends Record<string, any>> {
  data: T[];
  columns: Column<T>[];
}

const Table = <T extends Record<string, any>>({
  data,
  columns,
}: TableProps<T>) => {
  return (
    <div className='w-[351px] md:w-[680px] lg:w-[964px] rounded-t-[10px] overflow-hidden border-t border-l border-r border-gray-200 mb-3'>
      <table className='w-full table-fixed border-collapse'>
        <thead>
          <tr className='bg-red-10 border-b border-gray-200'>
            {columns.map((col, index) => (
              <th
                key={index}
                className={`p-3 text-left text-12 md:text-14 border-b border-gray-200 ${
                  col.hiddenOn ? `hidden ${col.hiddenOn}:table-cell` : ''
                }`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='text-14 md:text-16'>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className='border-b '>
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`p-3 ${
                    col.hiddenOn ? `hidden ${col.hiddenOn}:table-cell` : ''
                  } ${
                    colIndex === columns.length - 1
                      ? 'border-l lg:border-l-0'
                      : ''
                  }`}>
                  <div className='line-clamp-2'>
                    {col.render
                      ? col.render(row[col.accessor])
                      : row[col.accessor]}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
