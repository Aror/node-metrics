import RED from '../RED'

const params = ({
  durationLabels = ['label1','label2'],
  requestType = 'api_post',
  requestLabels = ['label3', 'label4']
}) => {
  return {
    durationLabels,
    requestType,
    requestLabels
  }
}

describe('RED', () => {
  describe('when parameters are correct', () => {
    it('instantiates class with passed values', () => {
      const subject = new RED(params({}))
      expect(subject['requestType']).toBe(params({}).requestType)
    })
  })
  describe('when empty values are passed', () => {
    test.each(Object.entries(params({})))(
      'given %p and and empty string as arguments, throws an error',
      (a, b) => {
        expect(() => {
          new RED(params({ [a]: '' }))
        }).toThrow(Error)
      }
    )
  })
  describe('when unexpected type of value is passed', () => {
    test.each(Object.entries(params({})))(
      'given %p and 0 as arguments, throws an error',
      (a, b) => {
        expect(() => {
          new RED(params({ [a]: 0 }))
        }).toThrow(Error)
      }
    )
  })
  describe('when arrays of unexpected length are passed', () => {
    it('throws an error for durationLabels', () => {
      expect(() => {
        new RED(params({ durationLabels: [] }))
      }).toThrow(Error)
    })

    it('throws an error for requestLabels', () => {
      expect(() => {
        new RED(params({ requestLabels: [] }))
      }).toThrow(Error)
    })
  })
  describe('when some array values are not strings', () => {
    it('throws an error for latencyLabels', () => {
      expect(() => {
        new RED(params({ durationLabels: ['string', 0 as any] }))
      }).toThrow(Error)
    })

    it('throws an error for trafficLabels', () => {
      expect(() => {
        new RED(params({ requestLabels: ['string', 0 as any] }))
      }).toThrow(Error)
    })
  })
})
