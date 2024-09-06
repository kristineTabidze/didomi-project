import { render, screen } from '@testing-library/react'
import { describe, expect } from 'vitest'
import { mockedUsers } from '../../mocks/mockDefaultUsers'
import { Table } from './Table'

const headers = ['Name', 'Email', 'Consent']
const caption = 'User Consents'
const footer = 'Footer Text'

const renderTable = () =>
  render(<Table header={headers} data={mockedUsers} caption={caption} />)

describe('Table Component', () => {
  test('It renders the table with headers and data', () => {
    const { getByText } = renderTable()
    expect(getByText(caption)).toBeInTheDocument()
    headers.forEach((header) => {
      expect(getByText(header)).toBeInTheDocument()
    })
    mockedUsers.forEach((row) => {
      Object.values(row).forEach((value) => {
        expect(getByText(value)).toBeInTheDocument()
      })
    })
  })

  test('It renders the footer when provided', () => {
    const { getByText } = render(
      <Table
        header={headers}
        data={mockedUsers}
        caption={caption}
        footer={footer}
      />
    )

    expect(getByText(footer)).toBeInTheDocument()
  })

  test('does not render the footer when not provided', () => {
    renderTable()
    expect(screen.queryByText(footer)).not.toBeInTheDocument()
  })
})
