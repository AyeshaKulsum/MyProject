const assert = require('chai').assert;
const expect = require('chai').expect;

const server = require('../server.js')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

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

describe('Server Testing', function () {
    it('should validate if server is running', function () {
        return server.injectThen({
                method: 'GET',
                url: '/designation'
            })
            .then(
                function (response) {
                  console.log('the response',response)
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

      // describe('GET /designation', () => {
      //   it('should return the server status', async done => {
      //     await testUtil(async () => {
      //       const response = await fetch(`${config.apiUrl}/healthcheck`, {
      //         method : 'GET'
      //       });
    
      //       const body = await response.json();
    
      //       expect(response.ok).toBe(true);
      //       expect(response.status).toBe(200);
      //       expect(body.ping).toBe('pong');
      //       expect(body.timestamp).toBeGreaterThan(0);
      //       expect(body.database.healthy).toBe(true);
      //     }, done);
      //   });
      // });
      
  // });