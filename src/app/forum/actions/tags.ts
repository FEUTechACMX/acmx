'use server'

export async function getPopularTags(limit = 10) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tags?limit=${limit}`,
    { next: { revalidate: 3600 } } // Cache for 1 hour
  )

  if (!response.ok) {
    throw new Error('Failed to fetch tags')
  }

  return response.json()
}

export async function searchTags(query: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tags?q=${encodeURIComponent(query)}`,
    { next: { revalidate: 60 } } // Cache for 60 seconds
  )

  if (!response.ok) {
    throw new Error('Failed to search tags')
  }

  return response.json()
}


