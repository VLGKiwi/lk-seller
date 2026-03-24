import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Alert,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { apiClient } from '../api/client'
import type { Post } from '../api/types'
import { useAppStore } from '../store/useAppStore'

export function HomePage() {
  const sellerName = useAppStore((s) => s.sellerName)
  const setSellerName = useAppStore((s) => s.setSellerName)
  const [draft, setDraft] = useState(sellerName)

  const { data, isPending, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data: posts } = await apiClient.get<Post[]>('/posts', {
        params: { _limit: 5 },
      })
      return posts
    },
  })

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Здравствуйте, {sellerName}
      </Typography>
      <Typography color="text.secondary" paragraph>
        Демо: Zustand, TanStack Query и Axios (публичный JSONPlaceholder).
      </Typography>
      <Box sx={{ mb: 3, maxWidth: 360 }}>
        <TextField
          label="Имя продавца (Zustand)"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => setSellerName(draft)}
          size="small"
          fullWidth
        />
      </Box>
      <Typography variant="h6" component="h2" gutterBottom>
        Посты (через Axios)
      </Typography>
      {isPending && <CircularProgress size={28} />}
      {isError && <Alert severity="error">Не удалось загрузить посты.</Alert>}
      {data && (
        <Paper variant="outlined">
          <List dense>
            {data.map((post) => (
              <ListItem key={post.id} divider>
                <ListItemText
                  primary={post.title}
                  secondary={`${post.body.slice(0, 96)}…`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  )
}
