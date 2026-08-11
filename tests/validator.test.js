const { isEmptyPayload, isInvalidEmail } = require('../validator.js')

test('valid email', function () {
    const testPayload = {
        name: "Test Subject",
        email: "test.subject@example.com",
        interests: "Testing"
    }
    const result = isInvalidEmail(testPayload)
    expect(result).toBe(false)
})

test('invalid email', function () {
    const testPayload = {
        name: "Test Subject",
        email: "test.subject",
        interests: "Testing"
    }
    const result = isInvalidEmail(testPayload)
    expect(result).toBe(true)
})

test('empty payload', function () {
    const testPayload = {}
    const result = isEmptyPayload(testPayload)
    expect(result).toBe(true)
})

test('not empty payload', function () {
    const testPayload = {
        name: "Test Subject",
        email: "test.subject",
        interests: "Testing"
    }
    const result = isEmptyPayload(testPayload)
    expect(result).toBe(false)
})