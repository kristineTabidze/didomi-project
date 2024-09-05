import React from 'react'

interface ITableProps {
  header: string[]
  data: Record<string, string>[]
  caption: string
  footer?: string
}

export const Table: React.FC<ITableProps> = ({
  caption,
  data,
  header,
  footer,
}) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <caption className="text-lg font-semibold mb-4">{caption}</caption>

      <thead className="bg-gray-100">
        <tr>
          {header.map((item, index) => (
            <th
              key={index}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item, index) => (
          <tr key={index} className="hover:bg-gray-50">
            {Object.values(item).map((value, index) => (
              <td
                key={index}
                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>

      {footer && (
        <tfoot>
          <tr>
            <td
              colSpan={header.length}
              className="px-6 py-3 text-left text-sm font-medium text-gray-500 bg-gray-50"
            >
              footer
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  )
}
