/* global describe, it */

var assert = require('assert')
var base58 = require('../')

var fixtures = require('./fixtures.json')

describe('base58', function () {
  describe('encode', function () {
    fixtures.valid.forEach(function (f) {
      it('can encode ' + f.hex, function () {
        var actual = base58.encode(new Buffer(f.hex, 'hex'))

        assert.strictEqual(actual, f.string)
      })
    })
  })

  describe('decode', function () {
    fixtures.valid.forEach(function (f) {
      it('can decode ' + f.string, function () {
        var actual = new Buffer(base58.decode(f.string)).toString('hex')

        assert.strictEqual(actual, f.hex)
      })
    })

    fixtures.invalid.forEach(function (f) {
      it('throws on ' + f.description, function () {
        assert.throws(function () {
          base58.decode(f.string)
        }, /Non-base58 character/)
      })
    })
  })

  describe('valid', function () {
    fixtures.valid.forEach(function (f) {
      it('returns true for ' + f.string, function () {
        assert(base58.valid(f.string))
      })
    })

    fixtures.invalid.forEach(function (f) {
      it('returns false for ' + f.description + ' (' + f.string + ')', function () {
        assert(!base58.valid(f.string))
      })
    })
  })
})
