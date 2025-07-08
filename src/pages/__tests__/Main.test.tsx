import '@testing-library/jest-dom'
import { fireEvent, screen, waitFor } from "@testing-library/react"
import { it, describe, expect, vi } from "vitest"
import { Main } from '../Main'
import { renderWithRouter } from './utils/renderWithRouter'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('Main Page', () => {
  it('should render all form inputs and button', () => {
    renderWithRouter(<Main />)

    expect(screen.getByPlaceholderText('e.g. Jane Appleseed')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('e.g. 0000 0000 0000 0000')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('MM')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('YY')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('e.g. 000')).toBeInTheDocument()

    expect(screen.getByText(/confirm/i)).toBeInTheDocument()
  })

  it('should navigate to /completed on form submission', async () => {
    renderWithRouter(<Main />)

    fireEvent.change(screen.getByPlaceholderText('e.g. Jane Appleseed'), { target: { value: 'Jane Appleseed' } })
    fireEvent.change(screen.getByPlaceholderText('e.g. 0000 0000 0000 0000'), { target: { value: '1212 1212 1212 1212' } })
    fireEvent.change(screen.getByPlaceholderText('MM'), { target: { value: '12' } })
    fireEvent.change(screen.getByPlaceholderText('YY'), { target: { value: '33' } })
    fireEvent.change(screen.getByPlaceholderText('e.g. 000'), { target: { value: '111' } })

    fireEvent.click(screen.getByRole('button', { name: /confirm/i }))

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/completed')
    })
  })

  it('should render card info in CardHeader in real time', () => {
    renderWithRouter(<Main />)

    fireEvent.change(screen.getByPlaceholderText('e.g. Jane Appleseed'), { target: { value: 'Jane Appleseed' } })
    fireEvent.change(screen.getByPlaceholderText('e.g. 0000 0000 0000 0000'), { target: { value: '1212 1212 1212 1212' } })
    fireEvent.change(screen.getByPlaceholderText('MM'), { target: { value: '12' } })
    fireEvent.change(screen.getByPlaceholderText('YY'), { target: { value: '35' } })
    fireEvent.change(screen.getByPlaceholderText('e.g. 000'), { target: { value: '111' } })

    expect(screen.getByText('Jane Appleseed')).toBeInTheDocument()
    expect(screen.getByText('1212 1212 1212 1212')).toBeInTheDocument()
    expect(screen.getByText('12/35')).toBeInTheDocument()
    expect(screen.getByText('111')).toBeInTheDocument()
  })
})