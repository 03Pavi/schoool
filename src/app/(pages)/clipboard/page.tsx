'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  CircularProgress,
  Alert,
  Snackbar,
  Tooltip,
  useTheme,
  alpha,
  Skeleton,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import NoteIcon from '@mui/icons-material/Note'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

import { DashboardLayout, PageContainer } from '../../../widgets/layout'
import { useAppDispatch, useAppSelector } from '../../../shared/hooks'  
import {
  fetchClipboardItemsThunk,
  createClipboardItemThunk,
  updateClipboardItemThunk,
  deleteClipboardItemThunk,
  ClipboardItem,
} from '@/features/clipboard'

export default function ClipboardPage() {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  
  // Redux state selectors
  const { items, loading, error } = useAppSelector((state) => state.clipboard)

  // Local state
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  
  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create')
  const [selectedItem, setSelectedItem] = useState<ClipboardItem | null>(null)
  const [formTitle, setFormTitle] = useState('')
  const [formContent, setFormContent] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  // Toast / Notification state
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error' | 'info'>('success')

  // Load items
  const loadItems = useCallback(() => {
    dispatch(fetchClipboardItemsThunk())
  }, [dispatch])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  // Show Toast
  const showToast = (message: string, severity: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage(message)
    setToastSeverity(severity)
    setToastOpen(true)
  }

  // Handle Search
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items
    const query = searchQuery.toLowerCase()
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query)
    )
  }, [items, searchQuery])

  // Handle Copy to Clipboard
  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      showToast('Copied to clipboard!', 'success')
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      showToast('Failed to copy to system clipboard', 'error')
    }
  }

  // Handle Open Create/Edit Dialog
  const handleOpenDialog = (mode: 'create' | 'edit', item?: ClipboardItem) => {
    setDialogMode(mode)
    setFormError(null)
    if (mode === 'edit' && item) {
      setSelectedItem(item)
      setFormTitle(item.title)
      setFormContent(item.content)
    } else {
      setSelectedItem(null)
      setFormTitle('')
      setFormContent('')
    }
    setIsDialogOpen(true)
  }

  // Handle Dialog Submit
  const handleDialogSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    if (!formTitle.trim()) {
      setFormError('Title is required')
      return
    }
    if (!formContent.trim()) {
      setFormError('Content is required')
      return
    }

    try {
      if (dialogMode === 'create') {
        await dispatch(
          createClipboardItemThunk({
            title: formTitle.trim(),
            content: formContent.trim(),
          })
        ).unwrap()
        showToast('Clipboard item created successfully!', 'success')
      } else if (dialogMode === 'edit' && selectedItem) {
        await dispatch(
          updateClipboardItemThunk({
            id: selectedItem.id,
            title: formTitle.trim(),
            content: formContent.trim(),
          })
        ).unwrap()
        showToast('Clipboard item updated successfully!', 'success')
      }
      setIsDialogOpen(false)
    } catch (err: any) {
      setFormError(err || 'Failed to save clipboard item')
      showToast(err || 'Failed to save item', 'error')
    }
  }

  // Handle Delete Item (Optimistic Update handled by Slice)
  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteClipboardItemThunk(id)).unwrap()
      showToast('Clipboard item deleted successfully!', 'info')
    } catch (err: any) {
      showToast(err || 'Failed to delete item', 'error')
    }
  }

  return (
    <DashboardLayout>
      <PageContainer
        title="SyncFlow Cloud Clipboard"
        subtitle="Securely store code snippets, text fragments, and notes with instant copy capabilities."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Cloud Clipboard' }]}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          {/* Header Action Row */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'space-between',
              alignItems: { xs: 'stretch', sm: 'center' },
              bgcolor: alpha(theme.palette.background.paper, 0.4),
              backdropFilter: 'blur(10px)',
              p: 2.5,
              borderRadius: 3,
              border: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.1),
            }}
          >
            <TextField
              size="small"
              placeholder="Search clipboards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1, maxWidth: { sm: 400 } }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('create')}
              sx={{
                py: 1,
                px: 3,
                fontWeight: 700,
                textTransform: 'none',
                borderRadius: 2.5,
                boxShadow: `0 4px 14px 0 ${alpha(theme.palette.primary.main, 0.3)}`,
              }}
            >
              Add Clipboard
            </Button>
          </Box>

          {/* Redux State Error Panel */}
          {error && (
            <Alert severity="error" onClose={() => {}} sx={{ borderRadius: 2 }}>
              {error}. <Button size="small" onClick={loadItems}>Retry</Button>
            </Alert>
          )}

          {/* Grid Layout of Clipboard Items */}
          {loading && items.length === 0 ? (
            <Grid container spacing={2}>
              {[1, 2, 3].map((n) => (
                <Grid item xs={12} md={4} key={n}>
                  <Card sx={{ borderRadius: 3, p: 2 }}>
                    <Skeleton variant="text" width="60%" height={30} sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 1.5, mb: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Skeleton variant="text" width="40%" />
                      <Skeleton variant="circular" width={24} height={24} />
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : filteredItems.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                bgcolor: alpha(theme.palette.background.paper, 0.2),
                borderRadius: 4,
                border: '2px dashed',
                borderColor: theme.palette.divider,
              }}
            >
              <NoteIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" fontWeight="700" color="text.primary" gutterBottom>
                No Clipboard Items Found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {searchQuery ? 'Try modifying your search query' : 'Create your first clipboard item to get started'}
              </Typography>
              {!searchQuery && (
                <Button variant="outlined" startIcon={<AddIcon />} onClick={() => handleOpenDialog('create')}>
                  Add Item
                </Button>
              )}
            </Box>
          ) : (
            <Grid container spacing={2.5}>
              {filteredItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      boxShadow: 'none',
                      transition: 'all 0.2s ease-in-out',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: `0 8px 24px ${alpha(theme.palette.text.primary, 0.05)}`,
                        borderColor: theme.palette.primary.light,
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 2.5, display: 'flex', flexDirection: 'column' }}>
                      {/* Card Header */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="700"
                          color="text.primary"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {item.title}
                        </Typography>

                        {/* Top Action Icons */}
                        <Box sx={{ display: 'flex', gap: 0.5, ml: 1, mt: -0.5 }}>
                          <Tooltip title="Edit">
                            <IconButton size="small" onClick={() => handleOpenDialog('edit', item)} color="primary">
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" onClick={() => handleDelete(item.id)} color="error">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>

                      {/* Content Box */}
                      <Box
                        sx={{
                          flexGrow: 1,
                          bgcolor: (theme) => (theme.palette.mode === 'light' ? '#f8fafc' : '#0f172a'),
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 2,
                          p: 1.5,
                          mb: 2,
                          maxHeight: 160,
                          overflowY: 'auto',
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-all',
                            fontSize: '0.825rem',
                          }}
                        >
                          {item.content}
                        </Typography>
                      </Box>

                      {/* Footer Row */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {item.createdAt}
                          </Typography>
                        </Box>
                        
                        <Button
                          size="small"
                          variant="contained"
                          color={copiedId === item.id ? 'success' : 'primary'}
                          onClick={() => handleCopy(item.id, item.content)}
                          startIcon={copiedId === item.id ? <CheckIcon sx={{ fontSize: 14 }} /> : <ContentCopyIcon sx={{ fontSize: 14 }} />}
                          sx={{
                            borderRadius: 1.5,
                            textTransform: 'none',
                            fontWeight: 700,
                            px: 1.5,
                          }}
                        >
                          {copiedId === item.id ? 'Copied' : 'Copy'}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Dialog Modal for Create/Edit */}
          <Dialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 4,
                p: 1,
              },
            }}
          >
            <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>
              {dialogMode === 'create' ? 'Create Clipboard Item' : 'Edit Clipboard Item'}
            </DialogTitle>
            <form onSubmit={handleDialogSubmit}>
              <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
                {formError && <Alert severity="error" sx={{ borderRadius: 1.5 }}>{formError}</Alert>}
                
                <TextField
                  label="Title"
                  placeholder="e.g. Git shortcuts, Docker run helper..."
                  fullWidth
                  variant="outlined"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                />
                
                <TextField
                  label="Content"
                  placeholder="Paste your text or code block here..."
                  multiline
                  rows={6}
                  fullWidth
                  variant="outlined"
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  required
                  InputProps={{
                    sx: {
                      fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
                      fontSize: '0.875rem',
                    },
                  }}
                />
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 2, pt: 1, gap: 1 }}>
                <Button onClick={() => setIsDialogOpen(false)} variant="text" color="inherit" sx={{ fontWeight: 700 }}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary" sx={{ fontWeight: 700, px: 3 }}>
                  Save
                </Button>
              </DialogActions>
            </form>
          </Dialog>

          {/* Notification Toast */}
          <Snackbar
            open={toastOpen}
            autoHideDuration={3000}
            onClose={() => setToastOpen(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert
              onClose={() => setToastOpen(false)}
              severity={toastSeverity}
              sx={{ width: '100%', borderRadius: 2, fontWeight: 600 }}
            >
              {toastMessage}
            </Alert>
          </Snackbar>

        </Box>
      </PageContainer>
    </DashboardLayout>
  )
}
