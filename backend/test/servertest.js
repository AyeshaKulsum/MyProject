const assert = require('chai').assert;
const expect = require('chai').expect;
const server = require('../server.js')


describe('hooks', function () {

  before(function () {
    console.log('Before')
    server.register({
      register: require('inject-then'),
      options: {
        message: 'inject-then plugin'
      }
    }, (err) => {
      if (err) {
        console.log('Failed loading inject-then plugin');
      }
    });
    server.start();
  });

  describe('Server Testing', function () {
    it('should validate if server is running', function () {
      return server.injectThen({
        method: 'GET',
        url: '/designation'
      })
        .then(
          function (response) {
            assert.deepEqual(response.statusCode, 200);
            expect(response.statusCode).to.equal(200);
            expect(response.statusMessage).to.equal('OK');
          }
        )
    })
    it('should invalidate if server is running', function () {
      return server.injectThen({
        method: 'GET',
        url: '/designation'
      })
        .then(
          function (response) {
            assert.notEqual(response.statusCode, 400);
          }
        )
    })
  })

  describe('Post designations', function () {
    it('should validate if designation is saved', function () {
      return server.injectThen({
        method: 'POST',
        url: '/designation',
        payload: {
          designation_name: 'Principal'
        }
      })
        .then(
          function (response) {
            let responsePayload = JSON.parse(response.payload)
            assert.deepEqual(response.statusCode, 201);
            expect(response.statusCode).to.equal(201);
            expect(response.statusMessage).to.equal('Created');
            assert.strictEqual(responsePayload.message, 'Added new record');
            assert.strictEqual(responsePayload.status, 'success');
            assert.strictEqual(responsePayload.description.designation_status, 'Active');
            assert.strictEqual(responsePayload.description.designation_name, 'Principal');
            expect(responsePayload.description.id).to.greaterThan(0);
          }
        )
    })

    it('should throw bad request if required fields are not sent', function () {
      return server.injectThen({
        method: 'POST',
        url: '/designation'
      })
        .then(
          function (response) {
            let responsePayload = JSON.parse(response.payload)
            assert.deepEqual(response.statusCode, 400);
            assert.deepEqual(responsePayload.error, 'Bad Request');
            assert.deepEqual(responsePayload.validation.source, 'payload');
            assert.deepEqual(responsePayload.validation.keys, ['value']);
          }
        )
    })
  })
  describe('PUT designations', function () {
    it('should validate if designation is saved', function () {
      return server.injectThen({
        method: 'PUT',
        url: '/designation?id=1',
        payload: {
          designation_name: 'Head Master'
        }, headers: {
          username: 'Ayesha',
        }
      })
        .then(
          function (response) {
            let responsePayload = JSON.parse(response.payload)
            assert.deepEqual(response.statusCode, 200);
            expect(response.statusCode).to.equal(200);
            expect(response.statusMessage).to.equal('OK');
            assert.strictEqual(responsePayload.message, 'Updated Sucessfully');
            assert.strictEqual(responsePayload.status, 'success');
          }
        )
    })

    it('should throw bad request if required payload is not sent', function () {
      return server.injectThen({
        method: 'PUT',
        url: '/designation?id=1',
        headers: {
          username: 'Ayesha',
        }
        ,
        payload: {

        }
      })
        .then(
          function (response) {
            let responsePayload = JSON.parse(response.payload)
            assert.deepEqual(response.statusCode, 400);
            assert.deepEqual(responsePayload.error, 'Bad Request');
            assert.deepEqual(responsePayload.validation.source, 'payload');
            assert.deepEqual(responsePayload.validation.keys, ['designation_name']);
          }
        )
    })

    it('should throw bad request if required headers is not sent', function () {
      return server.injectThen({
        method: 'PUT',
        url: '/designation?id=1',
        payload: {
          designation_name: 'Head Master'
        }
      })
        .then(
          function (response) {
            let responsePayload = JSON.parse(response.payload)
            assert.deepEqual(response.statusCode, 400);
            assert.deepEqual(responsePayload.error, 'Bad Request');
            assert.deepEqual(responsePayload.validation.source, 'headers');
            assert.deepEqual(responsePayload.validation.keys, ['username']);
          }
        )
    })

    it('should throw bad request if required query params is not sent', function () {
      return server.injectThen({
        method: 'PUT',
        url: '/designation',
        payload: {
          designation_name: 'Head Master'
        },
        headers: {
          username: 'Ayesha',
        }
      })
        .then(
          function (response) {
            let responsePayload = JSON.parse(response.payload)
            assert.deepEqual(response.statusCode, 400);
            assert.deepEqual(responsePayload.error, 'Bad Request');
            assert.deepEqual(responsePayload.validation.source, 'query');
            assert.deepEqual(responsePayload.validation.keys, ['id']);
          }
        )
    })
  })
  after(function () {
    console.log('After')
    server.stop();
  });
});
  // describe('hooks', function() {
    // before(function() {
    //     console.log('Before')
    //   // runs once before the first test in this block
    // });

    // after(function() {
    //     console.log('After')
    //   // runs once after the last test in this block
    // });

    // beforeEach(function() {
    //     console.log('Before Each')
    //   // runs before each test in this block
    // });

    // afterEach(function() {
    //     console.log('After Each')
    //   // runs after each test in this block
    // });

    // test cases

    // describe('Array', function() {
    //     describe('#indexOf()', function() {
    //       it('should return -1 when the value is not present', function() {
    //         assert.equal([1, 2, 3].indexOf(4), -1);
    //       });
    //       it('should return -1 when the value is not present', function() {
    //         assert.equal([1, 2, 3].indexOf(4), -1);
    //       });
    //     });
    //   });

  // });