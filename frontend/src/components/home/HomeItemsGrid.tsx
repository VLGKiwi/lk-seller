import { Box, Card, CardActionArea, CardContent, Chip, Paper, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import type { ItemListEntry } from '../../api/types'
import { COLORS, categoryTitle, formatPrice } from './homeConfig'

function ImagePlaceholder() {
  return (
    <Box
      sx={{
        width: 54,
        height: 40,
        border: '2px solid #9ca6b8',
        borderRadius: 0.5,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          border: '2px solid #9ca6b8',
          position: 'absolute',
          top: 5,
          left: 5,
        }}
      />
      <Box
        sx={{
          width: 26,
          height: 12,
          borderLeft: '2px solid #9ca6b8',
          borderBottom: '2px solid #9ca6b8',
          transform: 'skewX(-25deg) rotate(-18deg)',
          position: 'absolute',
          left: 12,
          bottom: 7,
        }}
      />
    </Box>
  )
}

type HomeItemsGridProps = {
  items: ItemListEntry[]
}

export function HomeItemsGrid({ items }: HomeItemsGridProps) {
  if (items.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        <Typography sx={{ fontWeight: 600 }}>Объявления не найдены</Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Измените параметры поиска или сбросьте фильтры.
        </Typography>
      </Paper>
    )
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, minmax(0, 1fr))',
          md: 'repeat(3, minmax(0, 1fr))',
          lg: 'repeat(4, minmax(0, 1fr))',
          xl: 'repeat(5, minmax(0, 1fr))',
        },
      }}
    >
      {items.map((item) => (
        <Card
          key={`${item.title}-${item.id ?? 'missing-id'}`}
          variant="outlined"
          sx={{
            borderRadius: 2.5,
            borderColor: COLORS.cardBorder,
            backgroundColor: '#fff',
            boxShadow: COLORS.cardShadow,
          }}
        >
          {Number.isFinite(item.id) ? (
            <CardActionArea
              component={RouterLink}
              to={`/ads/${item.id}`}
              sx={{
                p: 1.5,
                textAlign: 'left',
                '&:hover .item-image': {
                  backgroundColor: '#eef3ff',
                },
              }}
            >
              <Box
                className="item-image"
                sx={{
                  mb: 1.5,
                  borderRadius: 1.5,
                  border: `1px solid ${COLORS.controlBorder}`,
                  backgroundColor: COLORS.imageBg,
                  height: 116,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color .15s ease',
                }}
              >
                <ImagePlaceholder />
              </Box>
              <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                <Chip
                  label={categoryTitle[item.category]}
                  size="small"
                  sx={{
                    mb: 1,
                    height: 22,
                    fontSize: 11,
                    fontWeight: 500,
                    color: COLORS.categoryText,
                    backgroundColor: COLORS.categoryBg,
                    border: `1px solid ${COLORS.categoryBorder}`,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 400,
                    mb: 0.75,
                    color: '#000000',
                    minHeight: 42,
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 16,
                    lineHeight: 1.08,
                    letterSpacing: '-0.02em',
                    fontWeight: 600,
                    color: '#00000045',
                  }}
                >
                  {formatPrice(item.price)}
                </Typography>
                {item.needsRevision && (
                  <Chip
                    label="Требует доработок"
                    size="small"
                    sx={{
                      mt: 1.1,
                      height: 24,
                      color: COLORS.revisionText,
                      backgroundColor: COLORS.revisionBg,
                      border: `1px solid ${COLORS.revisionBorder}`,
                      fontWeight: 500,
                      fontSize: 11,
                    }}
                  />
                )}
              </CardContent>
            </CardActionArea>
          ) : (
            <CardActionArea disabled sx={{ p: 1.5, textAlign: 'left' }}>
              <Box
                sx={{
                  mb: 1.5,
                  borderRadius: 1.5,
                  border: `1px solid ${COLORS.controlBorder}`,
                  backgroundColor: COLORS.imageBg,
                  height: 116,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ImagePlaceholder />
              </Box>
              <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                <Chip
                  label={categoryTitle[item.category]}
                  size="small"
                  sx={{
                    mb: 1,
                    height: 22,
                    fontSize: 11,
                    color: COLORS.categoryText,
                    backgroundColor: COLORS.categoryBg,
                    border: `1px solid ${COLORS.categoryBorder}`,
                  }}
                />
                <Typography sx={{ fontSize: 16, fontWeight: 400, color: '#000000', mb: 0.75, minHeight: 42 }}>
                  {item.title}
                </Typography>
                <Typography sx={{ fontSize: 16, lineHeight: 1.08, fontWeight: 600, color: '#00000045' }}>
                  {formatPrice(item.price)}
                </Typography>
                {item.needsRevision && (
                  <Chip
                    label="Требует доработок"
                    size="small"
                    sx={{
                      mt: 1.1,
                      color: COLORS.revisionText,
                      backgroundColor: COLORS.revisionBg,
                      border: `1px solid ${COLORS.revisionBorder}`,
                      fontSize: 11,
                    }}
                  />
                )}
              </CardContent>
            </CardActionArea>
          )}
        </Card>
      ))}
    </Box>
  )
}
