import { useCallback, useState } from 'react'

export type Card = {
  id: number
  name: string
  image: any // ImageSourcePropType
  meaning: {
    upright: string
    reversed: string
  }
  isReversed?: boolean
}

// This is a placeholder for the actual tarot card data
// In a real app, you would have a complete deck with proper images and meanings
const PLACEHOLDER_CARDS: Card[] = Array.from({ length: 22 }, (_, i) => ({
  id: i + 1,
  name: `Major Arcana Card ${i + 1}`,
  image: import('../assets/images/card-back.png'),
  meaning: {
    upright:
      'This card represents important life lessons, karmic influences, and the cosmic forces that shape human life.',
    reversed:
      'The reversed meaning suggests resistance to these lessons or a misalignment with your path.',
  },
}))

export const useCards = () => {
  const [deck, setDeck] = useState<Card[]>(PLACEHOLDER_CARDS)
  const [drawnCards, setDrawnCards] = useState<Card[]>([])

  const shuffleDeck = useCallback(() => {
    setDeck(currentDeck => {
      // Create a copy of the current deck
      const newDeck = [...currentDeck]

      // Fisher-Yates shuffle algorithm
      for (let i = newDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]]

        // Randomly set some cards as reversed (50% chance)
        newDeck[i].isReversed = Math.random() > 0.5
      }

      return newDeck
    })

    // Clear any previously drawn cards
    setDrawnCards([])
  }, [])

  const drawCards = useCallback(
    (count: number = 3) => {
      setDrawnCards(current => {
        if (current.length >= count) {
          return current
        }

        const newDrawn = [...current]
        const cardsToDraw = count - current.length

        for (let i = 0; i < cardsToDraw && i < deck.length; i++) {
          newDrawn.push(deck[i])
        }

        return newDrawn
      })
    },
    [deck],
  )

  return {
    deck,
    drawnCards,
    shuffleDeck,
    drawCards,
  }
}

export default useCards
