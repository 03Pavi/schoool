'use client'

import React from 'react'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Alert from '@mui/material/Alert'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { DashboardLayout, PageContainer } from '@/widgets/layout'
import { AppCard, AppDataDisplay } from '@/shared/ui'
import { useRbac } from '@/entities/permission'

import { useGuardians } from '@/features/manage-guardians/model/use-guardians'
import { GuardianFormDialog } from '@/features/manage-guardians/ui/guardian-form-dialog'
import { GuardianDetailsDialog } from '@/features/manage-guardians/ui/guardian-details-dialog'

export default function GuardiansPage() {
  const { hasPermission, role } = useRbac()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const {
    filteredGuardians,
    students,
    isLoading,
    errorMessage,
    loadGuardians,
    searchQuery,
    setSearchQuery,
    isFormOpen,
    setIsFormOpen,
    isDetailsOpen,
    setIsDetailsOpen,
    formMode,
    selectedGuardian,
    menuAnchorEl,
    activeGuardianMenu,
    handleOpenMenu,
    handleCloseMenu,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDetails,
    handleDeleteGuardian,
    handleSubmitForm,
    formFields,
  } = useGuardians()

  const isParentViewOnly = role === 'parent'

  // Columns for desktop Grid
  const columns = [
    { field: 'name', headerName: 'Guardian Name', flex: 1.2, sortable: true },
    { field: 'relation', headerName: 'Relationship', flex: 0.8, sortable: true },
    { field: 'phone', headerName: 'Primary Contact', flex: 1.1 },
    { field: 'email', headerName: 'Email Address', flex: 1.3 },
    { field: 'address', headerName: 'Residential Address', flex: 1.5 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params: any) => {
        const guardian = params.row
        return (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton size="small" color="info" onClick={() => handleOpenDetails(guardian)}>
              <VisibilityIcon fontSize="small" />
            </IconButton>
            {!isParentViewOnly && hasPermission('guardian:update') && (
              <IconButton size="small" color="primary" onClick={() => handleOpenEdit(guardian)}>
                <EditIcon fontSize="small" />
              </IconButton>
            )}
            {!isParentViewOnly && hasPermission('guardian:delete') && (
              <IconButton size="small" color="error" onClick={() => handleDeleteGuardian(guardian.id, guardian.name)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        )
      }
    }
  ]

  return (
    <DashboardLayout>
      <PageContainer
        title={isParentViewOnly ? "Household Directory Ledger" : "Emergency Contacts & Guardians"}
        subtitle={isParentViewOnly ? "Review registered emergency household parents, guardians, and children." : "Manage campus students' linked parents, relationship ratios, and address cards."}
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Guardians' }]}
        action={
          !isParentViewOnly && hasPermission('guardian:create') ? (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenCreate}
              sx={{ py: 1.2, fontWeight: 700, borderRadius: 2 }}
            >
              Link New Guardian
            </Button>
          ) : undefined
        }
      >
        {isParentViewOnly && (
          <Alert severity="info" sx={{ mb: 3, borderRadius: 2, fontWeight: 600 }}>
            Welcome back! You are logged in with a <strong>Parent/Guardian</strong> account. You are authorized to review only your linked household profile card and child reports.
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <AppCard 
            title={isParentViewOnly ? "Household Directory Ledger" : "Active Campus Guardians"}
            subheader={isParentViewOnly ? "Your official family registry details." : "Search and manage guardian relationships and emergency phone contacts."}
          >
            {!isParentViewOnly && (
              <TextField
                placeholder="Search guardians by name, email, phone..."
                size="small"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            )}

            <AppDataDisplay
              rows={filteredGuardians}
              columns={columns}
              renderMobileCard={(guardian) => (
                <Card 
                  key={guardian.id} 
                  elevation={0}
                  sx={{ 
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    mb: 1.5
                  }}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                        <Avatar sx={{ bgcolor: 'secondary.light', color: 'secondary.main', width: 32, height: 32, fontSize: '0.8rem', fontWeight: 800 }}>
                          {guardian.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="700" color="text.primary">
                            {guardian.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Relation: {guardian.relation} | {guardian.phone}
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton size="small" onClick={(e) => handleOpenMenu(e, guardian)}>
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Box sx={{ mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        <strong>Linked Children:</strong> {guardian.linkedStudentRolls.map((r: string) => students.find((s) => s.rollNumber === r)?.name || r).join(', ')}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              )}
              loading={isLoading}
              emptyMessage={errorMessage ? 'Unable to load guardians.' : 'No guardians found.'}
            />
            {errorMessage && (
              <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                {errorMessage} <Button size="small" onClick={loadGuardians}>Retry</Button>
              </Alert>
            )}
          </AppCard>
        </Box>
      </PageContainer>

      {/* Link / Edit Guardian Form Dialog */}
      <GuardianFormDialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        isMobile={isMobile}
        formMode={formMode}
        onSubmit={handleSubmitForm}
        formFields={formFields}
        students={students}
      />

      {/* View Guardian Details Dialog */}
      <GuardianDetailsDialog
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        isMobile={isMobile}
        selectedGuardian={selectedGuardian}
        students={students}
      />

      {/* Card Context Menu for mobile */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleCloseMenu}
      >
        {activeGuardianMenu && (
          <Box>
            <MenuItem onClick={() => { handleOpenDetails(activeGuardianMenu); handleCloseMenu() }}>
              <VisibilityIcon fontSize="small" sx={{ mr: 1, color: 'info.main' }} /> View Details
            </MenuItem>
            {!isParentViewOnly && hasPermission('guardian:update') && (
              <MenuItem onClick={() => { handleOpenEdit(activeGuardianMenu); handleCloseMenu() }}>
                <EditIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} /> Edit Contact
              </MenuItem>
            )}
            {!isParentViewOnly && hasPermission('guardian:delete') && (
              <MenuItem onClick={() => { handleDeleteGuardian(activeGuardianMenu.id, activeGuardianMenu.name); handleCloseMenu() }} sx={{ color: 'error.main' }}>
                <DeleteIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} /> Remove Link
              </MenuItem>
            )}
          </Box>
        )}
      </Menu>
    </DashboardLayout>
  )
}
