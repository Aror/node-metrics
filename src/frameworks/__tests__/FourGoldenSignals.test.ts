import FourGoldenSignals from '../FourGoldenSignals'

const params = ({
  latencyName = 'latency',
  latencyHelp = 'latency metric',
  latencyLabels = ['label1', 'label2'],
  trafficName = 'traffic',
  trafficHelp = 'traffic metric',
  trafficLabels = ['label3', 'label4'],
  saturationName = 'saturation',
  saturationHelp = 'saturation metric',
  saturationLabels = ['label5', 'label6'],
  collectDefaultMetrics = true
}) => {
  return {
    latencyName,
    latencyHelp,
    latencyLabels,
    trafficName,
    trafficHelp,
    trafficLabels,
    saturationName,
    saturationHelp,
    saturationLabels,
    collectDefaultMetrics
  }
}

describe('FourGoldenSignals', () => {
  describe('when parameters are correct', () => {
    it('instantiates class with passed values', () => {
      const subject = new FourGoldenSignals(params({}))
      expect(subject['latencyName']).toBe(params({}).latencyName)
    })
  })
  describe('validation', () => {
    describe('when empty values are passed', () => {
      test.each(Object.entries(params({})))('given %p and and empty string as arguments, throws an error', (a, b) => {
        expect(() => {
          new FourGoldenSignals(params({ [a]: '' }))
        }).toThrow(Error)
      })
    })
    describe('when unexpected type of value is passed', () => {
      test.each(Object.entries(params({})))('given %p and 0 as arguments, throws an error', (a, b) => {
        expect(() => {
          new FourGoldenSignals(params({ [a]: 0 }))
        }).toThrow(Error)
      })
    })
    describe('when arrays of unexpected length are passed', () => {
      it('throws an error for latencyLabels', () => {
        expect(() => {
          new FourGoldenSignals(params({ latencyLabels: [] }))
        }).toThrow(Error)
      })

      it('throws an error for trafficLabels', () => {
        expect(() => {
          new FourGoldenSignals(params({ trafficLabels: [] }))
        }).toThrow(Error)
      })

      it('throws an error for saturationLabels', () => {
        expect(() => {
          new FourGoldenSignals(params({ saturationLabels: [] }))
        }).toThrow(Error)
      })
    })
    describe('when some array values are not strings', () => {
      it('throws an error for latencyLabels', () => {
        expect(() => {
          new FourGoldenSignals(params({ latencyLabels: ['string', 0 as any] }))
        }).toThrow(Error)
      })

      it('throws an error for trafficLabels', () => {
        expect(() => {
          new FourGoldenSignals(params({ trafficLabels: ['string', 0 as any] }))
        }).toThrow(Error)
      })

      it('throws an error for saturationLabels', () => {
        expect(() => {
          new FourGoldenSignals(params({ saturationLabels: ['string', 0 as any] }))
        }).toThrow(Error)
      })
    })
  })
})
