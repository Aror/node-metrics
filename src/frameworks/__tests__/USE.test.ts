import USE from '../USE'

const params = ({
  saturationName = 'saturation',
  saturationHelp = 'saturation metric',
  saturationLabels = ['label1', 'label2'],
  utilizationName = 'utilization',
  utilizationHelp = 'utilization metric',
  utilizationLabels = ['label1', 'label2'],
  collectDefaultMetrics = true
}) => {
  return {
    saturationName,
    saturationHelp,
    saturationLabels,
    utilizationName,
    utilizationHelp,
    utilizationLabels,
    collectDefaultMetrics
  }
}

describe('USE', () => {
  describe('when parameters are correct', () => {
    it('instantiates class with passed values', () => {
      const subject = new USE(params({}))
      expect(subject['saturationName']).toBe(params({}).saturationName)
    })
  })
  describe('when empty values are passed', () => {
    test.each(Object.entries(params({})))('given %p and and empty string as arguments, throws an error', (a, b) => {
      expect(() => {
        new USE(params({ [a]: '' }))
      }).toThrow(Error)
    })
  })
  describe('when unexpected type of value is passed', () => {
    test.each(Object.entries(params({})))('given %p and 0 as arguments, throws an error', (a, b) => {
      expect(() => {
        new USE(params({ [a]: 0 }))
      }).toThrow(Error)
    })
  })
  describe('when arrays of unexpected length are passed', () => {
    it('throws an error for saturationLabels', () => {
      expect(() => {
        new USE(params({ saturationLabels: [] }))
      }).toThrow(Error)
    })

    it('throws an error for utilizationLabels', () => {
      expect(() => {
        new USE(params({ utilizationLabels: [] }))
      }).toThrow(Error)
    })
  })
  describe('when some array values are not strings', () => {
    it('throws an error for latencyLabels', () => {
      expect(() => {
        new USE(params({ saturationLabels: ['string', 0 as any] }))
      }).toThrow(Error)
    })

    it('throws an error for trafficLabels', () => {
      expect(() => {
        new USE(params({ utilizationLabels: ['string', 0 as any] }))
      }).toThrow(Error)
    })
  })
})
