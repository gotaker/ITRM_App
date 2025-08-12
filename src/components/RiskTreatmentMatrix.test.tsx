import { render, screen } from '@testing-library/react'
import RiskTreatmentMatrix from './RiskTreatmentMatrix'

describe('RiskTreatmentMatrix', () => {
  it('renders legend with custom bands', () => {
    render(<svg><RiskTreatmentMatrix greenMax={3} amberMax={11} /></svg> as any)
    expect(screen.getByText(/Green < 4/i)).toBeInTheDocument()
    expect(screen.getByText(/Amber 4–11/i)).toBeInTheDocument()
    expect(screen.getByText(/Red > 11/i)).toBeInTheDocument()
  })
})
