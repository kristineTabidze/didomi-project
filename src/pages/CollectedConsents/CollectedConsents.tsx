import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Paper, TablePagination } from '@mui/material'
import { Table } from '../../components/Table'
import { useUserStore } from '../../store/userStore'

const rowsPerPageOptions = [2, 5, 10, 15]
const tableHeaders = ['Name', 'Email', 'Consent given for']

const CollectedConsents = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(2)
  const users = useUserStore((state) => state.users)
  const setUsers = useUserStore((state) => state.setUsers)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch users data from the mock server
        const response = await fetch('/consents')
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const users = await response.json()
        // update state with user data
        setUsers(users) // Set users in Zustand state
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [setUsers])

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setCurrentPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setCurrentPage(0)
  }

  // Slice data array by page
  const paginatedData = useMemo(
    () =>
      users.slice(
        currentPage * rowsPerPage,
        currentPage * rowsPerPage + rowsPerPage
      ),
    [currentPage, rowsPerPage, users]
  )

  return (
    <div className="py-4 mx-auto w-3/4 ">
      <Helmet>
        <title>Collected consents</title>
        <meta
          name="description"
          content="A list of consents that were given by users"
        />
      </Helmet>
      {paginatedData.length > 0 ? (
        <Paper>
          <Table
            header={tableHeaders}
            data={paginatedData}
            caption="Users who have given consent"
          />
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <h1 className="mt-[20vh] text-lg">Given consent data is empty</h1>
      )}
    </div>
  )
}

export default CollectedConsents
